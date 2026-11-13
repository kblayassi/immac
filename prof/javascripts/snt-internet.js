/* SNT, thème Internet : les outils interactifs des pages de cours.
 *
 * Chaque outil se déclare dans la page par un simple conteneur :
 *     <div class="snt-outil" data-outil="debit"></div>
 * et ce script le construit au chargement. Une page qui n'en contient aucun
 * n'est pas touchée. Aucun appel réseau : tout est simulé dans la page.
 *
 *   debit    la course au téléchargement (réseau × fichier → durée)
 *   routage  le jeu du routeur (pannes, liens coupés, TTL)
 *   tcp      le message en morceaux (segments dans le désordre, un perdu)
 *   dns      la résolution d'un nom de domaine, pas à pas        (chapitre 2)
 *   charge   la charge d'un serveur, serveurs dupliqués et DDoS  (chapitre 2)
 *   p2p      distribuer un fichier : client-serveur ou pair-à-pair (chapitre 2)
 *   qcm      un QCM auto-corrigé, questions en JSON dans la page
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------ Outils */

  function el(balise, classe, texte) {
    const n = document.createElement(balise);
    if (classe) n.className = classe;
    if (texte != null) n.textContent = texte;
    return n;
  }

  function bouton(texte, classe) {
    const b = el("button", "snt-bouton" + (classe ? " " + classe : ""), texte);
    b.type = "button";
    return b;
  }

  function nombre(x, decimales) {
    return x.toLocaleString("fr-FR", { maximumFractionDigits: decimales ?? 2 });
  }

  /* Une durée en secondes, dite comme on la dirait : « 1 h 45 min », « 52 s ». */
  function duree(s) {
    if (s < 1) return nombre(s, 2).replace(/^0,/, "0,") + " s";
    if (s < 60) return nombre(s, 1) + " s";
    const j = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.round(s % 60);
    if (j) return `${j} j ${h} h`;
    if (h) return `${h} h ${String(m).padStart(2, "0")} min`;
    return `${m} min ${String(sec).padStart(2, "0")} s`;
  }

  const SVG = "http://www.w3.org/2000/svg";
  function svg(balise, attributs) {
    const n = document.createElementNS(SVG, balise);
    for (const [k, v] of Object.entries(attributs || {})) n.setAttribute(k, v);
    return n;
  }

  const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ------------------------------------------- 1. Course au téléchargement */

  /* Débits en Mbit/s. Comme dans le cours, 1 Mbit = 1 024 kbit : le modem à
     56 kbit/s télécharge donc à 56 ÷ 1 024 Mbit/s. */
  const RESEAUX = [
    { nom: "Modem 56k", note: "1994, ligne téléphonique · 56 kbit/s", debit: 56 / 1024 },
    { nom: "Bluetooth", note: "casque, montre · 2 Mbit/s", debit: 2 },
    { nom: "ADSL", note: "ligne téléphonique · 15 Mbit/s", debit: 15 },
    { nom: "4G", note: "téléphonie mobile · 100 Mbit/s", debit: 100 },
    { nom: "5G", note: "téléphonie mobile · 1 Gbit/s", debit: 1024 },
    { nom: "Fibre optique", note: "lumière dans un fil de verre · 2 Gbit/s", debit: 2048 },
  ];

  /* Tailles en Mo, avec 1 Go = 1 024 Mo. */
  const FICHIERS = [
    { nom: "une photo", taille: 5, libelle: "5 Mo", icone: "📷" },
    { nom: "un album de musique", taille: 650, libelle: "650 Mo", icone: "🎵" },
    { nom: "un film en HD", taille: 3 * 1024, libelle: "3 Go", icone: "🎬" },
    { nom: "un jeu vidéo", taille: 50 * 1024, libelle: "50 Go", icone: "🎮" },
  ];

  const VITESSES = [1, 10, 100, 1000, 10000, 100000];

  function outilDebit(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Choisis un fichier : tous les réseaux le téléchargent en même temps. Qui arrive premier ?"));

    const choix = el("div", "snt-choix");
    racine.appendChild(choix);

    const reglage = el("div", "snt-choix snt-vitesses");
    reglage.appendChild(el("span", "snt-etiquette", "Vitesse de la simulation :"));
    racine.appendChild(reglage);

    const horloge = el("div", "snt-horloge", "Temps écoulé : —");
    racine.appendChild(horloge);

    const pistes = el("div", "snt-pistes");
    racine.appendChild(pistes);
    const lignes = RESEAUX.map((r) => {
      const ligne = el("div", "snt-piste");
      const nom = el("div", "snt-piste-nom");
      nom.innerHTML = `<strong>${r.nom}</strong><small>${r.note}</small>`;
      const barre = el("div", "snt-piste-barre");
      const remplissage = el("i");
      barre.appendChild(remplissage);
      const temps = el("div", "snt-piste-temps", "—");
      ligne.append(nom, barre, temps);
      pistes.appendChild(ligne);
      return { r, remplissage, temps };
    });

    const calcul = el("div", "snt-calcul");
    racine.appendChild(calcul);
    racine.appendChild(el("p", "snt-note",
      "Débits indicatifs : le débit réel dépend de l'abonnement, de la distance et du nombre d'utilisateurs."));

    /* L'état de la course : le temps simulé avance à la vitesse choisie, qu'on
       peut changer en cours de route sans que les barres sautent. */
    let vitesse = 1, simule = 0, dernier = 0, durees = null, enCours = false;

    VITESSES.forEach((v) => {
      const b = bouton(v === 1 ? "temps réel" : "×" + nombre(v, 0));
      if (v === 1) b.classList.add("actif");
      b.addEventListener("click", () => {
        for (const x of reglage.querySelectorAll(".snt-bouton")) x.classList.remove("actif");
        b.classList.add("actif");
        vitesse = v;
      });
      reglage.appendChild(b);
    });

    FICHIERS.forEach((f) => {
      const b = bouton(`${f.icone} ${f.nom} (${f.libelle})`);
      b.addEventListener("click", () => {
        for (const x of choix.children) x.classList.remove("actif");
        b.classList.add("actif");
        lancer(f);
      });
      choix.appendChild(b);
    });

    function lancer(f) {
      const bits = f.taille * 8;                       // en mégabits
      durees = lignes.map(({ r }) => bits / r.debit);
      simule = 0;
      dernier = performance.now();
      const conversion = f.taille >= 1024
        ? `${f.libelle} = ${f.taille / 1024} × 1 024 = ${nombre(f.taille)} Mo, et `
        : "";
      calcul.innerHTML =
        `<strong>Le calcul</strong>, par exemple pour la 4G : ${conversion}${nombre(f.taille)} Mo = ` +
        `${nombre(f.taille)} × 8 = ${nombre(bits)} Mbit, donc Δt = q ÷ d = ${nombre(bits)} ÷ 100 = ` +
        `<strong>${duree(bits / 100)}</strong>.`;
      lignes.forEach((l, i) => {
        l.remplissage.style.width = "0%";
        l.temps.className = "snt-piste-temps";
        l.temps.textContent = duree(durees[i]);
      });
      if (!enCours) { enCours = true; requestAnimationFrame(image); }
    }

    function image(t) {
      simule += ((t - dernier) / 1000) * vitesse;
      dernier = t;
      horloge.textContent = "Temps écoulé : " + duree(simule);
      let fini = true;
      lignes.forEach((l, i) => {
        const p = Math.min(1, simule / durees[i]);
        l.remplissage.style.width = (p * 100).toFixed(3) + "%";
        if (p >= 1) l.temps.classList.add("fini"); else fini = false;
      });
      if (fini || !racine.isConnected) { enCours = false; return; }
      requestAnimationFrame(image);
    }
  }

  /* ---------------------------------------------------- 2. Jeu du routeur */

  /* Le réseau du manuel (doc. B de l'activité 3) : un expéditeur, huit routeurs,
     un destinataire. Coordonnées dans un repère de 800 × 300. */
  const NOEUDS = {
    E: { x: 40, y: 150, nom: "Expéditeur", machine: true },
    R1: { x: 150, y: 150 }, R2: { x: 270, y: 60 }, R3: { x: 440, y: 95 },
    R4: { x: 590, y: 50 }, R5: { x: 300, y: 160 }, R6: { x: 520, y: 225 },
    R7: { x: 290, y: 260 }, R8: { x: 660, y: 150 },
    D: { x: 760, y: 150, nom: "Destinataire", machine: true },
  };
  const LIENS = [
    ["E", "R1"], ["R1", "R2"], ["R1", "R5"], ["R1", "R7"], ["R2", "R3"], ["R5", "R3"],
    ["R5", "R6"], ["R7", "R6"], ["R3", "R4"], ["R3", "R6"], ["R4", "R8"], ["R6", "R8"], ["R8", "D"],
  ];
  const TTL_DEPART = 10;         // petit, pour qu'on puisse voir un paquet mourir
  const NOM = (x) => (NOEUDS[x].machine ? NOEUDS[x].nom : x);

  function outilRoutage(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Clique sur un routeur pour le mettre en panne, sur un lien pour le couper. Puis envoie des paquets : le nombre dans chaque paquet est son TTL."));

    const zone = el("div", "snt-carte");
    const dessin = svg("svg", { viewBox: "0 0 800 300", role: "img",
      "aria-label": "Réseau de huit routeurs entre un expéditeur et un destinataire" });
    zone.appendChild(dessin);
    racine.appendChild(zone);

    const pannes = new Set();
    const coupes = new Set();
    const cle = (a, b) => [a, b].sort().join("-");
    const routeurs = {};

    for (const [a, b] of LIENS) {
      const groupe = svg("g", { class: "snt-lien" });
      const trait = svg("line", { x1: NOEUDS[a].x, y1: NOEUDS[a].y, x2: NOEUDS[b].x, y2: NOEUDS[b].y });
      // une ligne plus épaisse et invisible, pour viser facilement
      const cible = svg("line", { x1: NOEUDS[a].x, y1: NOEUDS[a].y, x2: NOEUDS[b].x, y2: NOEUDS[b].y, class: "cible" });
      groupe.append(trait, cible);
      if (a !== "E" && b !== "D") {
        groupe.addEventListener("click", () => {
          const k = cle(a, b);
          coupes.has(k) ? coupes.delete(k) : coupes.add(k);
          groupe.classList.toggle("coupe", coupes.has(k));
        });
      } else groupe.classList.add("fixe");
      dessin.appendChild(groupe);
    }

    for (const [id, n] of Object.entries(NOEUDS)) {
      const g = svg("g", { class: n.machine ? "snt-machine" : "snt-routeur", transform: `translate(${n.x},${n.y})` });
      if (n.machine) {
        g.append(svg("rect", { x: -26, y: -18, width: 52, height: 34, rx: 5 }),
                 svg("rect", { x: -12, y: 16, width: 24, height: 5, rx: 2 }));
      } else {
        g.append(svg("circle", { r: 19 }));
        g.addEventListener("click", () => {
          pannes.has(id) ? pannes.delete(id) : pannes.add(id);
          g.classList.toggle("panne", pannes.has(id));
        });
        routeurs[id] = g;
      }
      const t = svg("text", { y: n.machine ? 40 : 5, "text-anchor": "middle" });
      t.textContent = n.machine ? n.nom : id;
      g.appendChild(t);
      dessin.appendChild(g);
    }

    const commandes = el("div", "snt-choix");
    const b1 = bouton("📦 Envoyer un paquet");
    const b4 = bouton("📦📦📦📦 Envoyer 4 paquets");
    const raz = bouton("Tout réparer", "discret");
    commandes.append(b1, b4, raz);
    racine.appendChild(commandes);
    const journal = el("ol", "snt-journal");
    racine.appendChild(journal);

    let numero = 0, envols = 0;
    b1.addEventListener("click", () => envoyer(1));
    b4.addEventListener("click", () => envoyer(4));
    raz.addEventListener("click", () => {
      pannes.clear(); coupes.clear();
      dessin.querySelectorAll(".panne, .coupe").forEach((n) => n.classList.remove("panne", "coupe"));
      journal.textContent = "";
      numero = 0;
    });

    function voisins(n) {
      const v = [];
      for (const [a, b] of LIENS) {
        if (coupes.has(cle(a, b))) continue;
        if (a === n) v.push(b); else if (b === n) v.push(a);
      }
      return v.filter((x) => !pannes.has(x));
    }

    /* Distance de chaque machine au destinataire, dans l'état actuel du réseau :
       c'est ce que la table de routage d'un routeur lui permet de savoir. */
    function distances() {
      const dist = { D: 0 };
      const file = ["D"];
      while (file.length) {
        const n = file.shift();
        for (const v of voisins(n)) if (!(v in dist)) { dist[v] = dist[n] + 1; file.push(v); }
      }
      return dist;
    }

    /* Chaque routeur choisit lui-même le saut suivant, sans connaître le reste du
       trajet : le plus souvent le voisin le plus proche du but, parfois un autre
       (un lien plus libre à ce moment-là). Dans un cul-de-sac, il renvoie le
       paquet d'où il vient. */
    function sautSuivant(ici, precedent, dist) {
      const tous = voisins(ici).filter((v) => v !== "E");
      const autres = tous.filter((v) => v !== precedent);
      if (!autres.length) return tous.length ? { vers: precedent, demiTour: true } : null;
      const utiles = autres.filter((v) => v in dist);
      // 80 % : le voisin le plus proche du but. Réglage simulé : en réseau sain, environ
      // 5 % des paquets meurent de leur TTL ; une panne bien placée les fait tous mourir.
      if (utiles.length && Math.random() < 0.8) {
        const meilleur = Math.min(...utiles.map((v) => dist[v]));
        const choix = utiles.filter((v) => dist[v] === meilleur);
        return { vers: choix[Math.floor(Math.random() * choix.length)] };
      }
      return { vers: autres[Math.floor(Math.random() * autres.length)] };
    }

    async function envoyer(combien) {
      envols++;
      b1.disabled = b4.disabled = true;
      const departs = [];
      for (let k = 0; k < combien; k++) departs.push(voyage(++numero, k * 400));
      await Promise.all(departs);
      if (--envols === 0) b1.disabled = b4.disabled = false;
    }

    async function glisser(paquet, a, b) {
      const pas = 18 + Math.random() * 12;             // la charge varie d'un lien à l'autre
      for (let t = 0; t <= pas; t++) {
        const x = a.x + (b.x - a.x) * t / pas, y = a.y + (b.y - a.y) * t / pas;
        paquet.setAttribute("transform", `translate(${x},${y})`);
        await attendre(16);
      }
    }

    async function voyage(n, retard) {
      await attendre(retard);
      const li = el("li");
      journal.prepend(li);
      const paquet = svg("g", { class: "snt-paquet" });
      paquet.append(svg("rect", { x: -12, y: -9, width: 24, height: 18, rx: 3 }));
      const etiquette = svg("text", { y: 4, "text-anchor": "middle" });
      paquet.appendChild(etiquette);
      paquet.setAttribute("transform", `translate(${NOEUDS.E.x},${NOEUDS.E.y})`);
      dessin.appendChild(paquet);

      let ttl = TTL_DEPART;
      etiquette.textContent = ttl;
      const trajet = ["Expéditeur"];
      let ici = "E", precedent = null, issue = "";

      if (pannes.has("R1")) {
        issue = "perdu";
      } else {
        await glisser(paquet, NOEUDS.E, NOEUDS.R1);
        precedent = "E"; ici = "R1";
        while (true) {
          trajet.push(ici);
          ttl--;                                         // chaque routeur traversé retire 1
          etiquette.textContent = ttl;
          if (ttl === 0) { issue = "ttl"; break; }
          const saut = sautSuivant(ici, precedent, distances());
          if (!saut) { issue = "perdu"; break; }
          if (saut.demiTour) trajet.push("↩︎");
          await glisser(paquet, NOEUDS[ici], NOEUDS[saut.vers]);
          precedent = ici; ici = saut.vers;
          if (ici === "D") { trajet.push("Destinataire"); issue = "arrive"; break; }
          if (pannes.has(ici)) { issue = "perdu"; break; }
        }
      }

      const chemin = trajet.join(" → ").replaceAll("→ ↩︎ →", "↩︎");
      if (issue === "arrive") {
        li.innerHTML = `Paquet n°${n} : ${chemin} — <strong>arrivé</strong> (TTL ${TTL_DEPART} → ${ttl})`;
        paquet.classList.add("arrive");
      } else if (issue === "ttl") {
        li.innerHTML = `Paquet n°${n} : ${chemin} — <strong>détruit</strong> : son TTL est tombé à 0`;
        li.className = "perdu";
        paquet.classList.add("detruit");
        routeurs[ici]?.classList.add("alerte");
        setTimeout(() => routeurs[ici]?.classList.remove("alerte"), 800);
      } else {
        li.innerHTML = `Paquet n°${n} : ${chemin} — <strong>perdu</strong>, aucun chemin praticable`;
        li.className = "perdu";
        paquet.classList.add("detruit");
      }
      await attendre(700);
      paquet.remove();
    }
  }

  /* --------------------------------------------- 3. Le message en morceaux */

  const MESSAGE = ["Rendez-vous ", "samedi à 14 h ", "devant le cinéma. ",
                   "N'oublie pas ", "les billets, ", "je n'ai pas les miens !"];

  function outilTcp(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Ton ami t'envoie un message découpé en segments numérotés. Clique sur les segments dans l'ordre de leur numéro pour reconstituer le message."));

    const commandes = el("div", "snt-choix");
    const envoi = bouton("📨 Recevoir le message");
    const manque = bouton("🙋 Il en manque un !", "discret");
    manque.hidden = true;
    commandes.append(envoi, manque);
    racine.appendChild(commandes);

    racine.appendChild(el("div", "snt-sous-titre", "Segments reçus, dans l'ordre d'arrivée"));
    const recus = el("div", "snt-segments");
    racine.appendChild(recus);
    racine.appendChild(el("div", "snt-sous-titre", "Message reconstitué"));
    const message = el("div", "snt-message", "…");
    racine.appendChild(message);
    const retour = el("p", "snt-retour");
    racine.appendChild(retour);

    let attendu, perdu, place;

    envoi.addEventListener("click", async () => {
      envoi.disabled = true;
      recus.textContent = "";
      message.textContent = "…";
      retour.textContent = "";
      retour.className = "snt-retour";
      attendu = 1;
      place = [];
      perdu = 2 + Math.floor(Math.random() * (MESSAGE.length - 2));   // jamais le premier
      const ordre = MESSAGE.map((_, i) => i + 1).filter((n) => n !== perdu);
      for (let i = ordre.length - 1; i > 0; i--) {                     // mélange
        const j = Math.floor(Math.random() * (i + 1));
        [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
      }
      for (const n of ordre) { ajouter(n); await attendre(300); }
      manque.hidden = false;
      envoi.disabled = false;
      envoi.textContent = "📨 Recevoir un autre message";
    });

    function ajouter(n) {
      const carte = bouton("");
      carte.className = "snt-segment";
      carte.innerHTML = `<span>n°${n}</span>${MESSAGE[n - 1]}`;
      carte.addEventListener("click", () => {
        if (carte.classList.contains("place")) return;
        if (n === attendu) {
          carte.classList.add("place");
          place.push(MESSAGE[n - 1]);
          message.textContent = place.join("");
          attendu++;
          retour.textContent = "";
          if (attendu > MESSAGE.length) {
            retour.textContent = "✅ Message complet ! C'est exactement le travail de TCP : remettre les segments dans l'ordre et redemander ceux qui manquent.";
            retour.className = "snt-retour bravo";
            manque.hidden = true;
          }
        } else {
          carte.classList.add("refus");
          setTimeout(() => carte.classList.remove("refus"), 400);
          retour.textContent = n < attendu
            ? "Ce segment est déjà placé."
            : `Pas encore : c'est le segment n°${attendu} qu'il faut maintenant. Est-il bien arrivé ?`;
        }
      });
      recus.appendChild(carte);
    }

    manque.addEventListener("click", async () => {
      if (attendu !== perdu || recus.querySelector(`[data-renvoi]`)) {
        retour.textContent = attendu > MESSAGE.length
          ? "Tout est arrivé."
          : `Non : le segment n°${attendu} est bien arrivé. Cherche-le parmi les segments reçus.`;
        return;
      }
      manque.disabled = true;
      retour.textContent = `Ton ordinateur redemande le segment n°${perdu} à l'expéditeur…`;
      await attendre(900);
      ajouter(perdu);
      recus.lastChild.dataset.renvoi = "1";
      recus.lastChild.classList.add("renvoi");
      retour.textContent = `Le segment n°${perdu} a été renvoyé. Continue !`;
      manque.disabled = false;
    });
  }

  /* ===================================================== Chapitre 2 */

  /* --------------------------------------------------- 4. Résolution DNS */

  /* Adresses fictives, prises dans les plages réservées à la documentation. */
  const DOMAINES = {
    "lycee-exemple.fr": { ip: "185.42.28.10", tld: ".fr", page: "🏫 Bienvenue au lycée Exemple !" },
    "jeux-en-ligne.com": { ip: "203.0.113.25", tld: ".com", page: "🎮 Prêt pour une partie ?" },
    "encyclopedie.org": { ip: "198.51.100.7", tld: ".org", page: "📚 L'encyclopédie libre" },
    "lycee-exmple.fr": { ip: null, tld: ".fr", faute: true },
  };
  const N_DNS = {
    nav: { x: 95, y: 185, nom: "Ton navigateur", type: "ordi" },
    dns: { x: 360, y: 70, nom: "Serveur DNS", type: "dns" },
    web: { x: 360, y: 300, nom: "Serveur web", type: "web" },
    racine: { x: 690, y: 50, nom: "Serveur racine", type: "dns", coulisse: true },
    tld: { x: 690, y: 165, nom: "Serveur de l'extension", type: "dns", coulisse: true },
    dom: { x: 690, y: 280, nom: "Serveur du domaine", type: "dns", coulisse: true },
  };

  function outilDns(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Choisis un site à visiter, puis avance étape par étape pour suivre ce que fait ton navigateur."));
    const choix = el("div", "snt-choix");
    racine.appendChild(choix);
    const options = el("label", "snt-option");
    const coulisses = el("input");
    coulisses.type = "checkbox";
    options.append(coulisses, document.createTextNode(" Voir aussi les coulisses du serveur DNS"));
    racine.appendChild(options);

    const zone = el("div", "snt-carte");
    const dessin = svg("svg", { viewBox: "0 0 800 360", role: "img", "aria-label": "Navigateur, serveur DNS et serveur web" });
    zone.appendChild(dessin);
    racine.appendChild(zone);

    // pointes de flèche, une par couleur (identifiants propres à cet outil)
    const ident = "snt-dns-" + Math.random().toString(36).slice(2, 8);
    const defs = svg("defs");
    for (const [nom, couleur] of [["dns", "#E67E22"], ["web", "#4caf50"]]) {
      const m = svg("marker", { id: `${ident}-${nom}`, viewBox: "0 0 10 10", refX: 9, refY: 5,
                                markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" });
      m.appendChild(svg("path", { d: "M0 0 L10 5 L0 10 z", fill: couleur }));
      defs.appendChild(m);
    }
    dessin.appendChild(defs);
    const fleches = svg("g");
    dessin.appendChild(fleches);
    const noeuds = {};
    for (const [id, n] of Object.entries(N_DNS)) {
      const g = svg("g", { class: "snt-dns-noeud" + (n.coulisse ? " coulisse" : ""), transform: `translate(${n.x},${n.y})` });
      if (n.type === "ordi") g.append(svg("rect", { x: -28, y: -20, width: 56, height: 38, rx: 5, class: "ecran" }),
                                      svg("rect", { x: -12, y: 18, width: 24, height: 5, rx: 2, class: "ecran" }));
      else g.append(svg("rect", { x: -18, y: -26, width: 36, height: 52, rx: 4, class: n.type === "web" ? "web" : "dns" }));
      const t = svg("text", { y: n.type === "ordi" ? 42 : 44, "text-anchor": "middle" });
      t.textContent = n.nom;
      g.appendChild(t);
      dessin.appendChild(g);
      noeuds[id] = g;
    }

    const commandes = el("div", "snt-choix");
    const suivant = bouton("Étape suivante ▶");
    suivant.disabled = true;
    commandes.appendChild(suivant);
    racine.appendChild(commandes);

    const navigateur = el("div", "snt-navigateur");
    const barre = el("div", "snt-navigateur-barre", "—");
    const page = el("div", "snt-navigateur-page", "La page s'affichera ici.");
    navigateur.append(barre, page);
    const journal = el("ol", "snt-journal snt-journal-dns");
    const bas = el("div", "snt-dns-bas");
    bas.append(navigateur, journal);
    racine.appendChild(bas);

    const memoire = new Set();       // ce que le serveur DNS a déjà appris
    let etapes = [], rang = 0;

    function peindreCoulisses() {
      for (const [id, n] of Object.entries(N_DNS)) if (n.coulisse) noeuds[id].style.display = coulisses.checked ? "" : "none";
    }
    coulisses.addEventListener("change", peindreCoulisses);
    peindreCoulisses();

    Object.keys(DOMAINES).forEach((nom) => {
      const b = bouton(nom + (DOMAINES[nom].faute ? " (faute de frappe)" : ""));
      b.addEventListener("click", () => {
        for (const x of choix.children) x.classList.remove("actif");
        b.classList.add("actif");
        demarrer(nom);
      });
      choix.appendChild(b);
    });

    function demarrer(nom) {
      const d = DOMAINES[nom];
      fleches.textContent = "";
      journal.textContent = "";
      barre.textContent = "🔒 " + nom;
      page.className = "snt-navigateur-page";
      page.textContent = "Chargement…";
      etapes = [["nav", "dns", `Quelle est l'adresse IP du domaine ${nom} ?`]];
      if (memoire.has(nom)) {
        etapes.push([null, null, "Le serveur DNS a déjà cherché ce nom tout à l'heure : il s'en souvient et répond aussitôt."]);
      } else if (coulisses.checked) {
        etapes.push(["dns", "racine", `Qui s'occupe des noms en ${d.tld} ?`],
                    ["racine", "dns", `Demande au serveur des ${d.tld}.`],
                    ["dns", "tld", `Qui s'occupe du domaine ${nom} ?`]);
        if (d.faute) etapes.push(["tld", "dns", `Aucun domaine ne s'appelle ${nom}.`]);
        else etapes.push(["tld", "dns", `Demande au serveur du domaine ${nom}.`],
                         ["dns", "dom", `Quelle est l'adresse IP du domaine ${nom} ?`],
                         ["dom", "dns", `C'est ${d.ip}.`]);
      }
      if (d.faute) {
        etapes.push(["dns", "nav", `Je ne trouve aucune adresse IP pour le domaine ${nom}.`, "erreur"]);
      } else {
        etapes.push(["dns", "nav", `C'est ${d.ip}.`],
                    ["nav", "web", `Requête envoyée à ${d.ip} : « la page d'accueil du site ${nom}, s'il te plaît »`],
                    ["web", "nav", "Voici la page demandée.", "page"]);
      }
      rang = 0;
      suivant.disabled = false;
      suivant.onclick = () => avancer(nom, d);
      avancer(nom, d);
    }

    async function avancer(nom, d) {
      if (rang >= etapes.length) return;
      suivant.disabled = true;
      const [de, vers, texte, fin] = etapes[rang++];
      const li = el("li", fin === "erreur" ? "perdu" : "", texte);
      journal.appendChild(li);
      li.scrollIntoView({ block: "nearest" });
      if (de) {
        const a = N_DNS[de], b = N_DNS[vers];
        const coul = (de === "web" || vers === "web") ? "web" : "dns";
        // L'aller et le retour entre deux machines sont décalés de part et d'autre de
        // leur axe : les deux traits et leurs numéros restent visibles ensemble.
        const L = Math.hypot(b.x - a.x, b.y - a.y);
        // la normale à droite du sens de parcours : l'aller et le retour tombent de part et d'autre
        const nx = -(b.y - a.y) / L, ny = (b.x - a.x) / L;
        const dep = { x: a.x + nx * 6, y: a.y + ny * 6 };
        // le trait s'arrête au bord de la machine visée, pour que la pointe reste visible
        const r = 32;
        const bout = { x: b.x - (b.x - a.x) * r / L + nx * 6, y: b.y - (b.y - a.y) * r / L + ny * 6 };
        const trait = svg("line", { x1: dep.x, y1: dep.y, x2: dep.x, y2: dep.y, class: "snt-dns-trait " + coul,
                                    "marker-end": `url(#${ident}-${coul})` });
        fleches.appendChild(trait);
        const n = svg("text", { class: "snt-dns-num", x: (a.x + b.x) / 2 + nx * 20, y: (a.y + b.y) / 2 + ny * 20 + 5,
                                "text-anchor": "middle" });
        n.textContent = rang;
        for (let t = 0; t <= 20; t++) {
          trait.setAttribute("x2", dep.x + (bout.x - dep.x) * t / 20);
          trait.setAttribute("y2", dep.y + (bout.y - dep.y) * t / 20);
          await attendre(18);
        }
        fleches.appendChild(n);
      }
      if (fin === "erreur") {
        page.className = "snt-navigateur-page erreur";
        page.innerHTML = "<strong>Ce site est inaccessible</strong><br>Impossible de trouver l'adresse IP du serveur.<br><code>DNS_PROBE_FINISHED_NXDOMAIN</code>";
      }
      if (fin === "page") {
        page.className = "snt-navigateur-page ok";
        page.textContent = d.page;
        memoire.add(nom);
      }
      suivant.disabled = rang >= etapes.length;
    }
  }

  /* ----------------------------------------------- 5. La charge d'un serveur */

  const CAPACITE = 500;              // requêtes qu'un serveur traite en même temps

  function outilCharge(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Un site de billetterie ouvre la vente des places d'un concert. Règle le nombre de visiteurs et de serveurs, puis lance une attaque."));

    const reglages = el("div", "snt-reglages");
    const visiteurs = el("input"); visiteurs.type = "range"; visiteurs.min = 0; visiteurs.max = 3000; visiteurs.step = 50; visiteurs.value = 300;
    const lv = el("label", "", "");
    const nbServeurs = el("input"); nbServeurs.type = "range"; nbServeurs.min = 1; nbServeurs.max = 8; nbServeurs.value = 1;
    const ls = el("label", "", "");
    reglages.append(lv, visiteurs, ls, nbServeurs);
    racine.appendChild(reglages);

    const commandes = el("div", "snt-choix");
    const attaque = bouton("☠️ Lancer une attaque DDoS");
    commandes.appendChild(attaque);
    racine.appendChild(commandes);

    const serveurs = el("div", "snt-serveurs");
    racine.appendChild(serveurs);
    const bilan = el("p", "snt-retour");
    racine.appendChild(bilan);

    let ddos = false;
    attaque.addEventListener("click", () => {
      ddos = !ddos;
      attaque.textContent = ddos ? "🛑 Arrêter l'attaque" : "☠️ Lancer une attaque DDoS";
      attaque.classList.toggle("actif", ddos);
      peindre();
    });
    visiteurs.addEventListener("input", peindre);
    nbServeurs.addEventListener("input", peindre);

    function peindre() {
      const v = Number(visiteurs.value), n = Number(nbServeurs.value);
      const pirates = ddos ? 20000 : 0;
      lv.innerHTML = `Visiteurs en même temps : <strong>${nombre(v, 0)}</strong>`;
      ls.innerHTML = `Nombre de serveurs identiques : <strong>${n}</strong>`;
      const total = v + pirates;
      const charge = total / (n * CAPACITE);
      serveurs.textContent = "";
      for (let k = 0; k < n; k++) {
        const s = el("div", "snt-serveur");
        const jauge = el("div", "snt-serveur-jauge");
        const i = el("i");
        i.style.height = Math.min(100, charge * 100) + "%";
        i.className = charge > 1 ? "sature" : charge > .7 ? "charge" : "";
        jauge.appendChild(i);
        s.append(jauge, el("span", "", `Serveur ${k + 1}`));
        serveurs.appendChild(s);
      }
      const servies = Math.min(1, 1 / Math.max(charge, 1e-9));
      const legitimesServis = v * Math.min(1, servies);
      const attente = charge < 1 ? 0.2 / (1 - 0.8 * charge) : null;
      bilan.className = "snt-retour" + (charge <= .7 ? " bravo" : "");
      if (v === 0 && !ddos) bilan.textContent = "Personne sur le site pour l'instant.";
      else if (charge <= .7) bilan.textContent = `✅ Le site répond en ${nombre(attente, 1)} s. Tout le monde achète sa place.`;
      else if (charge <= 1) bilan.textContent = `⚠️ Le site ralentit : ${nombre(attente, 1)} s d'attente. Les serveurs sont presque saturés.`;
      else bilan.textContent = `❌ Saturé : seuls ${Math.round(servies * 100)} % des requêtes sont traitées. ` +
        `${nombre(Math.round(v - legitimesServis), 0)} vrais visiteurs ne peuvent plus accéder au site` +
        (ddos ? " : c'est un déni de service." : ".");
    }
    peindre();
  }

  /* --------------------------------------------- 6. Client-serveur ou pair-à-pair */

  const MORCEAUX = 8;

  function outilP2p(racine) {
    racine.appendChild(el("p", "snt-consigne",
      "Une mise à jour de jeu, découpée en 8 morceaux, doit arriver sur tous les ordinateurs. Compare les deux modèles."));

    const choix = el("div", "snt-choix");
    let mode = "cs", nb = 12;
    const bCs = bouton("🖥️ Client-serveur"), bP2p = bouton("🔗 Pair-à-pair");
    bCs.classList.add("actif");
    choix.append(bCs, bP2p, el("span", "snt-etiquette", "Ordinateurs :"));
    [6, 12, 24].forEach((k) => {
      const b = bouton(String(k), "petit");
      if (k === nb) b.classList.add("actif");
      b.addEventListener("click", () => { nb = k; choix.querySelectorAll(".petit").forEach((x) => x.classList.toggle("actif", x === b)); preparer(); });
      choix.appendChild(b);
    });
    racine.appendChild(choix);
    bCs.addEventListener("click", () => { mode = "cs"; bCs.classList.add("actif"); bP2p.classList.remove("actif"); preparer(); });
    bP2p.addEventListener("click", () => { mode = "p2p"; bP2p.classList.add("actif"); bCs.classList.remove("actif"); preparer(); });

    const zone = el("div", "snt-carte");
    const dessin = svg("svg", { viewBox: "0 0 800 380", role: "img", "aria-label": "Un serveur et des ordinateurs qui reçoivent les morceaux" });
    zone.appendChild(dessin);
    racine.appendChild(zone);

    const commandes = el("div", "snt-choix");
    const lancer = bouton("▶ Lancer la distribution");
    const panne = bouton("💥 Le serveur tombe en panne", "discret");
    commandes.append(lancer, panne);
    racine.appendChild(commandes);
    const horloge = el("div", "snt-horloge");
    racine.appendChild(horloge);
    const tableau = el("table", "snt-resultats");
    tableau.innerHTML = "<thead><tr><th>Modèle</th><th>Ordinateurs</th><th>Durée</th></tr></thead><tbody></tbody>";
    racine.appendChild(tableau);

    let pairs = [], serveurEnPanne = false, tour = 0, enCours = false, liensG;

    function preparer() {
      enCours = false;
      serveurEnPanne = false;
      tour = 0;
      horloge.textContent = "Temps : 0 tour";
      dessin.textContent = "";
      liensG = svg("g");
      dessin.appendChild(liensG);
      const srv = svg("g", { class: "snt-p2p-serveur", transform: "translate(400,190)" });
      srv.append(svg("rect", { x: -22, y: -30, width: 44, height: 60, rx: 5 }));
      const t = svg("text", { y: 48, "text-anchor": "middle" }); t.textContent = "Serveur";
      srv.appendChild(t);
      dessin.appendChild(srv);
      pairs = [];
      for (let k = 0; k < nb; k++) {
        const a = 2 * Math.PI * k / nb - Math.PI / 2;
        const x = 400 + 330 * Math.cos(a), y = 190 + 150 * Math.sin(a);
        const g = svg("g", { class: "snt-p2p-pair", transform: `translate(${x},${y})` });
        g.append(svg("rect", { x: -20, y: -15, width: 40, height: 26, rx: 4, class: "ecran" }));
        const cases = [];
        for (let m = 0; m < MORCEAUX; m++) {
          const c = svg("rect", { x: -20 + m * 5, y: 15, width: 4.4, height: 7, class: "morceau" });
          g.appendChild(c); cases.push(c);
        }
        dessin.appendChild(g);
        pairs.push({ x, y, a: new Set(), cases, g });
      }
      lancer.disabled = false;
      lancer.textContent = "▶ Lancer la distribution";
      panne.disabled = true;
    }

    function transfert(de, vers) {
      const l = svg("line", { x1: de.x, y1: de.y, x2: vers.x, y2: vers.y, class: "snt-p2p-lien" + (de.serveur ? " serveur" : "") });
      liensG.appendChild(l);
      setTimeout(() => l.remove(), 380);
    }

    lancer.addEventListener("click", async () => {
      if (pairs.every((p) => p.a.size)) preparer();
      lancer.disabled = true;
      panne.disabled = false;
      enCours = true;
      const S = { x: 400, y: 190, serveur: true };
      while (enCours && !pairs.every((p) => p.a.size === MORCEAUX)) {
        tour++;
        const recus = new Map();                       // pair → morceaux qu'il reçoit ce tour-ci (2 au plus)
        const envois = [];
        const attend = (p) => recus.get(p) || new Set();
        const manque = (p, m) => !p.a.has(m) && !attend(p).has(m);
        const prevoir = (de, p, m) => { envois.push([de, p, m]); recus.set(p, new Set([...attend(p), m])); };
        // Le serveur envoie 2 morceaux par tour, s'il fonctionne.
        if (!serveurEnPanne) for (let k = 0; k < 2; k++) {
          if (mode === "cs") {
            // il sert les ordinateurs les uns après les autres
            const p = pairs.find((q) => attend(q).size < 2 && [...Array(MORCEAUX).keys()].some((m) => manque(q, m)));
            if (!p) break;
            prevoir(S, p, [...Array(MORCEAUX).keys()].find((m) => manque(p, m)));
          } else {
            // il diffuse d'abord le morceau le plus rare, à quelqu'un qui ne l'a pas
            const enRoute = (m) => [...recus.values()].filter((e) => e.has(m)).length;
            const ordre = [...Array(MORCEAUX).keys()].sort((x, y) => compte(x) + enRoute(x) - compte(y) - enRoute(y) || Math.random() - .5);
            let fait = false;
            for (const m of ordre) {
              const cand = pairs.filter((q) => attend(q).size < 2 && manque(q, m));
              if (cand.length) { prevoir(S, cand[Math.floor(Math.random() * cand.length)], m); fait = true; break; }
            }
            if (!fait) break;
          }
        }
        // En pair-à-pair, chaque ordinateur envoie aussi un morceau qu'il possède.
        if (mode === "p2p") for (const q of pairs) {
          if (!q.a.size) continue;
          const cand = pairs.filter((p) => p !== q && attend(p).size < 2 && [...q.a].some((m) => manque(p, m)));
          if (!cand.length) continue;
          const p = cand[Math.floor(Math.random() * cand.length)];
          prevoir(q, p, rare([...q.a].filter((m) => manque(p, m))));
        }
        if (!envois.length) {
          horloge.textContent = `Temps : ${tour - 1} tours — plus personne ne peut envoyer les morceaux manquants : la distribution est bloquée.`;
          enCours = false;
          break;
        }
        for (const [de, p, m] of envois) { p.a.add(m); p.cases[m].classList.add("recu"); transfert(de, p); }
        for (const p of pairs) p.g.classList.toggle("complet", p.a.size === MORCEAUX);
        const presents = [...Array(MORCEAUX).keys()].filter((m) => compte(m) > 0).length;
        horloge.textContent = `Temps : ${tour} tour${tour > 1 ? "s" : ""}` +
          (mode === "p2p" ? ` · morceaux déjà présents chez les ordinateurs : ${presents}/${MORCEAUX}` : "");
        await attendre(mode === "cs" ? 150 : 420);
      }
      panne.disabled = true;
      if (pairs.every((p) => p.a.size === MORCEAUX)) {
        horloge.textContent = `Terminé en ${tour} tours.`;
        const tr = el("tr");
        tr.innerHTML = `<td>${mode === "cs" ? "Client-serveur" : "Pair-à-pair"}${serveurEnPanne ? " (serveur en panne)" : ""}</td><td>${nb}</td><td>${tour} tours</td>`;
        tableau.querySelector("tbody").appendChild(tr);
      }
      lancer.disabled = false;
      lancer.textContent = "▶ Recommencer";
    });

    const compte = (m) => pairs.filter((p) => p.a.has(m)).length;
    function rare(liste) {
      // le morceau le moins répandu parmi les ordinateurs : celui qu'il faut diffuser en priorité
      const min = Math.min(...liste.map(compte));
      const choix = liste.filter((m) => compte(m) === min);
      return choix[Math.floor(Math.random() * choix.length)];
    }

    panne.addEventListener("click", () => {
      serveurEnPanne = true;
      dessin.querySelector(".snt-p2p-serveur").classList.add("panne");
      panne.disabled = true;
    });

    preparer();
  }

  /* ------------------------------------------------------------- 7. QCM */

  function outilQcm(racine) {
    const source = racine.querySelector("script[type='application/json']");
    if (!source) return;
    const questions = JSON.parse(source.textContent);
    const liste = el("ol", "snt-qcm");
    racine.appendChild(liste);
    const groupes = questions.map((q, i) => {
      const li = el("li");
      li.appendChild(el("p", "snt-qcm-question", q.question));
      const options = el("div", "snt-qcm-options");
      q.options.forEach((texte, j) => {
        const label = el("label");
        const radio = el("input");
        radio.type = "radio";
        radio.name = `qcm-${Math.random().toString(36).slice(2)}-${i}`;
        radio.value = j;
        label.append(radio, document.createTextNode(" " + texte));
        options.appendChild(label);
        radio.addEventListener("change", () => { li.dataset.etat = ""; explication.hidden = true; });
      });
      // les noms doivent être communs à la question : on les aligne sur le premier
      const nom = options.querySelector("input").name;
      options.querySelectorAll("input").forEach((r) => (r.name = nom));
      li.appendChild(options);
      const explication = el("p", "snt-qcm-explication", q.explication || "");
      explication.hidden = true;
      li.appendChild(explication);
      liste.appendChild(li);
      return { li, options, explication, bonne: q.bonne };
    });

    const pied = el("div", "snt-choix");
    const valider = bouton("Vérifier mes réponses");
    const recommencer = bouton("Recommencer", "discret");
    pied.append(valider, recommencer);
    racine.appendChild(pied);
    const score = el("p", "snt-retour");
    racine.appendChild(score);

    valider.addEventListener("click", () => {
      let bonnes = 0, repondues = 0;
      for (const g of groupes) {
        const coche = g.options.querySelector("input:checked");
        if (!coche) { g.li.dataset.etat = "vide"; continue; }
        repondues++;
        const juste = Number(coche.value) === g.bonne;
        if (juste) bonnes++;
        g.li.dataset.etat = juste ? "juste" : "faux";
        g.explication.hidden = false;
      }
      score.className = "snt-retour" + (bonnes === groupes.length ? " bravo" : "");
      score.textContent = `${bonnes} bonne(s) réponse(s) sur ${groupes.length}` +
        (repondues < groupes.length ? ` — ${groupes.length - repondues} question(s) sans réponse.` : ".");
    });
    recommencer.addEventListener("click", () => {
      for (const g of groupes) {
        g.li.dataset.etat = "";
        g.explication.hidden = true;
        g.options.querySelectorAll("input").forEach((r) => (r.checked = false));
      }
      score.textContent = "";
    });
  }

  /* ------------------------------------------------------- Démarrage */

  const OUTILS = { debit: outilDebit, routage: outilRoutage, tcp: outilTcp, dns: outilDns,
                   charge: outilCharge, p2p: outilP2p, qcm: outilQcm };

  function demarrer() {
    document.querySelectorAll(".snt-outil[data-outil]").forEach((racine) => {
      if (racine.dataset.pret) return;
      const outil = OUTILS[racine.dataset.outil];
      if (!outil) return;
      racine.dataset.pret = "1";
      outil(racine);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
