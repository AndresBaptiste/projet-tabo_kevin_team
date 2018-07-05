<template>
  <div class="home">
		<h1 class="display-3">Top Anime</h1>
		<div class="container">
			<grid-card v-bind:listMedia="listAnimes" v-bind:loading="loading">
			</grid-card>
	  </div>
  </div>
</template>

<script>
import axios from "axios";
import GridCard from "@/components/GridCard.vue";

export default {
  name: "home",
  data() {
    return {
      loading: true,
      listAnimes: []
    };
  },
  mounted() {
    this.getTop10();
  },
  methods: {
    getTop10() {
      axios
        .get(
          "https://kitsu.io/api/edge/anime?page[limit]=09&page[offset]=0&sort=popularityRank&include=genres,categories"
        )
        .then(response => {
          var listData = response.data.data;

          for (var i = 0; i < listData.length; i++) {
            let myMedia = {};
            myMedia.id = listData[i].id;
            myMedia.name = listData[i].attributes.titles.en_jp;
            myMedia.synopsis = listData[i].attributes.synopsis;
            myMedia.posterImage = listData[i].attributes.posterImage.small;
            myMedia.genres = listData[i].included;
            myMedia.popularityRank = listData[i].attributes.popularityRank;
            myMedia.typeMedia = this.$root.TYPE_MEDIA.ANIME;
            myMedia.isFavoris = this.$root.isFavoris(myMedia);
            this.listAnimes.push(myMedia);
          }
          console.log(response.data);
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    }
  },
  components: {
    "grid-card": GridCard
  }
};
</script>
