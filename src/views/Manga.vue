<template>
  <div class="home">
		<h1 class="display-3">Top Manga</h1>
		<div class="container">
			<div class="row">
        <div v-if="loading" class="col-lg-12" style="font-size:24px;"><div class="typewriter"><h5>Loading...</h5></div></div>
				<div v-else class="col-md-4" v-for="manga in listMangaTop10" v-bind:key="manga.id">
           <anime-card v-bind:media="manga" v-bind:typeMedia="typeMedia" v-bind:isFavoris="isFavoris(manga)" v-on:add="ajoutFavoris(manga)" v-on:remove="removeFavoris(manga)">
           </anime-card> 
				</div>
			</div>
	</div>
</div>
</template>

<script>
import axios from "axios";
import Card from "@/components/Card.vue";
const FAVORIS = "favorisManga";

export default {
  name: "home",
  data() {
    return {
      name: "",
      typeMedia: "manga",
      loading: true,
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
          "https://kitsu.io/api/edge/manga?page[limit]=9&page[offset]=0&sort=popularityRank&include=genres"
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
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    ajoutFavoris(manga) {
      const index = this.listMangaFavoris.indexOf(manga);
      if (index === -1) {
        this.listMangaFavoris.push(manga);
        this.saveToLocalStorage();
      }
      console.log(this.listMangaFavoris);
    },
    removeFavoris(manga) {
      const index = this.listMangaFavoris.map(e => e.id).indexOf(manga.id);
      if (index !== -1) {
        this.listMangaFavoris.splice(index, 1);
        this.saveToLocalStorage();
      }
      console.log(this.listMangaFavoris);
    },
    isFavoris(manga) {
      if (this.listMangaFavoris.some(e => e.id === manga.id)) {
        return true;
      }
      return false;
      //return this.listMangaFavoris.includes(manga);
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
