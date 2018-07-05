<template>
  <div class="favoris">
		<h1 class="display-3">Favoris</h1>
		<div class="container">
      <h6>Anime</h6>
			<grid-card v-bind:listMedia="listAnimeFavoris" v-bind:loading="loading">
			</grid-card>
      
      <h6>Manga</h6>
      <grid-card v-bind:listMedia="listMangaFavoris" v-bind:loading="loading">
			</grid-card>
	  </div>
  </div>
</template>

<script>
import GridCard from "@/components/GridCard.vue";

export default {
  name: "favoris",
  data() {
    return {
      loading: true,
      listAnimeFavoris: [],
      listMangaFavoris: []
    };
  },
  mounted() {
    this.listAnimeFavoris = this.$root.listAnimeFavoris;
    this.listMangaFavoris = this.$root.listMangaFavoris;
    this.loading = false;
  },
  methods: {},
  components: {
    "grid-card": GridCard
  }
};
</script>
