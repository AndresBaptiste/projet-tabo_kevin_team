<template>
        <div class="card mb-4">
            <img class="card-img-top" v-bind:src="`${anime.posterImage}`" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ anime.name }}</h5>
                <p class="card-text">{{ anime.synopsis.slice(0, 200) }}...</p>
                <ul>
                    <li>{{ anime.popularityRank }}</li>
                </ul>
                <button class="btn btn-primary" v-if="isFavoris" v-on:click="removeFavoris()">Suppression</button>
                <button class="btn btn-primary" v-if="!isFavoris" v-on:click="addFavoris()">Favoris</button>
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
