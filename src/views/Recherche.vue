<template>
	<div class="recherche">
		<h1 class="display-3">Résultat de recherche</h1>
		<div class="container">
				<grid-card v-bind:listMedia="listMedias" v-bind:loading="loading">
			</grid-card>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import GridCard from "@/components/GridCard.vue";

export default {
  data() {
    return {
      loading: "",
      listMedias: []
    };
  },
  mounted() {
    this.getMedias(this.$route.params.data);
  },
  watch: {
    $route: {
      handler() {
        this.listMedias = [];
        this.getMedias(this.$route.params.data);
      },
      deep: true
    }
  },
  methods: {
    getMedias(texte) {
      axios
        .get(
          "https://kitsu.io/api/edge/anime?page[limit]=09&page[offset]=0&filter[text]=" +
            texte
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
            this.listMedias.push(myMedia);
          }
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

<style>
</style>
