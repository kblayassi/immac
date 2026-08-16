---
title: Exercices
weight: 10
---

# Exercices 

Vous trouverez ci-dessous les exercices de cette séquence.

- Les exercices marqués avec :fontawesome-solid-pencil: se réalisent **sans ordinateur**.  
  Ceux indiqués par :fontawesome-solid-laptop: nécessitent **un ordinateur**.

- Le **niveau de difficulté** est indiqué par des étoiles :  
    <ul style="list-style: none;">
        <li>:fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star: → Exercices pour **s'approprier les notions**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star: → Exercices pour **renforcer vos compétences**.</li>
        <li>:fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star: → Exercices pour vous **challenger** et tester vos acquis.</li>
    </ul>

Les corrections sont généralement disponibles, mais elles ne doivent être consultées **qu'après validation de votre production par l'enseignant**.

---

## HTML - Principe et premières balises

!!! exoordi "Exercice 1 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Rechercher sur le web les balises HTML permettant de : 
    
    1. Mettre un mot en gras
    2. Mettre un mot en italique
    3. Mettre un mot en style `code`
    4. Mettre un mot en exposant

    ??? success "Correction"
        1. `<strong>`
        2. `<em>`
        3. `<code>`
        4. `<sup>`
   
!!! exoordi "Exercice 2 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Compléter le code nécessaire entre les deux balises `<body>` et `</body>` afin d'avoir une prévisualisation qui ressemble à l'image ci-dessous (le copier/coller ne fonctionnera pas sur l'image, les pointillés sont à remplacer par son nom).

    ![image](../../files/NSI/HTML/Balises_Exo1.png)

    ---

    {{ html_playground("exo2", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Premières balises</title>
    </head>
    <body>
        Bonjour...
    </body>
</html>") }}

    ??? success "Correction"

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Premières balises</title>
            </head>
            <body>
                <p>
                    Bonjour à tous.<br>
                    Je m'appelle ... et je suis ici pour m'exercer en <strong>HTML</strong>.
                </p>
                <p>
                    Dans cet exercice, je code mon 1<sup>er</sup> fichier <code>.html</code>.
                    Vivement que l'on puisse insérer des images, créer des liens
                    vers d'autres pages et utiliser de jolies couleurs grâce au
                    <strong>CSS</strong>.
                </p>
            </body>
        </html>
        ```

!!! exoordi "Exercice 3 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Avant tout, commencez par créer un répertoire nommé `Site_exo_3` (par exemple) dans lequel vous pourrez stocker les différents fichiers conçus au cours de cet exerice. 

    1. Lancez un éditeur de texte
    2. Créez un nouveau fichier.
    3. L'`enregistrer sous...` le nom `essai01.html` dans votre répertoire. 
        
        ⚠️ Vérifiez que le type de ce fichier est `Hyper Text Markup Language`.
    4. Allez dans le répertoire dans lequel vous avez sauvegardé ce fichier puis double-cliquer sur essai01.html. Normalement le navigateur internet doit s'ouvrir… sur une page blanche. Si oui, fermez cette page, sinon, recommencez depuis la question 1°/.

!!! exoordi "Exercice 4 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Repérer et corriger toutes les erreurs de syntaxe dans le code ci-dessous.
    
    Le rendu final doit correspondre à l'image ci-dessous : 

    ![rendu final](../../files/NSI/HTML/rendu_exo4.png)

    ---

    {{ html_playground("exo4", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Corriger les erreurs</title>
    </head>
    <body>
        <p>Créer des exemples de fichier <code>.html<code> est souvent
		<strong>fastidieux.</p></strong>
		<p>En effet, outre les </em>problèmes de balises<em>, il faut
		aussi inventer un 1<sup>er</sup> voire un 2<sub>nd</sup> texte
		à insérer dans les balises.
		</p>
    </body>
</html>") }}

    ??? success "Correction"

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Corriger les erreurs</title>
            </head>
            <body>
                <p>
                Créer des exemples de fichier <code>.html</code> est souvent
                <strong>fastidieux.</strong>
                </p>
                <p>
                En effet, outre les <em>problèmes de balises</em>, il faut aussi
                inventer un 1<sup>er</sup> voire un 2<sup>nd</sup> texte à insérer
                dans les balises.
                </p>
            </body>
        </html>
        ```

!!! exoordi "Exercice 5 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    A l'aide d'un éditeur de texte, créer un fichier simple `.html`, nommé `favoris.html` avec pour contenu les informations suivantes :

    - Nom et Prénom en gras
    - Le texte suivant : Sites utiles en NSI

---

## HTML - Titres, listes et balises génériques

!!! exoordi "Exercice 6 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    Testez le rendu par défaut de chaque niveau de titre entre les balises <body>.

    ---

    {{ html_playground("exo6", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Les titres HTML</title>
    </head>
    <body>
        ...
    </body>
</html>") }}

!!! exoordi "Exercice 7 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Reprendre le fichier `favoris.html` (de l'exercice 5) avec un éditeur de texte.

    1. Dans ce fichier, mettre :
        1. son nom et son prénom en titre 1 en haut de la page ;
        2. «Mes sites utiles en NSI» en titre 2 après le paragraphe déjà écrit.
    2. Ouvrir `favoris.html` à l'aide du navigateur pour constater le rendu. Ne pas hésiter à appeler le professeur pour vérification.

!!! exoordi "Exercice 8 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    En s'inspirant du code déjà entré dans le formulaire, écrire le code Html permettant d'afficher la liste ci-dessous :
    
    ![exo8](../../files/NSI/HTML/exo8.png)

    --- 

    {{ html_playground("exo8", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Liste d'éléments html</title>
    </head>
    <body>
		<ol type=\"A\">  
			<li> Item 1 </li>
			<li> Item 2 </li>
			<li> Item 3 </li>
		</ol>
        
    </body>
</html>") }}

    ??? success "Correction"
        ```html
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Liste d'éléments html</title>
            </head>
            <body>
                <ol type="A">
                    <li>Document et en-tête
                        <ol type="1">
                            <li>Doctype</li>
                            <li>head</li>
                        </ol>
                    </li>
                    <li>Structure
                        <ol type="1">
                            <li>header </li>
                            <li>article</li>
                            <li>section</li>
                            <li> footer</li>
                        </ol>
                    </li>
                    <li>Groupes
                        <ol type="1">
                            <li>Paragraphe</li>
                            <li>Les listes
                                <ol type="a">
                                    <li>Liste non ordonnée</li>
                                    <li>Liste ordonnée</li>
                                </ol>
                            </li>
                            <li>Balises bloc génériques : div</li>				
                        </ol>
                    </li>						
                </ol>
            </body>
        </html>
        ```

!!! exoordi "Exercice 9 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Reprendre le fichier `favoris.html` avec un éditeur de texte.

    1. Dans ce fichier, ajouter les trois sites suivants sous forme d'une liste non ordonnée après le second titre :
        
        - Espace Numérique de Travail
        - Site d'exercices en Html/Css & Python ;
        - Documentation Mozilla sur le HTML
        - Documentation Mozilla sur le CSS

        Pour l'instant, on ne fait pas de liens hypertextes vers ces sites.

    2. Ouvrir `favoris.html` à l'aide du navigateur pour constater le rendu. Ne pas hésiter à appeler le professeur pour vérification.

---

## Arborescence

!!! exoordi "Exercice 10 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Compléter le code Html ci-dessous (en remplaçant le point d'interrogation) pour que le logo de l'académie de Lyon apparaisse dans la fenêtre d'affichage :

    ![logo ac lyon](https://portail.lyc-la-martiniere-diderot.ac-lyon.fr/srv1/html/cours_html_css_nsi/exo_liens_nsi/liens_images/logo_aca_lyon.jpg)

    Il fauda se rendre sur le site de l'académie de Lyon pour récupérer l'URL de de cette image.

    ---

    {{ html_playground("exo10", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Liens externes</title>
    </head>
    <body>
        <p>Voici le logo de l'académie de Lyon :</p>
        <img src=\"?\" />
    </body>
</html>") }}

    ??? success "Correction"

        On aurait : 

        ```html
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Liens externes</title>
            </head>
            <body>
                <p>Voici le logo de l'académie de Lyon :</p>
                <img src="https://www.ac-lyon.fr/sites/ac_lyon/files/site_logo/2020-12/logo_90.jpg" />
            </body>
        </html>
        ```

!!! exoordi "Exercice 11 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Modifier le code précédent afin que l'image serve d'ancre pour un lien externe vers le site de l'académie de Lyon. Ce site doit s'afficher dans une nouvelle fenêtre.

    ---

    {{ html_playground("exo11", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Liens externes</title>
    </head>
    <body>
        <p>Voici le logo de l'académie de Lyon :</p>
        <img src=\"https://www.ac-lyon.fr/sites/ac_lyon/files/site_logo/2020-12/logo_90.jpg\" />
    </body>
</html>") }}

    ??? success "Correction"

        On aurait : 

        ```html
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Liens externes</title>
            </head>
            <body>
                <p>
                    Voici le logo de l'académie de Lyon.<br>
                    Cliquer dessus permet d'ouvrir le site de l'académie.
                </p>
                <a href="https://www.ac-lyon.fr" target="_blank">
                    <img src="https://www.ac-lyon.fr/sites/ac_lyon/files/site_logo/2020-12/logo_90.jpg" />
                </a>
            </body>
        </html>
        ```

!!! exoordi "Exercice 12 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Reprendre le fichier `favoris.html` avec un éditeur de texte.

    1. Dans ce fichier, ajouter des liens hypertextes vers : 
        1. EcoleDirecte
        2. Ce site web
        3. La documentation Mozilla sur le HTML
        4. La documentation Mozilla sur le CSS
    2. Ouvrir `favoris.html` à l'aide du navigateur pour constater le rendu. 

!!! exopapier "Exercice 13 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Il faudra utiliser l'arborescence du site affiché ci-contre pour visualiser les «passages» d'un fichier à l'autre, les remontées ou descentes d'un dossier à un autre...

    ![arborescence](../../files/NSI/HTML/Arborescence_Site.png)

    Remplacer chaque point d'interrogation par le lien relatif qui convient.

    1. Je suis en train de consulter le fichier `page1.html`.
        
        Quelle balise et quel lien permettent d'afficher la page contenue dans le fichier `page2.html` (qui est dans le même dossier que `page1.html`) ?

    2. Je suis en train de consulter le fichier `accueil.html`.

        Quel lien permet d'afficher la page contenue dans le fichier `page1.html` qui appartient au dossier `autres_pages_du_site` (qui est dans le même répertoire que `accueil.html`) ?

    3. Je suis en train de consulter le fichier `page2.html`.

        Quel lien permet d'afficher l'image `Une_image.png` dans cette page ? En d'autres termes, comment remonter d'un répertoire puis aller dans le dossier `images_du_site` afin d'atteindre ce fichier image ?


    ??? success "Correction"
        1. `<a href="page2.html">lien vers la page 2</a>`
        2. `<a href="autres_pages_du_site/page1.html">lien vers la page 1</a>`
        3. `<img src="../images_du_site/Une_image.png" />`

!!! exoordi "Exercice 14 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    L'image ci-dessous présente un extrait de l'arborescence du présent site. La page actuelle est `liens_internes.html`.

    ![arborescence](../../files/NSI/HTML/Arborescence_Exercice.png)

    Compléter le code ci-dessous afin que les images dont le nom commence par «Liens_internes» s'affichent les unes à côté des autres.

    ---

    {{ html_playground("exo14", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Liens internes</title>
    </head>
    <body>
        <p>Voici les images demandées :</p>
    </body>
</html>", base_href="../../../files/NSI/HTML/exo14_15_arbo/exo_liens/") }}

    ??? success "Correction"
        On aurait : 

        ```html
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Liens internes</title>
            </head>
            <body>
                <p>Voici les images demandées :</p>
                <img src="Liens_internes_01.png" />
                <img src="liens_images/Liens_internes_02.png" />
                <img src="../icones_cours_html_css/Liens_internes_03.png" />
            </body>
        </html>
        ```

!!! exoordi "Exercice 15 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    La mise en page d'un site est assurée par un fichier .css. Ce fichier s'importe entre les balises `<head>`.

    Remplacer `???` afin d'importer le fichier `liens_internes.css` qui se trouve dans le répertoire `[css_exo]` situé au même niveau que les répertoires `[exo_liens]` et `[icones_cours_html_css_nsi]` (cf. exercice précédent).

    ---

    {{ html_playground("exo15", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Liens internes</title>
		<!-- Importation des feuilles de style CSS -->
		<link rel=\"stylesheet\" href=\"???\">
    </head>
    <body>
        <p>Dans cette phrase, le mot <strong>rouge</strong> doit être écrit
		en <strong>rouge</strong>, alors que le lien ci-dessous ne sera
		plus souligné et s'affichera sur fond jaune :
		</p>
        <a href=\"liens_internes.html\">Un lien qui peut «donner le tournis»...</a>
    </body>
</html>", base_href="../../../files/NSI/HTML/exo14_15_arbo/exo_liens/") }}

    ??? success "Correction"
        On aurait : 

        ```html
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Liens internes</title>
                <!-- Importation des feuilles de style CSS -->
                <link rel="stylesheet" href="../css_exo/liens_internes.css">
            </head>
            <body>
                <p>Dans cette phrase, le mot <strong>rouge</strong> doit être écrit
                en <strong>rouge</strong>, alors que le lien ci-dessous ne sera
                plus souligné et s'affichera sur fond jaune :
                </p>
                <a href="liens_internes.html">Un lien qui peut «donner le tournis»...</a>
            </body>
        </html>
        ```

!!! exoordi "Exercice 16 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    1. Chercher sur internet une image (libre de droits !) puis enregistrer cette image dans son répertoire personnel.
    2. Reprendre le fichier `favoris.html` avec un éditeur de texte. Afficher l'image téléchargée précédemment après la liste des sites utiles.
    3. Ouvrir `favoris.html` à l'aide du navigateur pour constater le rendu. 

!!! exoordi "Exercice 17 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Le code HTML ci-dessous présente les compétences issues du bulletin officiel de NSI.
    
    Compléter ce code afin que :
    
    - chaque lien «Décrire», «Concevoir», «Collaborer», «Communiquer» et «Responsabiliser» renvoie vers le paragraphe correspondant ;
    - chaque lien «Haut de page» renvoie vers le haut de la page (sic).

    ---

    {{ html_playground("exo17", example_file="files/NSI/HTML/liens_intra_page.html") }}

    ??? success "Correction"
        On aurait : 

        ```html
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="utf-8">
            <title>Liens intra-page</title>
        </head>

        <body>
            <h1>Compétences à évaluer en NSI</h1>
            <p>
            <a href="#decrire">Décrire</a> -
            <a href="#concevoir">Concevoir</a> -
            <a href="#collaborer">Collaborer</a> -
            <a href="#communiquer">Communiquer</a> -
            <a href="#responsabiliser">Responsabiliser</a>
            </p>

            <h2 id="decrire">Décrire et expliquer une situation, un système ou un programme</h2>
            <ul>
            <li>Justifier dans une situation donnée, un codage numérique ou l'usage d'un format approprié, qu'un programme réalise l'action attendue...</li>
            <li>Détailler le déroulement d'une communication numérique, le rôle des constituants d'un système numérique, le rôle des éléments constitutifs d'une page web, ce qu'effectue tout ou partie d'un programme ou de l'algorithme associé, l'enchaînement des événements qui réalisent la fonction attendue par un programme...</li>
            </ul>
            <p><a href="#">Haut de page</a></p>

            <h2 id="concevoir">Concevoir et réaliser une solution informatique en réponse à un problème</h2>
            <ul>
            <li>Analyser un besoin dans un système d'information, le fonctionnement d'un algorithme...</li>
            <li>Structurer une formule logique, des données, une arborescence, une page web, une approche fonctionnelle en réponse à un besoin...</li>
            <li>Développer une interface logicielle ou une interface homme-machine, un algorithme, un programme, un document ou fichier numérique...</li>
            </ul>
            <p><a href="#">Haut de page</a></p>

            <h2 id="collaborer">Collaborer efficacement au sein d'une équipe dans le cadre d'un projet</h2>
            <ul>
            <li>Agir au sein d'une équipe dans des rôles bien définis, en interaction avec le professeur.</li>
            <li>Rechercher et partager une information, une documentation, une explication.</li>
            <li>Maîtriser l'utilisation d'outils numériques collaboratifs du type ENT, système de gestion de contenu (CMS), groupe de travail, forums...</li>
            </ul>
            <p><a href="#">Haut de page</a></p>

            <h2 id="communiquer">Communiquer à l'écrit et à l'oral</h2>
            <ul>
            <li>Documenter un projet numérique pour en permettre la communication en cours de réalisation et à l'achèvement, tout en précisant le déroulement et la finalité du projet.</li>
            <li>Présenter le cahier des charges relatif à un projet ou un mini-projet, la répartition des tâches au sein de l'équipe, les phases successives mises en œuvre, le déroulement de l'ensemble des opérations...</li>
            <li>Argumenter les choix relatifs à une solution (choix d'un format, d'un algorithme, d'une interface...).</li>
            </ul>
            <p><a href="#">Haut de page</a></p>

            <h2 id="responsabiliser">Faire un usage responsable des sciences du numérique en ayant conscience des problèmes sociétaux induits</h2>
            <ul>
            <li>Avoir conscience de l'impact du numérique dans la société notamment de la persistance de l'information numérique, de la non-rivalité des biens immatériels, du caractère supranational des réseaux, de l'importance des licences et du droit.</li>
            <li>Mesurer les limites et les conséquences de la persistance de l'information numérique, des lois régissant les échanges numériques, du caractère supranational des réseaux.</li>
            </ul>
            <p><a href="#">Haut de page</a></p>
        </body>
        </html>
        ```


---

## CSS - Principes fondamentaux

!!! exoordi "Exercice 18 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Pour visualiser l'imbrication et la dénomination des balises, on importe (à nouveau) un fichier .css. Ce fichier met en forme les groupes de balises ayant pour nom de classe rouge, vert, bleu, gras, souligne ou italique (les mises en forme obtenues sont évidentes). En attribuant ces attributs à différentes balises `<span>`, essayez d'obtenir l'affichage ci-dessous :

    ![style de reference](../../files/NSI/HTML/Universelles01.png)

    ---

    {{ html_playground("exo18", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Groupes de balises</title>
		<link rel=\"stylesheet\" href=\"html_generique01.css\">
    </head>
    <body>
        <p>
			Un exemple de texte coloré, chamarré, surchargé par une
			mise en forme bien trop abondante. Cela permet d'explorer
			l'imbrication des balises ainsi que la notion d'héritage
			des styles. Le plus dur étant toujours de faire un texte
			assez long pour pouvoir être intéressant.
		</p>
    </body>
</html>", base_href="../../../files/NSI/HTML/fichiersCSS/") }}

    ??? success "Correction"
        On aurait : 

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Groupes de balises</title>
                <link rel="stylesheet" href="html_generique01.css">
            </head>
            <body>
                <p>
                    Un <span class="gras">exemple</span> de texte
                    <span class="rouge">coloré, <span class="vert">chamarré,
                    <span class="bleu">surchargé par une</span> mise en forme</span>
                    bien trop abondante</span>. Cela permet d'<span class="souligne">explorer</span>
                    <span class="italique">l'imbrication des <span class="rouge">balises</span>
                    ainsi que la notion <span class="gras">d'héritage des styles</span></span>.
                    <span class="souligne">Le plus <span class="bleu">dur</span></span> étant
                    toujours de faire <span class="gras">un texte <span class="italique">assez long</span>
                    pour pouvoir être <span class="vert">intéressant</span></span>.
                </p>
            </body>
        </html>
        ```


!!! exoordi "Exercice 19 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Par défaut, chaque nouvel item d'une liste doit être affiché sous le précédent. Pour établir un menu déroulant, il faut donc distinguer la liste formant les onglets du menu, les listes formant les items de chaque onglet et les listes usuelles utilisées dans la page web.

    ![style de reference](../../files/NSI/HTML/Universelles02.png)

    Modifiez le code HTML ci-dessous pour obtenir un menu déroulant fonctionnel grâce au fichier CSS importé. 

    Les noms (des classes ou des identifiants) utilisés sont `menu`, `onglet` et `item`.

    ---

    {{ html_playground("exo19", "<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title>Classes et identifiants</title>
		<link rel=\"stylesheet\" href=\"html_generique02.css\">
    </head>
    <body>
        <ul>
			<li>Onglet n°1
				<ul>
					<li>Item 1 de l'onglet 1</li>
					<li>Item 2 de l'onglet 1</li>
					<li>Item 3 de l'onglet 1</li>
				</ul>
			</li>
			<li>Onglet n°2
				<ul>
					<li>Item 1 de l'onglet 2</li>
					<li>Item 2 de l'onglet 2</li>
				</ul>
			</li>
			<li>Onglet n°3
				<ul>
					<li>Item 1 de l'onglet 3</li>
					<li>Item 2 de l'onglet 3</li>
					<li>Item 3 de l'onglet 3</li>
					<li>Item 4 de l'onglet 3</li>
				</ul>
			</li>
			<li>Onglet n°4
				<ul>
					<li>Item 1 de l'onglet 4</li>
				</ul>
			</li>
		</ul>
    </body>
</html>", base_href="../../../files/NSI/HTML/fichiersCSS/") }}

    ??? success "Correction"
        On aurait : 

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title>Classes et identifiants</title>
                <link rel="stylesheet" href="html_generique02.css">
            </head>
            <body>
                <ul id="menu">
                    <li class="onglet">Onglet n°1
                        <ul class="item">
                            <li>Item 1 de l'onglet 1</li>
                            <li>Item 2 de l'onglet 1</li>
                            <li>Item 3 de l'onglet 1</li>
                        </ul>
                    </li>
                    <li class="onglet">Onglet n°2
                        <ul class="item">
                            <li>Item 1 de l'onglet 2</li>
                            <li>Item 2 de l'onglet 2</li>
                        </ul>
                    </li>
                    <li class="onglet">Onglet n°3
                        <ul class="item">
                            <li>Item 1 de l'onglet 3</li>
                            <li>Item 2 de l'onglet 3</li>
                            <li>Item 3 de l'onglet 3</li>
                            <li>Item 4 de l'onglet 3</li>
                        </ul>
                    </li>
                    <li class="onglet">Onglet n°4
                        <ul class="item">
                            <li>Item 1 de l'onglet 4</li>
                        </ul>
                    </li>
                </ul>
            </body>
        </html>
        ```

---

## CSS - Pratique

!!! exoordi "Exercice 20 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    L'exercice suivant comportent trois fenêtres :

    - La première contient un extrait de fichier `.html` : à modifier uniquement lorsque l'énoncé le précise.
    - La deuxième contient une feuille `.css` agissant sur la mise en forme du fichier `.html`. Cette feuille est modifiable.  
    - La troisième présente l'affichage obtenu avec les deux fichiers précédents.  

    Compléter le code CSS ci-dessous pour que le paragraphe soit écrit en blanc sur fond noir et que le texte balisé par `<strong>` soit écrit en rouge sur fond jaune.

    ---

    {{ html_css_playground(
        key="exo20",
        html_example="<!-- Partie html à ne pas modifier -->
<p>
	Les paragraphes doivent être écrits en <strong>blanc sur fond noir</strong>.
</p>
<p>
	Mettre <strong>en rouge</strong> le texte balisé par les balises <code>strong</code>. 
	Le fond de ce texte rouge sera <strong>jaune</strong>.
</p>",
        css_example="/* Partie css modifiable */
p {
	color: green;
	background-color: lightgray;
}"
        ) }}

    ??? success "Correction"
        On aurait : 

        ```css
        /* Partie css */
        p {
            color: white;
            background-color: black;
        }

        strong {
            color: red;
            background-color: yellow;
        }
        ```

!!! exoordi "Exercice 21 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Compléter le code Css ci-dessous pour que :

    1. L'article soit encadré d'une bordure en pointillés noirs d'épaisseur 1 pixel.
    2. Le titre `h3` se présente sous la forme suivante :

    ![illustration exercice 21](../../files/NSI/HTML/bordures1.png)

    ---

    {{ html_css_playground(
  key="exo21",
  html_example="""<!-- Partie html à ne pas modifier -->
<article>
	<h3> Un titre </h3>
	<p>
		A méditer :
		<q>Une fois qu'on a donné son opinion, il serait logique
		qu'on ne l'ait plus.</q>
	</p>
	<p>
		L'élément en-ligne <code>&lt;q&gt; &lt;/q&gt;</code> sert
		à baliser une citation courte dans la ligne.
	</p>
</article>""",
  css_example="""/* Partie css modifiable */
article {

}
	
h3 {

}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        article{
            border : 1px dotted black;
        }

        h3{
            border-left : 5px ridge;
            border-bottom : 5px ridge;
            color : grey;
        }
        ```

!!! exoordi "Exercice 22 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Un bloc Html n'a pas besoin de contenir de texte pour «exister». En fixant ses dimensions (width et height) dans la feuille Css et en lui attribuant des bordures, on le voit apparaître.

    Modifier le Css pour obtenir une bordure ressemblant à la bordure entourant le bloc dans l'image ci-dessous. 

    ![illustration exercice 21](../../files/NSI/HTML/bordures3.png)

    ---

    {{ html_css_playground(
  key="exo22",
  html_example="""<!-- Partie html à ne pas modifier -->
<p>
</p>""",
  css_example="""/* Partie css modifiable */
p{
	width : 200px;					/* On fixe la largeur du bloc */
	height: 100px;					/* On fixe la hauteur du bloc */
	border: 5px ridge grey;			/* On fixe l'aspect de la bordure */
}"""
) }}

    ??? tip "Coup de pouce"
        Les dimensions des arrondis ne sont pas obligatoirement en pixels. Une dimension donnée en pixels donnera un coin de bordure en forme de quart de cercle. Une dimension donnée en pourcentage donnera un quart d'ellipse de dimensions proportionnelles aux dimensions de la boîte à encader.

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        p{	
            width : 200px;
            height: 100px;
            border: 5px ridge grey;
            border-radius: 10% 50% 10% 50%;
        }
        ```

!!! exoordi "Exercice 23 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Compléter le code Css ci-dessous pour que :

    1. L'`article` ait une marge extérieure de 50 pixels et une marge intérieure de 20 pixels.
    2. Le titre `h3` ait un marge intérieure gauche de 10 pixels et une marge extérieure basse de 10 pixels
    3. Les paragraphes aient un marge extérieure haute de 25 pixels

    ---

    {{ html_css_playground(
  key="exo23",
  html_example="""<!-- Partie html à ne pas modifier -->
<article>
	<h3> Un titre </h3>
	<p>
		A méditer :
		<q>Une fois qu'on a donné son opinion, il serait logique
		qu'on ne l'ait plus.</q>
	</p>
	<p>
		L'élément en-ligne <code>&lt;q&gt; &lt;/q&gt;</code> sert
		à baliser une citation courte dans la ligne.
	</p>
</article>""",
  css_example="""/* Partie css modifiable */
article{
	border : 1px dotted black;
}

h3{
	border-left : 5px ridge;
	border-bottom : 5px ridge;
	color : grey;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        article {
            margin: 50px;
            padding: 20px;
            border : 1px dotted black;
        }

        h3 {
            margin-bottom: 10px;
            padding-left: 10px;
            border-left : 5px ridge;
            border-bottom : 5px ridge;
            color : grey;
        }

        p {
            margin-top: 25px;
        }
        ```

!!! exoordi "Exercice 24 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Dans le fichier `.html` ci-dessous, les trois paragraphes sont encadrés par une bordure gauche et une bordure basse. Modifier les parties HTML et CSS en utilisant des sélecteurs et des bordures de couleur «`transparent`» pour obtenir l'affichage ci-dessous.

    On pourra augmenter l'épaisseur des bordures pour mieux voir les effets...

    ![illustration exercice 21](../../files/NSI/HTML/bordures4.png)

    ---

    {{ html_css_playground(
  key="exo24",
  html_example="""<!-- Partie html à modifier -->
<p>
	Ce paragraphe a une bordure basse et une bordure gauche visibles.
</p>

<p>
	Pour ce paragraphe, bordures basse et gauche sont les mêmes que
	précédemment. Les autres bordures sont invisibles mais leur effet
	est visible.
</p>

<p>
	<!-- Un paragraphe vide... -->
</p>""",
  css_example="""/* Partie css modifiable */
p{
	color: purple;
	border-left: 15px ridge;
	border-bottom: 15px ridge;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```html linenums="1"
        <!-- Partie html -->
        <p>
            Ce paragraphe a une bordure basse et une bordure gauche visibles.
        </p>

        <p class="bordure">
            Pour ce paragraphe, bordures basse et gauche sont les mêmes que
            précédemment. Les autres bordures sont invisibles mais leur effet
            est visible.
        </p>

        <p id="triangle">
            <!-- Un paragraphe vide... -->
        </p>
        ```

        Et : 

        ```css linenums="1"
        /* Partie css */
        p{
            color: purple;
            border-left: 15px ridge;
            border-bottom: 15px ridge;
        }

        .bordure{
            border-top: 15px ridge transparent;
            border-right: 15px ridge transparent;
        }

        #triangle{
            border-top: 50px solid transparent;
            border-left: 100px solid red;
            border-bottom: 50px solid transparent; 
        }
        ```

!!! exoordi "Exercice 25 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    En CSS, il existe un sélecteur permettant de repérer le **numéro de présence** d'un élément dans une page `.html`. Ce sélecteur est le **pseudo-élément** `:nth-of-type(n)`. 
    
    Voici comment écrire en violet le 3ème titre de niveau `<h1>` présent dans la page .html :

    ```html linenums="1"
    h1:nth-of-type(3){		/* ne pas oublier le ":" !!! */
        color: purple;
    }
    ```

    Ce pseudo-élément permet aussi de repérer les numéros pairs et impairs à partir d'expressions de la forme $an+b$, où $a$ et $b$ sont les nombres qui définissent la règle de calcul. 
    
    En utilisant cette information, définir le CSS permettant d'obtenir l'affichage ci-dessous : 

    ![illustration exercice 21](../../files/NSI/HTML/selecteur4.png)

    ---

    {{ html_css_playground(
  key="exo25",
  html_example="""<!-- Partie html à ne pas modifier -->
<p> zigzag </p>
<p> circonvolution </p>
<p> détour </p>
<p> crochet </p>
<p> courbe </p>
<p> tordu </p>
<p> biscornu </p>
<p> zigvolution</p>
<p> circonzag</p>""",
  css_example="""/* Partie css modifiable */
p{
	border-bottom: 3px solid red;
	width: 250px;
	margin: 0;						/* Pas de marge extérieur */
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        p{
            border-bottom: 3px solid red;   /* Tous les paragraphes sont soulignés */
            width: 250px;
            margin: 0;                      /* Pas de marge extérieur */
        }

        p:nth-of-type(2n){                  /* Paragraphes de n° pair */
            border-right: 3px solid red;
        }

        p:nth-of-type(2n+1){                /* Paragraphes de n° impair */
            border-left: 3px solid red;
        }
        ```

!!! exoordi "Exercice 26 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Dans le fichier qui suit, sans toucher au code HTML :

    1. Encadrer par une bordure verte chacune des listes.
    2. Mettre sous fond jaune le dernier item de chaque liste.
    3. Écrire en italique le premier item de chaque liste.
    4. Écrire en petite majuscule l'élément d'identifiant `id="important"`.
    5. Écrire en gras les éléments d'attribut `class="coucou"`.

    ---

    {{ html_css_playground(
  key="exo26",
  html_file="files/NSI/HTML/exo26.html",
  css_example="""/* Partie css modifiable */
ul {

}"""
) }}

    ??? tip "Coup de pouce"
        En plus du pseudo-élément `:nth-of-type()`, on peut utiliser les sélecteurs `:first-of-type` et `:last-of-type` pour cibler respectivement le premier et le dernier élément d'un conteneur parent.

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        ul {
            border: 2px solid green;
        }

        ul li:last-of-type {
            background-color: yellow;
        }

        ul li:first-of-type {
            font-style: italic;
        }

        #important {
            font-variant: small-caps;
        }

        .coucou {
            font-weight: bold;
        }
        ```

!!! exoordi "Exercice 27 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Les paragraphes `<p>` sont de type `block` par défaut dans les navigateurs. Modifier leur type afin d'observer les différences avec un affichage en-ligne.

    ---

    {{ html_css_playground(
  key="exo27",
  html_example="""<!-- Partie html à ne pas modifier -->
<p>Algorithmique</p>
<p>Programmation</p>
<p>Réseaux</p>
<p>Web</p>
<p>Problèmes sociétaux</p>""",
  css_example="""/* Partie css modifiable */
p{
    border: 1px solid orange;
} """
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        p {
            border: 1px solid orange;
            display: inline;
        }
        ```

!!! exoordi "Exercice 28 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Les paragraphes `<p>` sont de type `block` par défaut dans les navigateurs. Modifier leur type afin d'observer les différences avec un affichage en-ligne.

    ![illustration exo28](../../files/NSI/HTML/display1.png)

    ---

    {{ html_css_playground(
  key="exo28",
  html_example="""<!-- Partie html à ne pas modifier -->
<ol>
    <li> <a href=\"css_display.html#\">Lien 1</a> </li>
    <li> <a href=\"css_display.html#\">Lien 2</a> </li>
    <li> <a href=\"css_display.html#\">Lien 3</a> </li>
    <li> <a href=\"css_display.html#\">Lien 4</a> </li>
    <li> <a href=\"css_display.html#\">Lien 5</a> </li>
    <li> <a href=\"css_display.html#\">Lien 6</a> </li>
    <li> <a href=\"css_display.html#\">Lien 7</a> </li>
</ol>""",
  css_example="""/* Partie css modifiable */
"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        li{
            display: inline;		/* affichage en ligne */
        }

        a{
            color : green;
            border: 1px solid;
            text-decoration: none;
        }
        ```


!!! exoordi "Exercice 29 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-solid-star:"
    Le but est de reproduire cette mise en page suivante en complétant le contenu des balises style. 
    
    Pensez à enregistrer ce travail sur un fichier HTML et un fichier CSS local afin de conserver une trace numérique dans votre espace personnel.

    ![illustration exo28](../../files/NSI/HTML/misenpageGrid.png)

    ---

    {{ html_css_playground(
  key="exo29",
  html_example="""<header>
    <h1>Un super titre</h1>
    <h2> Un joli sous-titre</h2>
</header>


<div class=\"grillePrincipale\">

    <nav>
        Ici on navigue.
        <ul>
            <li><a href=\"#\">lien 1</a></li>
            <li><a href=\"#\">lien 2</a></li>
            <li><a href=\"#\">lien 3</a></li>
            <li><a href=\"#\">lien 4</a></li>
        </ul>
    </nav>

    <main>

        <article>
            Raymond Devos
        </article>

        <article>
            L'autre jour, au café, je commande un demi. J'en bois la moitié. Il ne m'en restait plus.
        </article>

        <article>
            Je suis adroit de la main gauche et je suis gauche de la main droite.
        </article>

        <article>   
            Se coucher tard nuit.
        </article>

        <article>
            Quand un homme ne dit rien alors que tout le monde parle, on n'entend plus que lui !
        </article>

        <article>
            Si l'on peut trouver moins que rien, c'est que rien vaut déjà quelque chose.
        </article>

        <article>
            Ne rien faire, ça peut se dire. Ca ne peut pas se faire !
        </article>

    </main>

    <aside>
        Ici, plein de remarques complémentaires super captivantes.
    </aside>
</div>

<footer>
C'est le pied !
</footer>""",
  css_example="""/* Partie css modifiable */
 """
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        body{
        margin:0;
        background:#fff;
        font-family: "Times New Roman", Times, serif;
        color:#000;
        }

        /* --- Header / Footer --- */
        header{
        padding:18px 0 16px;
        background:#9c9c9c;
        color:#fff;
        text-align:center;
        }

        header h1{
        margin:0;
        font-size:48px;
        font-weight:700;
        }

        header h2{
        margin:12px 0 0;
        font-size:30px;
        font-weight:700;
        }

        footer{
        margin-top:10px;
        padding:8px 0;
        font-size:22px;
        font-weight:700;
        background:#9c9c9c;
        color:#fff;
        text-align:center;
        }

        /* --- Grille principale --- */
        .grillePrincipale{          
        margin:10px auto 0;
        display:grid;
        grid-template-columns: 210px 1fr 210px; /* nav | main | aside */
        gap:6px;
        }

        /* --- NAV --- */
        nav{
        background:#cfcfcf;
        padding:6px;
        font-size:20px;
        }

        nav ul{
        margin:14px 0 0;
        padding-left:26px;
        }

        nav a{
        color:#7f7f7f;
        text-decoration:none;
        font-weight:700;
        }

        /* --- MAIN : articles en 2 colonnes --- */
        main{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap:6px;
        }

        main article{
        padding:6px;
        font-size:20px;
        }

        /* Couleurs des articles (dans l’ordre du HTML) */
        main article:nth-child(1){ background:#a8ff2a; font-weight:700; } /* Raymond */
        main article:nth-child(2){ background:#fff6dc; }                  /* beige */
        main article:nth-child(3){ background:#19f3ff; }                  /* cyan */
        main article:nth-child(4){ background:#ffc0cb; }                  /* rose */
        main article:nth-child(5){ background:#a8ff2a; }                  /* vert */
        main article:nth-child(6){ background:#fff6dc; }                  /* beige */
        main article:nth-child(7){ background:#19f3ff; }                  /* cyan */

        /* --- ASIDE --- */
        aside{
        background:#0b7a0b;
        color:#fff;
        padding:8px;
        font-size:20px;
        font-weight:700;
        }
        ```

!!! exoordi "Exercice 30 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Centrer horizontalement et verticalement le texte du paragraphe `<p>` dans l'article.

    ---

    {{ html_css_playground(
  key="exo30",
  html_example="""<!-- Partie html à ne pas modifier -->
<article>
	<p>
		Les petits poissons rouges, les petits pois sont verts.
		A force de taper sur des clous, il était devenu marteau.
	</p>
</article>""",
  css_example="""/* Partie css modifiable */
article{
	width: 450px;
	height: 180px;
	border: 2px solid blue;
}

p{
	width: 50%;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        article{
            width: 450px;
            height: 180px;
            border: 2px solid blue;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p{
            width: 50%;
        }
        ```

!!! exoordi "Exercice 31 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Les styles CSS permettent de mettre des effets «whaou» avec peu de lignes. Modifier le code ci-dessous afin d'obtenir le même effet que le survol de l'image ci-dessous:

    <img id="rire" alt="stromae" src="../../../files/NSI/HTML/css_images/rire.jpg" style="width:80px;height:80px;margin:0 auto;padding:5px;border:1px dashed #163c99;border-radius:4px;display:block;transition:.5s" onmouseenter="this.style.width='90px';this.style.height='90px';this.style.boxShadow='6px 6px 6px #163c99';this.style.transform='rotate(-15deg)'" onmouseleave="this.style.width='80px';this.style.height='80px';this.style.boxShadow='';this.style.transform=''">

    Le chemin relatif de l'image est `css_images/rire.jpg`.

    ---

    {{ html_css_playground(
  key="exo31", base_href="../../../files/NSI/HTML/",
  html_example="""<!-- Partie html à ne pas modifier -->
<img id=\"rire\" src=\"css_images/rire.jpg\" alt=\"stromae\" >""",
  css_example="""/* Partie css modifiable */
#rire{
	width: 80px;
	height: 80px;
	margin: 0 auto;
	padding: 5px;
	border: 1px dashed #163c99;
	border-radius: 4px;
}

#rire:hover{
	width: 90px;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        #rire{
            width: 80px;
            height: 80px;
            margin: 0 auto;
            padding: 5px;
            border: 1px dashed #163c99;
            border-radius: 4px;
            transition: 0.5s
        }

        #rire:hover{
            width: 90px;
            height: 90px;
            box-shadow: 6px 6px 6px #163c99;
            transform: rotate(-15deg);
            transition: 0.5s
        }
        ```


!!! exoordi "Exercice 32 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Modifier le code CSS suivant afin de faire apparaitre l'image de Stromae lors du survol de la souris sur le paragraphe, comme dans l'exemple ci-dessous : 

    <p style="width:100px;height:80px;border:2px solid darkgreen;text-align:center;" onmouseenter="this.querySelector('#banane').style.display='none'; this.querySelector('#rire').style.display='block';" onmouseleave="this.querySelector('#banane').style.display='inline'; this.querySelector('#rire').style.display='none';">
        <span id="banane" style="color:darkgreen;font-weight:bold;">J'apprends, je suis content !</span>
        <img id="rire" src="../../../files/NSI/HTML/css_images/rire.jpg" alt="stromae" style="width:80px;height:80px;margin:0 auto;border-radius:4px;display:none;">
    </p>

    Le chemin relatif de l'image est `css_images/rire.jpg`.

    ---

    {{ html_css_playground(
  key="exo32", base_href="../../../files/NSI/HTML/",
  html_example="""<!-- Partie html à ne pas modifier -->
<p> 
	<span id=\"banane\">J'apprends, je suis content !</span>
	<img id=\"rire\" src=\"css_images/rire.jpg\" alt=\"stromae\" >
</p>""",
  css_example="""/* Partie css modifiable */
#banane{				/* Le texte */
	color: darkgreen;
	font-weight:bold;
}

#rire{					/* L'image */
	width: 80px;
	height: 80px;
	margin: 0 auto;
	border-radius: 4px;
}

p{						/* Le paragraphe */
	width: 100px;
	height: 80px;
	border: 2px solid darkgreen;
	text-align: center;
}"""
) }}

    ??? tip "Coup de pouce"
        - La propriété `display: none;` permet de ne pas afficher un conteneur à l'écran, `display: block;` «transforme» l'élément en contenur de type bloc.
        - Pour affecter un élément inclut dans un conteneur il suffit de déclarer les sélecteurs en les séparant par un espace. Par exemple, `p strong {...}` affecte uniquement la mise en forme des éléments `strong` contenus dans des paragraphes `p` (et pas ceux inclus dans des listes ou autre...).

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        #banane{				/* Le texte */
            color: darkgreen;
            font-weight:bold;
        }

        #rire{					/* L'image */
            width: 80px;
            height: 80px;
            margin: 0 auto;
            border-radius: 4px;
            display: none;
        }

        p:hover #banane {
            display: none;
        }

        p:hover #rire {
            display: block;
        }
            
        p{						/* Le paragraphe */
            width: 100px;
            height: 80px;
            border: 2px solid darkgreen;
            text-align: center;
        }
        ```

!!! exoordi "Exercice 33 - :fontawesome-solid-skull:"
    Cet exercice est assez difficile, mais il montre tout le potentiel contenu à l'intérieur d'une relation HTML/CSS bien pensée. 
    
    La liste ci-dessous est destinée à être un menu avec un sous-niveau. Apporter les modifications nécessaires pour que le rendu soit approximativement celui des images ci-dessous :

    - Affichage par défaut : 

        ![illustration exo28](../../files/NSI/HTML/display2.png)

    - Affichage lors du survol de "Menu 1" : 

        ![illustration exo28](../../files/NSI/HTML/display3.png)

    ---

    {{ html_css_playground(
  key="exo33",
  html_file="files/NSI/HTML/exo33.html",
  css_example="""/* Partie css modifiable */
ul {
	list-style-type: none;		/* disparition des puces */
	margin:0;
}

li {
	width: 100px;
	margin:0;
	padding: 3px;				/* espace intérieur */
	border: 1px solid orange;
    height: 20px;
	line-height: 20px;			/* centrage vertical */
	background-color: white;
}

a {
	text-decoration: none;
	color: orange;
}"""
) }}

    ??? tip "Coup de pouce"
        Il est nécessaire de pouvoir positionner des blocs enfants par rapport à leur parent. Ce site comporte une page d'entraînement sur les positionnements dans la section "[Aller plus loin](6_Pour_aller_plus_loin.md)".
        
        La documentation officielle se trouve [ici](http://www.w3schools.com/cssref/pr_class_position.asp).

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        ul {
            list-style-type: none;		/* disparition des puces */
            margin:0;
        }

        li {
            width: 100px;
            margin:0;
            padding: 3px;				/* espace intérieur */
            border: 1px solid orange;
            height: 20px;
            line-height: 20px;			/* centrage vertical */
            background-color: white;
        }

        a {
            text-decoration: none;
            color: orange;
        }


        .horizontal>li{					/* affichage horizontal du premier niveau grâce à ">" */
            display: inline-block;		/* inline-block pour que width ait un effet */
            position: relative;			/* pour placer en absolu un élément fils */
        }	

        .vertical{
            display: none;				/* disparition par défaut des sous-menus */
            position: absolute;			/* positionnement par rapport au parent */
            top:100%;					/* 100% faut référence à la hauteur du parent */
            right:-1px;					/* -1px par rapport à la droite du parent */
        }
                    
        li:hover .vertical{				/* Survol du sous-menu */
            display: block;				/* Affichage du bloc */
            z-index :1 ;				/* Affichage au premier-plan */
        }
        ```


---

## Pour aller plus loin

!!! exoordi "Exercice 34 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Donner un code permettant de réaliser le tableau ci-dessous. La mise en forme est effectuée par un fichier `.css` importé grâce à la balise `<link>`. 

    ![Image tableaux à reproduire](../../files/NSI/HTML/Tableaux05.png)

    ---

    {{ html_playground("exo34","<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title> Comparaison Html/Css </title>
		<link rel=\"stylesheet\" href=\"fichiersCSS/html_table01.css\">
    </head>
    <body>
		<table>
			<!-- code à compléter ici -->
		</table>
    </body>
</html>", base_href="../../../files/NSI/HTML/") }}

    ??? success "Correction"
        On aurait : 

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title> Comparaison Html/Css </title>
                <link rel="stylesheet" href="fichiersCSS/html_table01.css">
            </head>
            <body>
                <table>
                    <tr>	<td> </td>
                            <th>HTML</th>
                            <th>CSS</th>  </tr>
                    
                    <tr>	<th> commentaires </th>
                            <td> < !-- (sans espace) puis (espace) le texte
                                (espace) puis  --> (sans espace)</td>
                            <td> /* texte */ </td> </tr>
                    <tr>	<th> rôle principal </th>
                            <td> sémantique</td>
                            <td> forme </td> </tr>
                    <tr>	<th>extension</th>
                            <td><code>.html</code></td>
                            <td><code>.css</code></td> </tr>
                </table>
            </body>
        </html>
        ```


!!! exoordi "Exercice 35 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Donner le code HTML nécessaire pour réaliser le tableau ci-dessous : 

    ![Image tableaux à reproduire](../../files/NSI/HTML/Tableaux06.png)

    ---

    {{ html_playground("exo35","<!DOCTYPE html>
<html lang=\"fr\">
    <head>
        <meta charset=\"utf-8\">
        <title> Fusion </title>
		<link rel=\"stylesheet\" href=\"fichiersCSS/html_table02.css\">
    </head>
    <body>
         <table>
           <!-- code à compléter ici -->
         </table>
    </body>
</html>", base_href="../../../files/NSI/HTML/") }}

    ??? success "Correction"
        On aurait : 

        ```html linenums="1"
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <title> Fusion </title>
                <link rel="stylesheet" href="fichiersCSS/html_table02.css">
            </head>
            <body>
                <table>
                    <tr>	<td rowspan="3">1</td>
                            <td>2</td>
                            <td colspan="2">3</td> </tr>
                    
                    <tr>	<td colspan="3">4</td> </tr>
                    
                    <tr>	<td>5</td>
                            <td>6</td>
                            <td>7</td> </tr>
                    
                    <tr>	<td colspan="3" rowspan="2">8</td>
                            <td>9</td> </tr>
                    
                    <tr>	<td>10</td> </tr>
                </table>
            </body>
        </html>
        ```


!!! exoordi "Exercice 36 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Modifier le Css sans toucher au code Html afin que...

    - ...chaque paragraphe soit précédé de "Citation x" où x est un entier numérotant la citation :
    - ...chaque citation soit suivie de l'image située à l'adresse `css_images/rire.jpg`.

    ---

    {{ html_css_playground(
  key="exo36",
  html_example="""<!-- Partie html à ne pas modifier -->
<p>
	<q>L'ennemi est bête : il croît que c'est nous l'ennemi, alors que
	c'est lui.</q>
</p>
<p>
	- Quel est le pire ? l'ignorance ou l'indifférence ?<br>
	- J'en sais rien et je m'en fous.
</p>
<p>
	<q>Boire du café empêche de dormir. Et dormir empêche de boire
	du café.</q>
</p>
<p>
	<q>Ma richesse est intérieure : tout mon argent est dans un coffre.</q>
</p>
<p>
	<q>En France, on n'a pas beaucoup de champions du monde.
		Mais dans le reste du monde, ils n'ont pas autant de champions
		de France que nous.</q>
</p>
<p>
	<q>Certains déchets nucléaires produits dans les années 80 resteront
	dangereux pendant un demi-million d'années. Pour ceux qui sont
	produits maintenant, il faudra compter 30 ans de plus.</q>
</p>""",
  css_example="""/* Partie css modifiable */
""", base_href="../../../files/NSI/HTML/"
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        body{
            counter-reset: citation;
            }

        p{
            counter-increment: citation;
            }

        p::before{
            content: 'Citation 'counter(citation)' : ';
            }

        p::after{
            content: url("css_images/rire.jpg"); 
            }
        ```

!!! exoordi "Exercice 37 - :fontawesome-solid-star: :fontawesome-regular-star: :fontawesome-regular-star:"
    L'objectif de cet exercice est d'observer les comportements.

    En commentant/décommentant les sélecteurs de paragraphes `p`, tester les divers positionnements possibles vis-à-vis du `div` conteneur. Observer alors les divers problèmes (débordement du conteneur, blocs se superposant, ...).

    Observer la différence d'alignement entre `float: left;` et `display: inline-block;`.

    Observer ce qu'il se passe lorsqu'on modifie `min-height` en `height` pour le `div:last-of-type`.

    ---

    {{ html_css_playground(
  key="exo37",
  html_example="""<!-- Partie html à ne pas modifier -->
<div> </div>
<div> 
	<p> Paragraphe 1 </p> 
	<p> Paragraphe 2 <br>
		Paragraphe 2 </p> 
	<p> Paragraphe 3 <br>
		Paragraphe 3 <br>
		Paragraphe 3</p>
	<p> Paragraphe 4 <br>
		Paragraphe 4 <br>
		Paragraphe 4 <br>
		Paragraphe 4 </p> 
</div>""",
  css_example="""/* Partie css modifiable */
/* valeur par défaut : */
p {
	position : relative;	
	}

/* positionnement par rapport à l'écran : 
p {
	position: fixed;
	bottom: 0;
	right:0;
	} */

/* positionnement par rapport au div parent :
p {
	position: absolute;
	right: 20%;
	top : 0;
	} */

/* flottant : 
p {
	width: 20%;
	float: right;
	} */

/* en display inline-block : 
p {
	display: inline-block;
	} */

div {
	border: 1px solid grey;
	}

div:first-of-type {
	height: 100px;
	margin-bottom: 1em;
	}
	
div:last-of-type {
	/* ne change rien mais permet de placer les enfants en absolu :*/
	position: relative;
	width: 60%;
	margin: 0 auto;
	min-height: 100px;               
	}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        /* valeur par défaut :
        p {
            position : relative;	
            } */

        /* positionnement par rapport à l'écran : 
        p {
            position: fixed;
            bottom: 0;
            right:0;
            } */

        /* positionnement par rapport au div parent :
        p {
            position: absolute;
            right: 20%;
            top : 0;
            } */

        /* flottant : */
        p {
            width: 20%;
            float: right;
            }

        /* en display inline-block : 
        p {
            display: inline-block;
            } */

        div {
            border: 1px solid grey;
            }

        div:first-of-type {
            height: 100px;
            margin-bottom: 1em;
            }
            
        div:last-of-type {
            /* ne change rien mais permet de placer les enfants en absolu :*/
            position: relative;
            width: 60%;
            margin: 0 auto;
            min-height: 100px;               
            }
        ```

!!! exoordi "Exercice 38 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    1. Dans le code ci-dessous, quel est le référentiel pour le placement absolu des fils ?
    2. Modifier le code pour que le placement absolu (premier fils) se fasse par rapport au père.

    ---

    {{ html_css_playground(
  key="exo38",
  html_example="""<!-- Partie html à ne pas modifier -->
<div id=\"grandpere\"> 
	Le grand-père
	<div id=\"pere\">
		Le père
		<img src=\"css_images/darth.jpeg\" alt=\"le père\" width=\"50\">
		<p> Le premier fils </p>
		<p> le second fils </p>
	</div>
</div>""",
  css_example="""/* Partie css modifiable */
* {
	margin: 3px;
	padding: 3px;
}

#grandpere {
	border: 1px solid black;
	width : 60%;
	height: 500px; 
	position: relative;                   
}
	
#pere{
	border: 3px solid yellow;
	widht: 80%;
	height: 200px;
}
	
p {
	border: 1px solid red;
}

p:last-of-type {
	position :fixed;
	bottom:0;
	right:0;
}""", base_href="../../../files/NSI/HTML/"
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        * {
        	margin: 3px;
        	padding: 3px;
        }

        #grandpere {
        	border: 1px solid black;
        	width : 60%;
        	height: 500px; 
        	position: relative;                   
        }
        	
        #pere{
        	border: 3px solid yellow;
        	widht: 80%;
        	height: 200px;
        	position: relative;
        }
        	
        p {
        	border: 1px solid red;
        }

        p:first-of-type {
        	position: absolute;
        	bottom: 0;
        	right:0;
        }

        p:last-of-type {
        	position :fixed;
        	bottom:0;
        	right:0;
        }
        ```

!!! exoordi "Exercice 39 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Définir le style Css afin que l'image apparaisse disposée de la façon suivante :

    ![Illustration boites HTML](../../files/NSI/HTML/positionnement5.png)

    Le cadre est une bordure de l'élément `div`.

    L'image est disposée à l'aide du paramètre `float`.

    ---

    {{ html_css_playground(
  key="exo39",
  html_example="""<!-- Partie html à ne pas modifier -->
<div>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	bla bla <br>
	<img src=\"css_images/logohtml5.png\" width=\"102\" height=\"102\">
</div>""",
  css_example="""/* Partie css modifiable */
div {
	width: 60%;
	height: 200px;
	border: 1px solid black;
}""", base_href="../../../files/NSI/HTML/"
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        div {
            width: 60%;
            height: 200px;
            border: 1px solid black;
            }

        img {
            float: right;
            margin-right: -51px;
            margin-top: -100px;
            }
        ```

!!! exoordi "Exercice 40 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    La situation suivante se produit assez souvent :

    un bloc (premier bloc noir) contient des éléments flottants (bloc orange), mais le bloc flottant a une hauteur trop grande et dépasse donc sur le bloc suivant (second bloc noir).

    Sans modifier les dimensions et marges des trois blocs, modifier le code pour que le flottant ne déborde pas sur le second bloc noir.

    ---

    {{ html_css_playground(
  key="exo40",
  html_example="""<!-- Partie html à ne pas modifier -->
<div id=\"je_contiens_un_flottant\">
	blu blu
	<p id=\"je_flotte\"> </p>
</div>

<div id=\"je_succede_au_div_contenant_un_flottant\">
	bla bla
</div>""",
  css_example="""/* Partie css modifiable */
#je_flotte {
	float: left;
	width: 30px;
	height: 150px;
	border: 2px solid orange; 
}

#je_contiens_un_flottant {
	height: 100px;
	border: 1px solid black;
	margin-bottom: 5px;
}

#je_succede_au_div_contenant_un_flottant {
	margin:0;
	border: 1px solid black;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        #je_flotte {
            float: left;
            width: 30px;
            height: 150px;
            border: 2px solid orange; 
        }

        #je_contiens_un_flottant {
            height: 100px;
            border: 1px solid black;
            margin-bottom: 5px;
            /* dans l'exercice, essayer la ligne suivante pour en voir l'effet : */
            /* overflow: auto; */
        }

        #je_succede_au_div_contenant_un_flottant {
            margin:0;
            border: 1px solid black;
            clear: both;	/* pour que le flottant ne me déborde pas dessus : */
        }
        ```

!!! exoordi "Exercice 41 - :fontawesome-solid-star: :fontawesome-solid-star: :fontawesome-regular-star:"
    Dans le fichier qui suit, sans toucher au code Html, définir le Css pour obtenir une page semblable à :

    ![positionnement1](../../files/NSI/HTML/positionnement1.png)

    Lorsqu'on survole le cercle 2 : 

    ![positionnement1](../../files/NSI/HTML/positionnement2.png)

    Lorsqu'on survole le cercle 3.1 : 

    ![positionnement1](../../files/NSI/HTML/positionnement3.png)

    Le bandeau est centré horizontalement dans la page et il a une largeur de 800px.

    ---

    {{ html_css_playground(
  key="exo41",
  html_file="files/NSI/HTML/exo40.html",
  css_example="""/* Partie css modifiable */
ul {
	list-style-type: none;		/* on enlève les puces des listes : */
	margin: 0;
	padding: 0;
	height: 50px;
}

.horizontal>li {
	margin: 5px;
	padding: 0;
}

li {
	width: 50px; 
	text-align: center;
}

a {
	display: block;
	margin: 0;
	padding:0;
	border-radius: 50%;		/* pour avoir une forme de disque : */
	border: 1px solid lightgrey;
	background-color: yellow;
	width: 50px;
	height: 50px;
	line-height: 50px;		/* permet d'avoir un texte centré verticalement */
	text-decoration: none;
	color: lightblue;
	font-size: 12px;
}

header {
	height: 200px;
	background-color: lightgreen;
	margin: 0;
	padding:0;
}

header>h1 {
	color: orange;
}

nav {
	padding-top: 130px;
}

#blocPage {
	width: 800px; 
	margin: 0 auto;
}"""
) }}

    ??? success "Correction"
        On aurait : 

        ```css linenums="1"
        /* Partie css */
        ul {
            list-style-type: none;		/* on enlève les puces des listes : */
            margin: 0;
            padding: 0;
            height: 50px;
        }

        .horizontal>li {
            /* les éléments li 1, 2, 3 flottent à gauche. 
            Ils apparaissent ainsi alignés : */
            float: left;
            margin: 5px;
            padding: 0;
        }

        li {
            /* les éléments li sont déclarés en position relative de façon
            à déclarer en position absolute les sous-listes : */
            position: relative;
            width: 50px; 
            text-align: center;
        }

        a {
            display: block;
            margin: 0;
            padding:0;
            border-radius: 50%;		/* pour avoir une forme de disque : */
            border: 1px solid lightgrey;
            background-color: yellow;
            width: 50px;
            height: 50px;
            line-height: 50px;		/* permet d'avoir un texte centré verticalement */
            text-decoration: none;
            color: lightblue;
            font-size: 12px;
        }

        .vertical {
            /* les sous-listes ne sont pas affichées a priori : */ 
            display: none;
        }

        .horizontal>li:hover>.vertical {
            display: block;		/* affichage sous-liste niveau 1 au survol de l'élément li la contenant : */
            /* enlever le positionnement qui suit et chercher à expliquer la conséquence : */
            position: absolute;
        }

        .vertical>li:hover>.vertical {
            display: block;		/* affichage sous-liste  de niveau >1 au survolde l'élément li la contenant  : */
            position: absolute;
            top: 0;
            left: 100%;
        }

        header {
            height: 200px;
            position: relative;		/* position relative pour y placer h1 en absolu : */
            background-color: lightgreen;
            margin:0;
            padding:0;
        }

        header>h1 {
            position : absolute;
            left: 50%;
            top: 10px;
            color: orange;
        }

        nav {
            /* on joue ici sur la marge interne supérieure pour placer nav en bas du bandeau : */
            padding-top: 130px;
        }

        #blocPage {
            width: 800px; 
            margin: 0 auto;
        }
        ```