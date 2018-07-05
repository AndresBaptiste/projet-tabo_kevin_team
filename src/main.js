import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/spacelab/bootstrap.min.css";
import "./main.css";

Vue.config.productionTip = false;
const FAVORIS_MANGA = "favorisManga";
const FAVORIS_ANIME = "favorisAnime";

new Vue({
  data() {
    return {
      TYPE_MEDIA: {
        ANIME: 1,
        MANGA: 2
      },
      listAnimeFavoris: JSON.parse(localStorage.getItem(FAVORIS_ANIME)) || [],
      listMangaFavoris: JSON.parse(localStorage.getItem(FAVORIS_MANGA)) || []
    };
  },
  methods: {
    saveToLocalStorage(typeMedia) {
      if (typeMedia === this.TYPE_MEDIA.ANIME) {
        localStorage.setItem(
          FAVORIS_ANIME,
          JSON.stringify(this.listAnimeFavoris)
        );
      } else if (typeMedia === this.TYPE_MEDIA.MANGA) {
        localStorage.setItem(
          FAVORIS_MANGA,
          JSON.stringify(this.listMangaFavoris)
        );
      }
    },
    isFavoris(media) {
      if (media.typeMedia === this.TYPE_MEDIA.ANIME) {
        if (this.listAnimeFavoris.some(e => e.id === media.id)) {
          return true;
        }
        return false;
      } else if (media.typeMedia === this.TYPE_MEDIA.MANGA) {
        if (this.listMangaFavoris.some(e => e.id === media.id)) {
          return true;
        }
        return false;
      }
    }
  },
  router,
  render: h => h(App)
}).$mount("#app");
