<template>
  <div class="home">
	<div class="jumbotron">
		<h1 class="display-3">Top 10 anime</h1>
		<div class="container">
			<div class="row">
				<div class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
           <div class="card mb-4" style="width: 18rem;">
          <img class="card-img-top" v-bind:src="getImage(anime.posterImage)" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ anime.name }}</h5>
            <p class="card-text">{{ anime.synopsis.slice(0, 200) }}...</p>
            <a href="#" class="btn btn-primary">Favoris</a>
          </div>
        </div> 
				</div>
			</div>
		</div>
	</div>
</div>


</template>

<script>
import axios from "axios";
//import anime from "../anime.js";

export default {
  name: "home",
  data() {
    return {
      name: "",
      listAnimeTop10: []
    };
  },
  mounted() {
    this.getTop10();
  },
  methods: {
    getTop10() {
      axios
        .get("https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0")
        .then(response => {
          var listAnime = response.data.data;

          for (var i = 0; i < listAnime.length; i++) {
            let myAnime = {};
            myAnime.id = listAnime[i].attributes.id;
            myAnime.name = listAnime[i].attributes.titles.en_jp;
            myAnime.synopsis = listAnime[i].attributes.synopsis;
            myAnime.posterImage = listAnime[i].attributes.posterImage.small;
            myAnime.genres = listAnime[i].attributes.genres;

            this.listAnimeTop10.push(myAnime);
          }
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getImage(url) {
      return url;
    }
  }
};
</script>
