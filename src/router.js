import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Favoris from "./views/Favoris.vue";
import Manga from "./views/Manga.vue";
import Recherche from "./views/Recherche.vue";
import Presentation from "./views/Presentation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/favoris",
      name: "favoris",
      component: Favoris
    },
    {
      path: "/manga",
      name: "manga",
      component: Manga
    },
    {
      path: "/recherche/:data",
      name: "recherche",
      component: Recherche
    },
    {
      path: "/presentation",
      name: "presentation",
      component: Presentation
    }
  ]
});
