---
title: Playground CSS
weight: 1.5
---

# CSS Playground

!!! css "Couleur de paragraphe"
    <div id="bac_a_sable">
        <div id="zoneIllustrative">
            <p id="boiteIllustrative">
                Ci-contre, on peut choisir la couleur de l'arrière-plan de cette boîte, la couleur du texte de base et celle <span id="important">des mots importants</span> à mettre en valeur.
            </p>
        </div>
                    
    <div id="formulaire">
        <form id="choixAttributs">
            <label for="FondParagraphe">**Arrière-plan des paragraphes :**</label>
            <input type="color" id="FondParagraphe" name="FondParagraphe" value="#ffffff" oninput="definirCouleur()">
        <br>
            <label for="CouleurParagraphe">**Texte dans les paragraphes :**</label>
            <input type="color" id="CouleurParagraphe" name="CouleurParagraphe" value="#000000" oninput="definirCouleur()">
        <br>
            <label for="CouleurImportant">**Mots importants :**</label>
            <input type="color" id="CouleurImportant" name="CouleurImportant" value="#000000" oninput="definirCouleur()">
        </form>
        </div>

    </div>

    ---
    <p><strong>Code CSS :</strong></p>
    <div id="codecss" class="highlight">
    <pre><code id="lecode" class="language-css"></code></pre>
    </div>


!!! css "Bordure de paragraphe"
    <p>Dans ce bac a sable, les dimensions sont en pixels.</p>
    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative">Ci-contre, on peut choisir la bordure qui encadre le paragraphe, c'est-a-dire son epaisseur, sa couleur et son apparence.</p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label for="choixEpaisseur">**Epaisseur :**</label>
    <input type="range" name="choixEpaisseur" id="choixEpaisseur" min="0" max="50" value="0" step="1" oninput="definirBordure(this); document.getElementById('rangevalue').value=this.value;">
    <output id="rangevalue">0</output>
    <br>
    <label for="choixStyle">**Apparence :**</label>
    <select name="choixStyle" id="choixStyle" oninput="definirBordure(this)">
    <option value="none">aucune</option>
    <option value="hidden">masquee</option>
    <option value="solid">trait</option>
    <option value="dashed">pointillee</option>
    <option value="dotted">point par point</option>
    <option value="double">double</option>
    <option value="groove">sous-epaisseur</option>
    <option value="ridge">sur-epaisseur</option>
    <option value="inset">sous-elevee</option>
    <option value="outset">sur-elevee</option>
    </select>
    <br>
    <label for="choixCouleur">**Couleur :**</label>
    <input type="color" id="choixCouleur" name="choixCouleur" value="#000000" oninput="definirBordure(this)">
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_1" class="language-css"></code></pre></div>
    <p><strong>Raccourci possible en CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode2_1" class="language-css"></code></pre></div>



!!! css "Bordure par cote"
    <p>Une bordure est un rectangle constitue de quatre cotes, chacun est identifie par sa position.</p>
    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative2">Ci-contre, on peut choisir l'apparence de chaque cote. Faites des tests avec des cotes epais visibles et d'autres masques.</p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label>**Bordure haute :**</label><br>
    <input type="number" id="choixEpaisseurHaut" value="0" min="0" max="50" oninput="definirBordure2(this)">
    <select id="choixStyleHaut" oninput="definirBordure2(this)">
    <option value="none">aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleurHaut" value="#000000" oninput="definirBordure2(this)">
    <br>
    <label>**Bordure droite :**</label><br>
    <input type="number" id="choixEpaisseurDroit" value="0" min="0" max="50" oninput="definirBordure2(this)">
    <select id="choixStyleDroit" oninput="definirBordure2(this)">
    <option value="none">aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleurDroit" value="#000000" oninput="definirBordure2(this)">
    <br>
    <label>**Bordure basse :**</label><br>
    <input type="number" id="choixEpaisseurBas" value="0" min="0" max="50" oninput="definirBordure2(this)">
    <select id="choixStyleBas" oninput="definirBordure2(this)">
    <option value="none">aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleurBas" value="#000000" oninput="definirBordure2(this)">
    <br>
    <label>**Bordure gauche :**</label><br>
    <input type="number" id="choixEpaisseurGauche" value="0" min="0" max="50" oninput="definirBordure2(this)">
    <select id="choixStyleGauche" oninput="definirBordure2(this)">
    <option value="none">aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleurGauche" value="#000000" oninput="definirBordure2(this)">
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_2" class="language-css"></code></pre></div>


