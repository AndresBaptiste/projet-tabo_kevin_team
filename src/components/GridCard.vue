<template>
  <div class="home">
		<h1 class="display-3">Top Anime</h1>
		<div class="container">
			<div class="row">
        <div v-if="loading" class="col-lg-12" style="font-size:24px;"><strong>Loading...</strong></div>
				<div v-else class="col-md-4" v-for="media in listMedia" v-bind:key="media.id">
            <media-card v-bind:media="media" v-bind:typeMedia="typeMedia" v-bind:isFavoris="isFavoris(media)" v-on:add="ajoutFavoris(media)" v-on:remove="removeFavoris(media)">
            </media-card> 
				</div>
			</div>
	  </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "GridCard",
  props: ["listMedia", "typeMedia"],
  methods: {
    ajoutFavoris(media) {
      this.$emit("addFavoris", media);
    },
    removeFavoris(media) {
      this.$emit("removeFavoris", media);
    },
    isFavoris(media) {
      this.$emit("isFavoris", media);
    }
  },
  components: {
    "media-card": Card
  }
};
</script>
