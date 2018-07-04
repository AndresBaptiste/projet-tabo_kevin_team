<template>
  <div class="home">
		<h1 class="display-3">Top Manga</h1>
		<div class="container">
			<div class="row">
				<div class="col-md-4" v-for="anime in listMangaTop10" v-bind:key="anime.id">
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
      listMangaTop10: [],
      listMangaFavoris: JSON.parse(localStorage.getItem(FAVORIS)) || []
    };
  },
  mounted() {
    this.getTop10();
  },
  methods: {
    getTop10() {
      axios
        .get(
          "https://kitsu.io/api/edge/manga?page[limit]=10&page[offset]=0&sort=popularityRank&include=genres"
        )
        .then(response => {
          var listManga = response.data.data;
          //var listGenre = response.data.included;

          for (var i = 0; i < listManga.length; i++) {
            let myManga = {};
            myManga.id = listManga[i].id;
            myManga.name = listManga[i].attributes.titles.en_jp;
            myManga.synopsis = listManga[i].attributes.synopsis;
            myManga.posterImage = listManga[i].attributes.posterImage.small;
            myManga.genres = listManga[i].attributes.genres;
            myManga.popularityRank = listManga[i].attributes.popularityRank;

            this.listMangaTop10.push(myManga);
          }
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ajoutFavoris(anime) {
      const index = this.listMangaFavoris.indexOf(anime);
      if (index === -1) {
        this.listMangaFavoris.push(anime);
        this.saveToLocalStorage();
      }
      console.log(this.listMangaFavoris);
    },
    removeFavoris(anime) {
      const index = this.listMangaFavoris.map(e => e.id).indexOf(anime.id);
      if (index !== -1) {
        this.listMangaFavoris.splice(index, 1);
        this.saveToLocalStorage();
      }
      console.log(this.listMangaFavoris);
    },
    isFavoris(anime) {
      if (this.listMangaFavoris.some(e => e.id === anime.id)) {
        return true;
      }
      return false;
      //return this.listMangaFavoris.includes(anime);
    },
    saveToLocalStorage() {
      localStorage.setItem(FAVORIS, JSON.stringify(this.listMangaFavoris));
    }
  },
  components: {
    "anime-card": Card
  }
};
</script>