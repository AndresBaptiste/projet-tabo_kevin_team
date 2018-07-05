
<template>

  <div id="app">
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
		<div class="collapse navbar-collapse" id="navbarColor02">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a>
						<router-link to="/" class="nav-link" >
							Anime 
							<span class="sr-only">(current)</span>
						</router-link>
					</a>
				</li>
				<li class="nav-item"><router-link to="/manga" class="nav-link">Manga</router-link></li>
				<li class="nav-item">
					<router-link to="/favoris" class="nav-link" >
						Favoris
					</router-link> </li>
					<li class="nav-item"><router-link to="/about" class="nav-link" >About</router-link></li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" placeholder="Search" type="text">
				<router-link to="/recherche">	<button class="btn btn-secondary my-2 my-sm-0">Rechercher</button></router-link>
				</form>
			</div>


</nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {};
</script>
