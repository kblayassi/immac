#!/bin/zsh
# Fabrique l'app « Console des évaluations », à ouvrir d'un double-clic.
#
#   zsh tools/evaluations/creer_raccourci.sh
#
# Elle lance tools/evaluations/console.mjs en arrière-plan, sans fenêtre de
# terminal, et la console ouvre sa page dans le navigateur. Si la console tourne
# déjà, un nouveau double-clic rouvre simplement sa page. On l'arrête depuis la
# page, bouton « Arrêter ».
#
# L'app est rangée dans ~/Applications : Spotlight la trouve, et on peut la
# glisser dans le Dock. Elle n'est pas dans le dépôt — elle retient deux chemins
# propres à cet ordinateur, celui du dépôt et celui de Node. Si l'un des deux
# change (dépôt déplacé, Node réinstallé ailleurs), relance ce script.
#
# Journal de la console lancée par l'app : ~/Library/Logs/console-evaluations.log

set -euo pipefail

ICI=${0:A:h}
DEPOT=${ICI:h:h}
NOM="Console des évaluations"
APP="$HOME/Applications/$NOM.app"
JOURNAL="$HOME/Library/Logs/console-evaluations.log"

# Une app lancée depuis le Finder n'hérite pas du PATH du terminal : on retient
# donc le chemin complet de Node tel qu'on le trouve ici, maintenant.
NODE=$(command -v node || true)
if [[ -z $NODE ]]; then
  print -u2 "Node est introuvable dans ce terminal : installe-le, puis relance ce script."
  exit 1
fi
# Surtout ne pas résoudre le lien : sous Homebrew, /opt/homebrew/bin/node est
# stable, alors que sa cible (…/Cellar/node/<version>/bin/node) disparaît à la
# première mise à jour de Node.

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# ------------------------------------------------------------------ Le script de l'app
# `do shell script` attend que plus personne ne tienne ses sorties ouvertes. Seul
# Node doit donc partir en arrière-plan, entrée et sorties redirigées : écrit
# « mkdir && cd && nohup node … & », le `&` emporterait toute la chaîne dans un
# sous-shell qui, lui, garderait les sorties — l'app resterait bloquée, et un
# second double-clic ne ferait que la réveiller sans rien lancer.
cat > "$TMP/app.applescript" <<APPLESCRIPT
set depot to "$DEPOT"
set noeud to "$NODE"
set journal to "$JOURNAL"

try
  do shell script "test -x " & quoted form of noeud
on error
  display alert "Node est introuvable" message "La console l'attend ici :" & return & noeud & return & return & "Relance tools/evaluations/creer_raccourci.sh depuis le terminal pour mettre l'app à jour." as critical
  return
end try

try
  do shell script "test -f " & quoted form of (depot & "/tools/evaluations/console.mjs")
on error
  display alert "Le dépôt est introuvable" message "La console l'attend ici :" & return & depot & return & return & "S'il a été déplacé, relance tools/evaluations/creer_raccourci.sh depuis son nouvel emplacement." as critical
  return
end try

do shell script "mkdir -p " & quoted form of "$HOME/Library/Logs" & " && cd " & quoted form of depot & " || exit 1; nohup " & quoted form of noeud & " tools/evaluations/console.mjs >> " & quoted form of journal & " 2>&1 < /dev/null &"
APPLESCRIPT

mkdir -p "$HOME/Applications"
rm -rf "$APP"
osacompile -o "$APP" "$TMP/app.applescript"

# L'app ne reste pas ouverte : elle lance la console et se ferme. Sans cette
# clé, elle apparaîtrait un instant dans le Dock pour rien.
/usr/libexec/PlistBuddy -c "Add :LSUIElement bool true" "$APP/Contents/Info.plist" 2>/dev/null \
  || /usr/libexec/PlistBuddy -c "Set :LSUIElement true" "$APP/Contents/Info.plist"

# ------------------------------------------------------------------ L'icône
# QuickLook sait rendre un SVG : on en tire les tailles d'un .icns. Si quoi que
# ce soit manque, l'app garde l'icône par défaut — elle marche tout autant.
if qlmanage -t -s 1024 -o "$TMP" "$ICI/console/icone.svg" >/dev/null 2>&1 && [[ -f "$TMP/icone.svg.png" ]]; then
  JEU="$TMP/icone.iconset"
  mkdir -p "$JEU"
  for taille in 16 32 128 256 512; do
    sips -z $taille $taille "$TMP/icone.svg.png" --out "$JEU/icon_${taille}x${taille}.png" >/dev/null
    double=$((taille * 2))
    sips -z $double $double "$TMP/icone.svg.png" --out "$JEU/icon_${taille}x${taille}@2x.png" >/dev/null
  done
  if iconutil -c icns "$JEU" -o "$APP/Contents/Resources/applet.icns" 2>/dev/null; then
    touch "$APP"                      # pour que le Finder relise l'icône
  else
    print "  (icône non appliquée : l'app garde l'icône par défaut)"
  fi
fi

# osacompile a signé l'app ; l'icône et le réglage du Dock, ajoutés ensuite,
# ont rompu ce sceau. On la re-signe — signature locale, sans identité — pour
# que macOS accepte de l'ouvrir.
codesign --force --sign - "$APP" 2>/dev/null
codesign --verify "$APP"

print ""
print "  ✓ $NOM"
print "    $APP"
print ""
print "  Double-clic, ou Spotlight (⌘ Espace) : « Console des évaluations »."
print "  Pour l'avoir sous la main, glisse-la dans le Dock."
print ""
print "  Elle retient :"
print "    le dépôt  $DEPOT"
print "    Node      $NODE"
print "  Si l'un des deux change, relance ce script."
print ""
