<template>
     <div class="recherche">
		<h1 class="display-3">Résultat de recherche</h1>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
				<p><label>Rechercher <input type="text" v-model="texteRecherche" @keyup.enter="getRecherche()"></label></p>
				<p>Valeur de la recherche {{texteRecherche}}	</p>
				</div>
			</div>
	</div>

	<div class="container">
			<div class="row">
        <div v-if="loading" class="col-lg-12" style="font-size:24px;"><strong>Loading...</strong></div>
				<div v-else class="col-md-4" v-for="anime in listAnimeTop10" v-bind:key="anime.id">
            <anime-card v-bind:media="anime" v-bind:typeMedia="typeMedia" v-bind:isFavoris="isFavoris(anime)" v-on:add="ajoutFavoris(anime)" v-on:remove="removeFavoris(anime)">
            </anime-card> 
				</div>
			</div>
	  </div>
</div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      texteRecherche: ""
    };
  },
  mounted() {
    this.getRecherche();
  },
  methods: {}
};
</script>

<style>
</style>
