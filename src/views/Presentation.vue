<template>
    
<div class="Presentation">
	<div class="jumbotron">
		<div class="container">
			 <div class="card">
      <div class="row">
		  <div class="col-md-4">
          <div class="card-img-left">
			  <img style="height: 100%; width: 100%; display: block;" v-bind:src="`${media.data.posterImage}`" alt="Card image">
          <div class="card-footer">  
		  <p button type="button" class="btn btn-success">Ajouter aux Favoris</p>
          </div>
		  </div>
        </div>
        <div class="col-md-6">
           
          <div class="card-block">
              <div id="module" class="container">
            <h4 class="card-title">{{media.type | capitalize}} - {{ media.data.name }}</h4>
             <div class="collapse" id="collapseExample" aria-expanded="false">	<p class="card-text">{{ media.data.synopsis }}</p>  </div>
		
      <a role="button" class="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></a>
               <div class="card-footer">
				 </div>  
			<p span class="badge badge-secondary">Categorie</p>
			 
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
export default {
  data() {
    return {
      media: { data: this.$route.params.data, type: this.$route.params.type }
    };
  },
  filters: {
    capitalize: function(texte) {
      if (!texte) return "";
      texte = texte.toString();
      return texte.charAt(0).toUpperCase() + texte.slice(1);
    }
  }
};
</script>

<style>
</style>
