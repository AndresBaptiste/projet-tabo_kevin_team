<template>
    
<div class="Presentation">
	<div class="jumbotron">
		<div class="container">
			<div class="card">
				<div class="row">
					<div class="col-md-4">
						<div class="card-img-left">
							<img style="height: 100%; width: 100%; display: block;" v-bind:src="`${media.posterImage}`" alt="Card image">
							<div class="card-footer">
								<button-favorite v-bind:media="media"></button-favorite>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="card-block">
							<div id="module" class="container">
								<h4 class="card-title">{{media.typeMedia | typeMediaTexte}} - {{ media.name }}</h4>
								<div class="collapse" id="collapseExample" aria-expanded="false">
									<p class="card-text" id="collapsedtext">
										{{ media.synopsis }}
									</p>
								</div>
								<a role="button" class="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>
								<div class="card-footer"></div>
								<p span class="badge badge-secondary">
									Categorie
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



</template>

<script>
import ButtonFavorite from "@/components/ButtonFavorite.vue";

export default {
  data() {
    return {
      media: this.$route.params.data || []
    };
  },
  filters: {
    typeMediaTexte: function(typeMedia) {
      if (typeMedia === 1) {
        return "Anime";
      } else if (typeMedia === 2) {
        return "Manga";
      }
      return "";
    }
  },
  components: {
    "button-favorite": ButtonFavorite
  }
};
</script>

<style>
</style>
