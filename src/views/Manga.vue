<template>
  <div class="home">
		<h1 class="display-3">Top Manga</h1>
		<div class="container">
			<grid-card v-bind:listMedia="listMangas" v-bind:loading="loading">
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
      listMangas: []
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
          var listData = response.data.data;

          for (var i = 0; i < listData.length; i++) {
            let myMedia = {};
            myMedia.id = listData[i].id;
            myMedia.name = listData[i].attributes.titles.en_jp;
            myMedia.synopsis = listData[i].attributes.synopsis;
            myMedia.posterImage = listData[i].attributes.posterImage.small;
            myMedia.popularityRank = listData[i].attributes.popularityRank;
            myMedia.typeMedia = this.$root.TYPE_MEDIA.MANGA;
            myMedia.isFavoris = this.$root.isFavoris(myMedia);
            this.listMangas.push(myMedia);
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
