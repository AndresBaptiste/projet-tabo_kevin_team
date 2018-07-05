<template>
   <div class="favoris">
	<div class="jumbotron">
		<div></div>
		<h1 class="display-3">Favoris</h1>
		<div class="container">
			<div class="row">
        <div v-if="loading" class="col-lg-12" style="font-size:24px;"><strong>Loading...</strong></div>
				<div v-else class="col-md-4" v-for=" myAnime in tabFavoris" v-bind:key="myAnime.id">
            <anime-card v-bind:anime="myAnime" v-bind:isFavoris="isFavoris(anime)" v-on:add="ajoutFavoris(anime)" v-on:remove="removeFavoris(anime)">
            </anime-card> 
				</div>
			</div>
	  </div>
	</div>
</div>

    <!-- a dupliquer par le nombre d'éléments !-->
</template>

<script>
//liste des fonctions utilisées pour favoris
const FAVORIS_KEY = "favorisAnime";
import Card from "@/components/Card.vue";
export default {
  name: "favoris",
  data() {
    return {
      msg: "",
      messages: "Hello",
      search: "",
      tabFavoris:[],
      favorisAnime: JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [],
      sortAZ: false
    };
  },

 

    mounted: {
      GetFavoris() {
        for (var i = 0; i < this.favorisAnime.length; i++) {
          let myAnime = {};
          myAnime.id = this.favorisAnime[i].id;
          myAnime.name = this.favorisAnime[i].attributes.titles.en_jp;
          myAnime.synopsis = this.favorisAnime[i].attributes.synopsis;
          myAnime.posterImage = this.favorisAnime[
            i
          ].attributes.posterImage.small;
          myAnime.genres = this.favorisAnime[i].included;
          myAnime.popularityRank = this.favorisAnime[
            i
          ].attributes.popularityRank;
          this.tabFavoris.push(myAnime);
          console.log(myAnime);
        }
      }
    },

    computed: {
      favorisFiltered() {
        const listFiltered = [];
        for (let favoris of this.favoris) {
          if (favoris.name.includes(this.favoris)) {
            listFiltered.push(favoris);
          }
        }
        return listFiltered;
      }
    },

    components: {
      "anime-card": Card
    }
  }
;
</script>

<style>
</style>
