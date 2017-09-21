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

```bash
$ npm install
```
#### Vous aurez besoin de remplir un google sheet :

- [Spreadsheets Sample Quiz](https://docs.google.com/spreadsheets/d/19kqdeE6oRR5GQEAHaQ2zvhQghzq55aNYqcHM-ZK4Zyk/edit?usp=sharing)
- [Spreadsheets Sample Diparorama](https://docs.google.com/spreadsheets/d/1AcNEA3-i9-_0DrukFVvOilf9yd2Y0rNS_hPBr-nQ9wQ/edit?usp=sharing)
- [Spreadsheets Sample Switch](https://docs.google.com/spreadsheets/d/1KZ_IEqJwxv-W9T0X27ychB83bBDBU0Eqjd38wObjMn0/edit?usp=sharing)

_Une fois le google sheet remplis, il faut le publié : **Fichier / Publié pour le Web**_

Et de copier son **ID** :

docs.google.com/spreadsheets/d/**1VZitfD0IGveJvwQayfflLTMwm3uQKMeVw8oS90Sz-uk**/edit#gid=0

#### Ansi que les 3 couleurs du numéro en cours :

- Main : Color 1
- Side : Color 2
- Ligth : Color 4


## Utilisation

Aller dans le repertoire ptit-libe-modules-master

**Sur PC :** `[MAJ + Clique droit]` / Ouvrir une fenêtre de commandes ici

**Sur Mac :** Ouvrire l'application terminal, taper : `cd [ESPACE]` et glisser le dossier dans la fenêtre du terminal, taper `[ENTRER]`

#### Lancer la création d'un nouveaux module :

```bash
$ npm run build
```
#### Répondre aux differentes questions :

```bash
? Nom du module
? Numéro du Ptit Libé
? Quel type de module? (Quiz, Diaporama, Carte cliquable, Switch bouton)
? ID du sheet
? Est ce qu\'il y a plusieur feuilles dans le sheet ? (Yes/No)
? Nom de la feuille à traiter
? Nom du fichier svg (pour les modules de type carte)
? Couleur principale (1)
? Couleur secondaire (2)
? Couleur opacité resuite (4)
```
_Si tous se passe bien vous allez voir le logo Ptit Libé ainsi que les instruction pour la mise en ligne._

## Mise en ligne
Le nouveau module à été crée dans le dossier `./dist/{numero}/{dossier}/`

le `{numero}` et le `{dossier}` s'afficheron dans la console

1. Si c'est un module de type carte, ajouter le fichier svg dans : `./dist/{numero}/{dossier}/assets/`
2. Pour tester le module taper : `browser-sync start -s "./dist/{numero}/{dossier}/"`
3. Placer le module sur le ftp dans : `ptit-libe/modules/{numero}/{dossier}/`
4. Copier la balise iframe dans le corps de l'article : `<iframe src="http://www.liberation.fr/apps/ptit-libe/modules/{numero}/{dossier}" class="fit-content" width="100%"></iframe>`

## ToDo

- Tester les ID avec accents dans AI
- Upload des fichier via ssh



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