!!! css "Arrondir les angles"
    <p>La propriete <code>border-radius</code> permet d'arrondir les coins des bordures. Dans ce bac a sable, les dimensions sont en pixels.</p>
    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative3">Ci-contre, on peut choisir l'epaisseur, l'apparence et la couleur de la bordure qui encadre le paragraphe, ainsi que l'arrondi des angles (des "coins").</p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label>**Style de la bordure :**</label><br>
    <input type="number" id="choixEpaisseurArrondi" value="0" min="0" max="50" oninput="definirBordure3(this)">
    <select id="choixStyleArrondi" oninput="definirBordure3(this)">
    <option value="none">aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleurArrondi" value="#000000" oninput="definirBordure3(this)">
    <br>
    <label for="choixBTLR">**Angle haut-gauche :**</label>
    <input type="number" id="choixBTLR" value="0" min="0" max="200" oninput="definirBordure3(this)">
    <br>
    <label for="choixBTRR">**Angle haut-droit :**</label>
    <input type="number" id="choixBTRR" value="0" min="0" max="200" oninput="definirBordure3(this)">
    <br>
    <label for="choixBBRR">**Angle bas-droit :**</label>
    <input type="number" id="choixBBRR" value="0" min="0" max="200" oninput="definirBordure3(this)">
    <br>
    <label for="choixBBLR">**Angle bas-gauche :**</label>
    <input type="number" id="choixBBLR" value="0" min="0" max="200" oninput="definirBordure3(this)">
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_3" class="language-css"></code></pre></div>
    <p><strong>Raccourci possible</strong> (si tous les angles sont les mêmes) :  

    ```css
    border-radius: 10px
    ```

!!! css "Dimensions, border, padding, margin"
    <p>Dans ce bac a sable, les dimensions sont en pixels et les valeurs haut-bas-gauche-droite sont identiques. Teste aussi des valeurs negatives pour padding/margin.</p>
    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative">Ci-contre, commencez par choisir les dimensions du contenu de la boite. Ajoutez ensuite une bordure, un espace entre le contenu et la bordure puis un espace exterieur a la boite.</p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label for="choixLargeur">**Largeur du contenu :**</label>
    <input type="number" id="choixLargeur" value="450" min="150" max="450" oninput="definirDimensions(this)">
    <br>
    <label for="choixHauteur">**Hauteur du contenu :**</label>
    <input type="number" id="choixHauteur" value="110" min="40" max="300" oninput="definirDimensions(this)">
    <br>
    <label>**Bordure :**</label>
    <input type="number" id="choixEpaisseur" value="0" min="0" oninput="definirDimensions(this)">
    <select id="choixStyle" oninput="definirDimensions(this)">
    <option value="none" selected>aucune</option><option value="hidden">masquee</option><option value="solid">trait</option><option value="dashed">pointillee</option><option value="dotted">point par point</option><option value="double">double</option><option value="groove">sous-epaisseur</option><option value="ridge">sur-epaisseur</option><option value="inset">sous-elevee</option><option value="outset">sur-elevee</option>
    </select>
    <input type="color" id="choixCouleur" value="#000000" oninput="definirDimensions(this)">
    <br>
    <label for="choixPadding">**Padding :**</label>
    <input type="number" id="choixPadding" value="0" min="-50" max="50" oninput="definirDimensions(this)">
    <br>
    <label for="choixMargin">**Margin :**</label>
    <input type="number" id="choixMargin" value="0" min="-50" max="50" oninput="definirDimensions(this)">
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_dim" class="language-css"></code></pre></div>


