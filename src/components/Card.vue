<template>
<div>
	<div class="card mb-4">
		<router-link :to="{name:'presentation', params: {data: media, type: typeMedia}}">
		<div><img class="card-img-top" v-bind:src="`${media.posterImage}`" style="heigth= 100%; width= 100%;" alt="Card image cap"></div>
		</router-link>
		<div class="card-body">
			<h5 class="card-title">
				{{ media.name }}
			</h5>
			<p class="card-text">
				{{ media.synopsis.slice(0, 220) }}...
			</p>
			<ul>
				<li>{{ media.popularityRank }}</li>
			</ul>
		</div>
		<div class="card-footer  text-muted">
			<button class="btn btn-primary" v-if="isFavoris" v-on:click="removeFavoris()">Suppression</button>
			<button class="btn btn-primary" v-if="!isFavoris" v-on:click="addFavoris()">Favoris</button>
		</div>
	</div>
</div>

</template>

<script>
export default {
  name: "Card",
  props: ["media", "isFavoris", "typeMedia"],
  methods: {
    addFavoris() {
      this.$emit("add");
    },
    removeFavoris() {
      this.$emit("remove");
    }
  }
};
</script>

<style>
</style>
