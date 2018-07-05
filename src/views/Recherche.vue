<template>
     <div class="recherche">
		<h1 class="display-3">Résultat de recherche</h1>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
				<p><label>Rechercher <input type="text" v-model="texteRecherche" @keyup.enter="getRecherche()"></label></p>
				<p>Valeur de la recherche {{texteRecherche}}	</p>
				</div>
			</div>
	</div>

	<div class="container">
			<div class="row">
        <div v-if="loading" class="col-lg-12" style="font-size:24px;"><strong>Loading...</strong></div>
				<div v-else class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
            <anime-card v-bind:media="anime" v-bind:typeMedia="typeMedia" v-bind:isFavoris="isFavoris(anime)" v-on:add="ajoutFavoris(anime)" v-on:remove="removeFavoris(anime)">
            </anime-card> 
				</div>
			</div>
	  </div>
</div>
</template>

<script>

import axios from "axios";
import Card from "@/components/Card.vue";
const FAVORIS = "favorisAnime";

export default {
  name: "home",
  data() {
    return {
      name: "",
      typeMedia: "anime",
      loading: true,
      listAnimeTop10: [],
      listeGenres: [],
			listAnimeFavoris: JSON.parse(localStorage.getItem(FAVORIS)) || [],
			texteRecherche:""
    };
  },
  mounted() {
    this.getRecherche();
  },
  methods: {
    getRecherche() {
      axios
        .get(
          "https://kitsu.io/api/edge/anime?filter[text]="+this.texteRecherche
        )
        .then(response => {
          var listAnimes = response.data.data;

          // Récupération des données de type genres brut
          var listGenresBrut = response.data.included.filter(
            e => e.type === "genres"
          );
          // Envoi au parent pour la mise en cache
          this.$emit("getGenres", listGenresBrut);
          //console.log(this.$parent.listGenres);

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
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => (this.loading = false));
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

<style>
</style>