!!! css "Texte"
    <p>Dans ce bac a sable, les dimensions sont en pixels.</p>
    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative">Ci-contre, on peut modifier a loisir l'apparence du texte du paragraphe.</p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label for="choixCouleur">**Couleur :**</label>
    <input type="color" id="choixCouleur" value="#000000" oninput="definirTexte(this)">
    <br>
    <label for="choixTaille">**Taille :**</label>
    <input type="range" id="choixTaille" min="6" max="50" value="11" step="1" oninput="definirTexte(this); this.nextElementSibling.value=this.value">
    <output>11</output>
    <br>
    <label for="choixPolice">**Police de caractere :**</label>
    <select id="choixPolice" oninput="definirTexte(this)">
      <option value="Times New Roman" selected>Times New Roman</option>
      <option value="Impact">Impact</option>
      <option value="Arial">Arial</option>
      <option value="Verdana">Verdana</option>
      <option value="Helvetica">Helvetica</option>
      <option value="Courier New">Courier New</option>
      <option value="cursive">cursive</option>
    </select>
    <br>
    <label for="choixGraisse">**Epaisseur :**</label>
    <select id="choixGraisse" oninput="definirTexte(this)">
      <option value="normal" selected>normal</option>
      <option value="bold">gras</option>
      <option value="bolder">tres gras</option>
      <option value="lighter">fin</option>
    </select>
    <br>
    <label for="choixItalique">**Style :**</label>
    <select id="choixItalique" oninput="definirTexte(this)">
      <option value="normal" selected>normal</option>
      <option value="italic">italique</option>
    </select>
    <br>
    <label for="choixDecoration">**Decoration :**</label>
    <select id="choixDecoration" oninput="definirTexte(this)">
      <option value="none" selected>normal</option>
      <option value="underline">souligne</option>
      <option value="overline">surligne</option>
      <option value="line-through">barre</option>
    </select>
    <br>
    <label for="choixMajuscules">**Affichage :**</label>
    <select id="choixMajuscules" oninput="definirTexte(this)">
      <option value="normal" selected>normal</option>
      <option value="small-caps">petites majuscules</option>
    </select>
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_texte" class="language-css"></code></pre></div>

!!! css "Ombres (texte + boite)"
    <p>Dans ce bac a sable, on peut attribuer une ombre au texte ou bien au conteneur du texte (ici le paragraphe).</p>

    <div id="bac_a_sable">
    <div id="zoneIllustrative">
    <p id="boiteIllustrative2">L'homme qui tire plus vite que son ombre !</p>
    </div>

    <div id="formulaire">
    <form id="choixAttributs">
    <label><strong>Ombrer le texte</strong></label><br>
    <label for="decalageHorizontalTexte">Decalage horizontal (px) :</label>
    <input type="number" id="decalageHorizontalTexte" value="6" min="-20" max="20" oninput="ombrer(this)">
    <br>
    <label for="decalageVerticalTexte">Decalage vertical (px) :</label>
    <input type="number" id="decalageVerticalTexte" value="-6" min="-20" max="20" oninput="ombrer(this)">
    <br>
    <label for="flouTexte">Floutage (px) :</label>
    <input type="number" id="flouTexte" value="2" min="0" max="10" oninput="ombrer(this)">
    <br>
    <label for="couleurOmbreTexte">Couleur :</label>
    <input type="color" id="couleurOmbreTexte" value="#000000" oninput="ombrer(this)">
    <br>
    <label for="interligne">Interligne :</label>
    <input type="number" id="interligne" value="1.5" step="0.1" min="0.5" max="5" oninput="ombrer(this)">
    <br>

    <label><strong>Ombrer le conteneur</strong></label><br>
    <label for="decalageHorizontalBoite">Decalage horizontal (px) :</label>
    <input type="number" id="decalageHorizontalBoite" value="-4" min="-20" max="20" oninput="ombrer(this)">
    <br>
    <label for="decalageVerticalBoite">Decalage vertical (px) :</label>
    <input type="number" id="decalageVerticalBoite" value="7" min="-20" max="20" oninput="ombrer(this)">
    <br>
    <label for="flouBoite">Floutage (px) :</label>
    <input type="number" id="flouBoite" value="5" min="0" max="10" oninput="ombrer(this)">
    <br>
    <label for="couleurOmbreBoite">Couleur :</label>
    <input type="color" id="couleurOmbreBoite" value="#0000FF" oninput="ombrer(this)">
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_ombre" class="language-css"></code></pre></div>


