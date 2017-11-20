# Ptit Libé Modules

**Un générateur de modules pour le Ptit Libé**. Crée des modules intéractif à partir de google sheet, qui serons ensuite àjoutés en iframe dans les articles.

- Quiz
- Diaporama
- Carte cliquable
- Switch


## Installation
Requière Node JS >= 8.5.0 : [télécharger et installer Node](https://nodejs.org/fr/)

Installer browser-sync via : `npm install -g browser-sync`

#### Install :

```
$ npm install
```
## Nouvau module
#### Vous aurez besoin de remplir un des google sheet :

- [Spreadsheets Quiz](https://docs.google.com/spreadsheets/d/1nSlncTAbI2lMz9jGkI1i4_JCu1FIooMM5SIcPGD0718/edit)
- [Spreadsheets Diparorama](https://docs.google.com/spreadsheets/d/14fZ31oTZM2AcMzjyXTN5PufubE4LaZjkW7aKI4dCgAM/edit)
- [Spreadsheets Switch](https://docs.google.com/spreadsheets/d/1VZitfD0IGveJvwQayfflLTMwm3uQKMeVw8oS90Sz-uk/edit)

_Une fois le google sheet remplis, il faut le publié : **Fichier / Publié pour le Web**_

#### De copier son ID :

docs.google.com/spreadsheets/d/**1VZitfD0IGveJvwQayfflLTMwm3uQKMeVw8oS90Sz-uk**/edit#gid=0

- Pour les Quiz : **1nSlncTAbI2lMz9jGkI1i4_JCu1FIooMM5SIcPGD0718**
- Pour les Diaporama : **14fZ31oTZM2AcMzjyXTN5PufubE4LaZjkW7aKI4dCgAM**
- Pour les Switch : **1VZitfD0IGveJvwQayfflLTMwm3uQKMeVw8oS90Sz-uk**

#### Ansi que des 3 couleurs du numéro en cours :

[Le lien des settings dans le quai pour les couleurs](http://quai.liberation.fr/bilbo/ptitlibemodels/ptitlibesettings/)

- Color 4
- Color 1
- Color 2


## Utilisation

Ouvrir le repertoire ptit-libe-modules-master dans la console

**Sur PC :** `[MAJ + Clique droit]` / Ouvrir une fenêtre de commandes ici

**Sur Mac :** Ouvrire l'application terminal, taper : `cd [ESPACE]` et glisser le dossier dans la fenêtre du terminal, taper `[ENTRER]`

#### Lancer la création d'un nouveaux module :

```
$ npm run build
```
#### Répondre aux differentes questions :

```
? Nom du module
? Numéro du Ptit Libé
? Quel type de module? (Quiz, Diaporama, Carte cliquable, Switch bouton)
? ID du sheet
? Est ce qu'il y a plusieur feuilles dans le sheet ? (Yes/No)
? Nom de la feuille à traiter
? Nom du fichier svg (pour les modules de type carte)
? Titre
? Consigne
? Couleur 4
? Couleur 1
? Couleur 2
```
_Si tous se passe bien vous allez voir le logo Ptit Libé ainsi que les instruction pour la mise en ligne._

## Mise en ligne
Le nouveau module à été crée dans le dossier `./dist/{numero}/{dossier}/`

le `{numero}` et le `{dossier}` s'afficheron dans la console

1. Si c'est un module de type carte, ajouter le fichier svg dans : `./dist/{numero}/{dossier}/assets/`
2. Pour tester le module taper : `browser-sync start -s "./dist/{numero}/{dossier}/"` (pour sortir du test taper `[Ctrl + C]` sur le clavier)
3. Placer le module sur le ftp dans : `ptit-libe/modules/{numero}/{dossier}/`
4. Copier la balise iframe dans le corps de l'article : `<iframe src="https:/statics.liberation.fr/apps/ptit-libe/modules/{numero}/{dossier}" class="fit-content" width="100%"></iframe>` dans une balise p avec la calss "full-width"


## ToDo

- Tester les ID avec accents dans AI
- ajouter les couleurs via api
- Upload des fichier via ssh
- Crée une interface pour remplacer l'utilisation de la console


## License

> The MIT License (MIT)
>
> Copyright (c) Libé Six Plus 2015
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without > limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following > conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO > EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR > THE USE OR OTHER DEALINGS IN THE SOFTWARE.
