# Projet Become a Hero
Dans le cadre du cours bloc 643-1.1 PROJET DE TECHNOLOGIES WEB, un projet doit être réalisé en équipe sur la création d'un site web monopage avec le frameworks [Vue.JS](https://en.wikipedia.org/wiki/Vue.js).

## Equipe projet
- Kevin Seewer
- Tabo Kidane

## TaKe Anime
TaKe Anime est un site web qui offre aux internautes la possibilité de rechercher leurs animations japonaises préférées. Il offre la possibilité de rechercher un anime et de les ajouter à sa liste de favoris. Un top est également disponible vous permettant de trouver rapidement les meilleurs animes du moments.

Le site est réalisé avec les fameworks Vue.JS et Bootstrap.

### API Kitsu
Pour la réalisation du site, nous avons utlisés l'[API Kitsu](https://kitsu.docs.apiary.io/) du site [Kitsu.io](https://kitsu.io). Il offre une plateforme aux fans pour partager leurs expérences des animes et mangas. Les données sont en format JSON et exploitable en lecture grâce à l'API.

### Architecture du site
#### Maquettes des pages
** Mettre image croquis **
#### Views
- Home.vue : Page d'acceuil du site avec les meilleurs animes du moments.
- Manga.vue : Page avec les meilleures mangas du moments.
- Favoris.vue : Page de vos animes et mangas favoris.
- Recherche.vue : Page avec le résultat de votre recherche des animes.
- Presentation.vue : Page de fiche présentation d'un anime ou manga.
- About.vue : Page à propros du site.

#### Components
- GridCard.vue : Composant pour construire une grille de Card.vue
- Card.vue : Composant qui gère l'affichage d'une vignette d'un anime/manga.
- ButtonFavorite.vue : Composant représentant un bouton pour ajouter/supprimer un anime/manga de nos favoris.

#### Hiéarchies des views/components

## Problèmes / Solutions

### Problème généraux

#### Prise de connaissance de l'api. 
Un grande partie du temps utilisé pour la réalisation du projet a été de maitriser l'api utilisée. Afin de pouvoir l'utiliser convenablement et connaître les fonctionnalitées qu'elle pouvait nous apporter, nous avons fait une multitude de tests et avions à disposition une documentation complète.

#### Utilisation du Git par plusieurs personnes. 
Dans le travail demandé, il nous a fallu utiliser le git à plusieurs, donc géré les conflits sur les diférents fichiers. Dans la mesure du possible, nous avont éviter de modifier le même fichier dans le même rush afin d'éviter les conflits.

#### Connaissance de Vue.js et temps impoarti. 
Dans la mesure ou nous avions peu de temps imparti pour réaliser le projet, nous avons séparé le travail en deux parties distinctes: 

- l'apparence, la structure et le style du site. 
- la manipulation des données et l'interaction avec l'api.

chaque personne du groupe à été associé à l'une de ces deux tâches profitant des connaissances de l'un et de l'autre.
### Fonctionnalité de recherche
Les éléments de la recherche sont intégrés dans notre menu bootstrap du fichier `App.vue`. Nous avons englobé notre bouton recherche par un composant `<router-link>` avec pour cible notre page `Recherche.vue` en lui passant en paramètre la valeur de la recherche qui nous récupérons ensuite dans notre page cible. 

La recherche fonctionnait qu'une seule fois et seulement si nous étions sur une autre page que `Recherche.vue`. Il n'était plus possible de refaire appel à cette fonction une nouvelle fois de suite.

Pour résoudre ce problème, il a fallut intervenir sur plusieurs plans :

- Dans notre routeur `router.js`, modifier notre url de recherche en lui spécifiant un segment dynamique avec `:`. La valeur de ce segment sera disponible dans notre vue `Recherche.vue` à travers la variable `$route`.
    ```javascript
    {
        path: "/recherche/:data",
        name: "recherche",
        component: Recherche
    },
    ```

- Ajouter à notre vue `Recherche.vue` un observateur personnalisé avec l'option `watch` sur notre variable `$route` afin de lancer l'appel à la méthode de recherche lorsque les données changent.
    ```javascript
    watch: {
        $route: {
        handler() {
            this.listMedias = [];
            this.getMedias(this.$route.params.data);
        },
        deep: true
        }
    },
    ```
    l'option `deep : true` permet de détecter les changements à l'intérieur de nos objets, en l'occurence notre valeur de recherche `$route.params.data`.


> Documentation relative à l'option `watch` (https://fr.vuejs.org/v2/guide/computed.html#Observateurs)

## Principales lecons apprises
Nous avons appris à réaliser un site web monopage à l'aide du frameworks Vue.JS ainsi que le passage des paramètres en différents composants. L'utilisation d'une API et la manipulation de tableau d'objets également.

Un des éléments important lors de la réalisation d'un site/application web, outre les fonctionnalités, est l'expérience utilisaeur. L'UX de notre site est un élément à ne pas négliger pour un informaticien de gestion. Le ressenti de l'utilisateur lors de la manipulation de notre site ou application web est aussi importante que les foncitonnalités en elles-mêmes.
