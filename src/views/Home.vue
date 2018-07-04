<template>
  <div class="home">
		<h1 class="display-3">Top 10</h1>
		<div class="container">
			<div class="row">
				<div class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
           <anime-card v-bind:anime="anime" v-bind:isFavoris="isFavoris(anime)" v-on:add="ajoutFavoris(anime)" v-on:remove="removeFavoris(anime)">
           </anime-card> 
				</div>
			</div>
	  </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card.vue";
const FAVORIS = "favoris";

export default {
  name: "home",
  data() {
    return {
      name: "",
      listAnimeTop10: [],
      listAnimeFavoris: JSON.parse(localStorage.getItem(FAVORIS)) || []
    };
  },
  mounted() {
    this.getTop10();
  },
  methods: {
    getTop10() {
      axios
        .get(
          "https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0&sort=popularityRank&include=genres,categories&filter[text]=cowboy"
        )
        .then(response => {
          var listAnimes = response.data.data;

          // Récupération des données de type genres brut
          var listGenresBrut = response.data.included.filter(
            e => e.type === "genres"
          );
          // Envoi au parent pour la mise en cache
          this.$emit("getGenres", listGenresBrut);

          // Récupération des catégories
          var listCategoriesBrut = response.data.included.filter(
            e => e.type === "categories"
          );
          // Envoi au parent pour la mise en cache
          this.$emit("getCategories", listCategoriesBrut);

          for (var i = 0; i < listAnimes.length; i++) {
            let myAnime = {};
            myAnime.id = listAnimes[i].id;
            myAnime.name = listAnimes[i].attributes.titles.en_jp;
            myAnime.synopsis = listAnimes[i].attributes.synopsis;
            myAnime.posterImage = listAnimes[i].attributes.posterImage.small;
            myAnime.genres = listAnimes[i].included;
            myAnime.popularityRank = listAnimes[i].attributes.popularityRank;

            this.listAnimeTop10.push(myAnime);
          }
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ajoutFavoris(anime) {
      const index = this.listAnimeFavoris.indexOf(anime);
      if (index === -1) {
        this.listAnimeFavoris.push(anime);
        this.saveToLocalStorage();
      }
      console.log(this.listAnimeFavoris);
    },
    removeFavoris(anime) {
      const index = this.listAnimeFavoris.map(e => e.id).indexOf(anime.id);
      // Test sur l'index car les objets en Favoris peuvent provenir du Local Storage et donc ne possède pas la même référence objet que ceux chargés à la vue
      if (index !== -1) {
        this.listAnimeFavoris.splice(index, 1);
        this.saveToLocalStorage();
      }
      console.log(this.listAnimeFavoris);
    },
    isFavoris(anime) {
      if (this.listAnimeFavoris.some(e => e.id === anime.id)) {
        return true;
      }
      return false;
    },
    saveToLocalStorage() {
      localStorage.setItem(FAVORIS, JSON.stringify(this.listAnimeFavoris));
    }
  },
  components: {
    "anime-card": Card
  }
};
</script>
