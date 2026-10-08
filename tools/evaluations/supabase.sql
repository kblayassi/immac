-- Évaluations sur écran — la base Supabase qui reçoit les copies.
--
-- À coller tel quel dans Supabase → SQL Editor → Run. Le script peut être rejoué
-- sans dommage : il ne détruit aucune copie, il (re)pose les règles.
--
-- Ce fichier ne contient rien de secret, et c'est voulu : le dépôt est public.
-- Toute la sécurité tient aux règles ci-dessous, puisque la clé « anon » que le
-- site utilise est lisible par tous (docs/eval/supabase.js).
--
--   Un visiteur (élève)  : ni lecture ni écriture directe sur la table. Il passe
--                          par deux fonctions : deposer_copie, lire_copie.
--   Un correcteur        : un compte Supabase inscrit dans `correcteurs`. Il lit,
--                          publie les corrections (deux colonnes seulement) et
--                          supprime.
--   Chaque nuit          : les copies de plus de 5 mois sont effacées.

create extension if not exists pgcrypto with schema extensions;
create extension if not exists pg_cron;

-- ---------------------------------------------------------------- Correcteurs

create table if not exists public.correcteurs (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.correcteurs enable row level security;
revoke all on public.correcteurs from anon, authenticated;

create or replace function public.est_correcteur()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.correcteurs where user_id = auth.uid())
$$;
revoke all on function public.est_correcteur() from public, anon;
grant execute on function public.est_correcteur() to authenticated;

-- --------------------------------------------------------------------- Copies

create table if not exists public.copies (
  id          uuid primary key default gen_random_uuid(),
  evaluation  text not null check (char_length(evaluation) between 1 and 80),
  classe      text not null check (char_length(classe) between 1 and 40),
  nom         text not null check (char_length(nom) between 1 and 80),
  prenom      text not null check (char_length(prenom) between 1 and 80),
  empreinte   text unique,
  code        text not null,
  rendu       jsonb not null,
  corrigee    jsonb,
  corrigee_le timestamptz,
  depose_le   timestamptz not null default now()
);

-- Le code se compare sans tirets ni espaces ni casse : « abri sable lune 42 »
-- ouvre ABRI-SABLE-LUNE-42. L'unicité porte donc sur cette forme-là.
create unique index if not exists copies_code_cle
  on public.copies ((regexp_replace(upper(code), '[^A-Z0-9]', '', 'g')));
create index if not exists copies_eval_classe on public.copies (evaluation, classe);

alter table public.copies enable row level security;
revoke all on public.copies from anon, authenticated;
grant select, delete on public.copies to authenticated;
grant update (corrigee, corrigee_le) on public.copies to authenticated;

drop policy if exists "le correcteur lit" on public.copies;
drop policy if exists "le correcteur corrige" on public.copies;
drop policy if exists "le correcteur supprime" on public.copies;
create policy "le correcteur lit" on public.copies
  for select to authenticated using (public.est_correcteur());
create policy "le correcteur corrige" on public.copies
  for update to authenticated using (public.est_correcteur()) with check (public.est_correcteur());
create policy "le correcteur supprime" on public.copies
  for delete to authenticated using (public.est_correcteur());

-- ---------------------------------------------------- Le code de consultation
-- Trois mots et un nombre, qui se notent sans faute sur un coin de cahier :
-- 128 × 128 × 128 × 90, soit près de 190 millions de codes. Le hasard vient de
-- pgcrypto, pas de random().

create or replace function public.nouveau_code()
returns text
language plpgsql volatile
set search_path = public, extensions
as $$
declare
  mots text[] := array[
    'ABRI','AIGLE','ALBUM','ANCRE','ARBRE','ARCHE','ATLAS','AVION','BALLE','BARQUE',
    'BISON','BOIS','BOUGIE','BRISE','CABANE','CACTUS','CANOE','CASQUE','CASTOR','CERISE',
    'CHALET','CHAMP','CHAT','CHENE','CIGALE','CITRON','CLOCHE','COBRA','COMETE','CORAIL',
    'CRABE','CRAYON','CYGNE','DAUPHIN','DESERT','DOMINO','DRAGON','DUNE','ECHO','ECLAIR',
    'EPICE','ETOILE','FALAISE','FARINE','FENOUIL','FLAMME','FLEUVE','FORET','FOUGERE','FUSEE',
    'GALET','GAZELLE','GLACIER','GOMME','GRENIER','GUEPARD','HAMAC','HERISSON','HIBOU','ILOT',
    'JADE','JARDIN','JUNGLE','KAYAK','KIWI','LAGUNE','LAMPE','LAPIN','LASER','LIERRE',
    'LION','LOUTRE','LUNE','MANGUE','MARBRE','MERLE','METEORE','MIEL','MIROIR','MOULIN',
    'MOUETTE','NEIGE','NUAGE','OASIS','OCEAN','OLIVE','ORAGE','ORANGE','OURS','PANDA',
    'PAPAYE','PARC','PECHE','PELICAN','PHARE','PIANO','PIERRE','PIRATE','PLAGE','PLUME',
    'POMME','PRAIRIE','PUZZLE','RADEAU','RAISIN','RENARD','RIVIERE','ROBOT','ROCHER','SABLE',
    'SAPIN','SAUMON','SOLEIL','SOURCE','TAMBOUR','TIGRE','TOMATE','TORTUE','TRAIN','TULIPE',
    'VAGUE','VALLEE','VELO','VIOLON','VOLCAN','YOGA','ZEBRE','ZENITH'];
  octets bytea := gen_random_bytes(4);
