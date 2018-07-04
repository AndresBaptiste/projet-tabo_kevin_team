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
          "https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0&sort=popularityRank&include=genres"
        )
        .then(response => {
          var listAnime = response.data.data;
          //var listGenre = response.data.included;

          for (var i = 0; i < listAnime.length; i++) {
            let myAnime = {};
            myAnime.id = listAnime[i].id;
            myAnime.name = listAnime[i].attributes.titles.en_jp;
            myAnime.synopsis = listAnime[i].attributes.synopsis;
            myAnime.posterImage = listAnime[i].attributes.posterImage.small;
            myAnime.genres = listAnime[i].attributes.genres;
            myAnime.popularityRank = listAnime[i].attributes.popularityRank;

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
      //return this.listAnimeFavoris.includes(anime);
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
