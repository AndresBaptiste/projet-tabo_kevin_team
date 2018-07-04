<template>
<div>
	<div class="card mb-4">
		<router-link to="/Presentation">
		<div><img class="card-img-top" v-bind:src="`${anime.posterImage}`" style="heigth= 100%; width= 100%;" alt="Card image cap"></div>
		</router-link>
		<div class="card-body">
			<h5 class="card-title">
				{{ anime.name }}
			</h5>
			<p class="card-text">
				{{ anime.synopsis.slice(0, 200) }}...
			</p>
			<ul>
				<li>{{ anime.popularityRank }}</li>
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
  props: ["anime", "isFavoris"],
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
