<template>
  <div class="home">
		<h1 class="display-3">Top 10</h1>
		<div class="container">
			<div class="row">
				<div class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
           <anime-card v-bind:anime="anime" v-bind:isFavoris="false" v-on:actionToBind="ajoutFavoris(anime)">
           </anime-card> 
				</div>
			</div>
	</div>
</div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card.vue";
//import anime from "../anime.js";

export default {
  name: "home",
  data() {
    return {
      name: "",
      listAnimeTop10: [],
      listAnimeFavoris: []
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
            myAnime.id = listAnime[i].attributes.id;
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
      this.listAnimeFavoris.push(anime);
      console.log(this.listAnimeFavoris);
    }
  },
  components: {
    "anime-card": Card
  }
};
</script>