!!! css "Flexbox"
    <p>La propriete CSS <code>display: flex;</code> permet de definir un conteneur flexible. Ses enfants deviennent flexibles.</p>

    <div id="bac_a_sable">
    <div id="zoneIllustrative">
      <div id="boiteIllustrative">
        <div class="fils"> fils 1 </div>
        <div class="fils"> fils 2 </div>
        <div class="fils"> fils 3 </div>
        <div class="fils"> fils 4 </div>
        <div class="fils"> fils 5 </div>
        <div class="fils"> fils 6 </div>
        <div class="fils"> fils 7 </div>
        <div class="fils"> fils 8 </div>
        <div class="fils"> fils 9 </div>
        <div class="fils"> fils 10 </div>
      </div>
    </div>

    <div id="formulaire">
    <form id="choixAttributs">
      <label>**Direction :**</label>
      <select id="choixDirection" oninput="definirFlex(this)">
        <option value="row" selected>horizontale</option>
        <option value="row-reverse">horizontale-inversee</option>
        <option value="column">verticale</option>
        <option value="column-reverse">verticale-inversee</option>
      </select><br>
      <label>**Passage a la ligne :**</label>
      <select id="choixWrap" oninput="definirFlex(this)">
        <option value="nowrap" selected>non</option>
        <option value="wrap">oui</option>
        <option value="wrap-reverse">inverse</option>
      </select><br>
      <label>**Alignement dir. horizontale :**</label>
      <select id="choixAlign1" oninput="definirFlex(this)">
        <option value="flex-start" selected>debut</option>
        <option value="flex-end">fin</option>
        <option value="center">centre</option>
        <option value="space-between">justifie_1</option>
        <option value="space-around">justifie_2</option>
      </select><br>
      <label>**Alignement dir. verticale :**</label>
      <select id="choixAlign2" oninput="definirFlex(this)">
        <option value="flex-start" selected>debut</option>
        <option value="flex-end">fin</option>
        <option value="center">centre</option>
        <option value="stretch">etire</option>
      </select>
    </form>
    </div>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode_flex" class="language-css"></code></pre></div>

!!! css "Hover (survol)"
    <div id="bac_a_sable" data-hover>
    <div id="zoneIllustrative">
    <p id="boiteIllustrative" onmouseover="definirHover(this)" onmouseout="definirNormal(this)" style="border-color:black; border-width:0px; border-style:solid; font-weight:normal; text-decoration:none;">
    Ci-contre, on peut choisir quels seront l'image d'arriere-plan de cette boite ainsi que l'apparence du texte, l'epaisseur et la couleur de la bordure lors du survol de la boite par la souris.
    </p>
    </div>
    <div id="formulaire">
    <form id="choixAttributs">
    <label>**Image d'arriere-plan :**</label>
    <select name="choixArrierePlan" id="choixArrierePlan" onchange="affichageHover(this)">
    <option value="">Aucune</option>
    <option value="../../../files/NSI/HTML/css_images/Fond_Cerise.jpg">Cerise</option>
    <option value="../../../files/NSI/HTML/css_images/Fond_Dauphin.jpg">Dauphin</option>
    <option value="../../../files/NSI/HTML/css_images/Fond_Epee.png">Epee</option>
    <option value="../../../files/NSI/HTML/css_images/Fond_Triangles.jpg">Triangles</option>
    </select>
    <br>
    <label>**Couleur bordure :**</label>
    <input type="color" name="choixCouleur" id="choixCouleur" value="#000000" onchange="affichageHover(this)">
    <br>
    <label>**Epaisseur bordure :**</label>
    <input type="range" name="choixEpaisseur" id="choixEpaisseur" min="0" max="20" value="1" step="1" onchange="affichageHover(this); rangevalue.value=value">
    <output id="rangevalue">1</output>
    <br>
    <label for="choixGraisse">**Style texte :**</label>
    <select id="choixGraisse" name="choixGraisse" onchange="affichageHover(this)">
    <option value="normal">normal</option>
    <option value="bold">gras</option>
    <option value="lighter">fin</option>
    </select>
    <br>
    <label for="choixDecoration">**Decoration texte :**</label>
    <select id="choixDecoration" name="choixDecoration" onchange="affichageHover(this)">
    <option value="none">normal</option>
    <option value="underline">souligne</option>
    <option value="overline">surligne</option>
    <option value="line-through">barre</option>
    </select>
    </form>
    </div>
    ---
    <p><strong>Code CSS :</strong></p>
    <div class="highlight"><pre><code id="lecode" class="language-css"></code></pre></div>
    </div>