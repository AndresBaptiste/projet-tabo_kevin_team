<template>
     <div class="recherche">
		<h1 class="display-3">Résultat de recherche</h1>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
				<p><label>Rechercher <input type="text" v-model="texteRecherche"></label></p>
				<p>Valeur de la recherche {{texteRecherche}}	</p>
				</div>
			</div>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      texteRecherche: ""
    };
  }
};
</script>

<style>
</style>
