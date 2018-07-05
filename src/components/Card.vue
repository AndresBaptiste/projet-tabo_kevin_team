<template>
<div>
	<div class="card mb-4">
		<router-link :to="{name:'presentation', params: {data: media}}">
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
				<h6>rank: {{ media.popularityRank }}</h6>
			</ul>
		</div>
		<div class="card-footer  text-muted">
			<button-favorite v-bind:media="media"></button-favorite>
		</div>
	</div>
</div>

</template>

<script>
import ButtonFavorite from "@/components/ButtonFavorite.vue";

export default {
  name: "Card",
  props: ["media"],
  components: {
    "button-favorite": ButtonFavorite
  }
};
</script>

<style>
</style>