begin
  return mots[1 + get_byte(octets, 0) % 128] || '-' ||
         mots[1 + get_byte(octets, 1) % 128] || '-' ||
         mots[1 + get_byte(octets, 2) % 128] || '-' ||
         (10 + get_byte(octets, 3) % 90)::text;
end
$$;
revoke all on function public.nouveau_code() from public, anon, authenticated;

-- --------------------------------------------------------- Déposer une copie
-- Appelée par la page d'épreuve à la remise. Rend le code de consultation.
-- Idempotente : le même rendu (même empreinte) redéposé rend le même code.
--
-- p_corrigee : la copie déjà corrigée par la page elle-même. Acceptée pour les
-- seules évaluations AUTOCORRIGÉES, dont le barème est public (les évaluations
-- à blanc : eval-blanc, eval-blanc-snt, eval-blanc-nsi-term — même règle que
-- estBlanche dans eleve.js) ; ignorée pour toutes les autres — un élève ne se
-- note pas lui-même.

drop function if exists public.deposer_copie(jsonb);

create or replace function public.deposer_copie(p_rendu jsonb, p_corrigee jsonb default null)
returns text
language plpgsql volatile security definer
set search_path = public
as $$
declare
  v_code text;
  v_emp  text := nullif(p_rendu->>'empreinte', '');
  v_corr jsonb := case
    when (p_rendu#>>'{evaluation,cle}') ~ '^eval-blanc(-|$)'
     and coalesce(p_corrigee->>'format', '') like 'copie/%'
     and pg_column_size(p_corrigee) <= 2000000
    then p_corrigee end;
begin
  if pg_column_size(p_rendu) > 2000000 then
    raise exception 'copie trop volumineuse';
  end if;
  if coalesce(p_rendu->>'format', '') not like 'evaluation/%'
     or jsonb_typeof(p_rendu->'reponses') is distinct from 'object' then
    raise exception 'ce n''est pas une copie d''évaluation';
  end if;

  if v_emp is not null then
    select code into v_code from copies where empreinte = v_emp;
    if found then
      if v_corr is not null then
        update copies set corrigee = v_corr, corrigee_le = now()
         where empreinte = v_emp and corrigee is null;
      end if;
      return v_code;
    end if;
  end if;

  for essai in 1..10 loop
    v_code := nouveau_code();
    begin
      insert into copies (evaluation, classe, nom, prenom, empreinte, code, rendu,
                          corrigee, corrigee_le)
      values (
        left(coalesce(nullif(trim(p_rendu#>>'{evaluation,cle}'), ''), '?'), 80),
        left(coalesce(nullif(trim(p_rendu#>>'{eleve,classe}'), ''), 'Sans classe'), 40),
        left(coalesce(nullif(trim(p_rendu#>>'{eleve,nom}'), ''), '?'), 80),
        left(coalesce(nullif(trim(p_rendu#>>'{eleve,prenom}'), ''), '?'), 80),
        v_emp, v_code, p_rendu,
        v_corr, case when v_corr is not null then now() end);
      return v_code;
    exception when unique_violation then
      -- Ou bien le code était déjà pris (on en tire un autre), ou bien la même
      -- copie vient d'arriver par une autre requête (on rend son code).
      if v_emp is not null then
        select code into v_code from copies where empreinte = v_emp;
        if found then return v_code; end if;
      end if;
    end;
  end loop;
  raise exception 'impossible d''attribuer un code, réessaie';
end
$$;
revoke all on function public.deposer_copie(jsonb, jsonb) from public;
grant execute on function public.deposer_copie(jsonb, jsonb) to anon, authenticated;

-- -------------------------------------------------------- Lire sa copie
-- Appelée par la page « Ma copie corrigée ». Ne livre rien d'autre que la copie
-- corrigée — jamais le rendu brut, ni une copie pas encore publiée.

create or replace function public.lire_copie(p_code text)
returns jsonb
language plpgsql stable security definer
set search_path = public
as $$
declare
  v_ligne copies%rowtype;
begin
  select * into v_ligne from copies
   where regexp_replace(upper(code), '[^A-Z0-9]', '', 'g')
       = regexp_replace(upper(coalesce(p_code, '')), '[^A-Z0-9]', '', 'g');
  if not found then
    return jsonb_build_object('etat', 'inconnu');
  end if;
  if v_ligne.corrigee is null then
    return jsonb_build_object('etat', 'en-attente');
  end if;
  return jsonb_build_object('etat', 'corrigee', 'copie', v_ligne.corrigee);
end
$$;
revoke all on function public.lire_copie(text) from public;
grant execute on function public.lire_copie(text) to anon, authenticated;

-- ------------------------------------------------- Effacement au bout de 5 mois

select cron.schedule(
  'purger-copies',
  '17 3 * * *',
  $$delete from public.copies where depose_le < now() - interval '5 months'$$
);

-- ------------------------------------------------- Inscrire le correcteur
-- À lancer UNE fois, après avoir créé ton compte dans Authentication → Users,
-- en remplaçant l'adresse par la tienne :
--
--   insert into public.correcteurs (user_id)
--   select id from auth.users where email = 'ton.adresse@exemple.fr'
--   on conflict do nothing;
