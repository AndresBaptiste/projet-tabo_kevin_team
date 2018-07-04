<template>

   <div class="favoris">
	<div class="jumbotron">
		<h1 class="display-3">Favoris</h1>
		<div class="container">
      <!-- à dupliquer!-->
			<div class="row">
				<div class="col-md-4">
					<div class="card mb-3">
						<h3 class="card-header">Card header</h3>
						<div class="card-body">
							<img style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image">
							<div class="card-body">
								<p class="card-text">
									Some quick example text to build on the card title and make up the bulk of the card's content.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    <!-- a dupliquer par le nombre d'éléments !-->
</template>

<script>
//liste des fonctions utilisées pour favoris
const FAVORIS_KEY = "favoris";
export default {
  name: "favoris",
  data() {
    return {
      msg: "",
      messages: "Hello",
      search: "",
      contacts: JSON.parse(localStorage.getItem(FAVORIS_KEY)) || [],
      sortAZ: false
    };
  },

  methods: {
    deleteList(index) {
      this.favoris.splice(index, 1);
      this.saveToJson();
    },
    reverseList() {
      this.favoris.reverse();
    },
    saveToJson() {
      localStorage.setItem(FAVORIS_KEY, JSON.stringify(this.favoris));
    }
  },

  computed: {
    favorisFiltered() {
      const listFiltered = [];
      for (let favoris of this.favoris) {
        if (favoris.name.includes(this.favoris)) {
          listFiltered.push(favoris);
        }
      }
      return listFiltered;
    }
  }
};
</script>

<style>
</style>
