<template>
  <div class="home">
	<div class="jumbotron">
		<h1 class="display-3">Top 10</h1>
		<div class="container">
			<div class="row">
				<div class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
					<div class="card mb-3">
						<h3 class="card-header">{{ anime.name }}</h3>
						<div class="card-body">
							<img style="height: 200px; align: center;< display: block;" v-bind:src="getImage(anime.posterImage)"  alt="Card image">
							<div class="card-body">
								<p class="card-text">
									{{ anime.synopsis.slice(0, 200) }}...
								</p>
							</div>
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
            myAnime.genres = listAnime[i].attributes.genres;
            myAnime.posterImage = listAnime[i].attributes.posterImage.small;

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
