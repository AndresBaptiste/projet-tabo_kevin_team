<template>
<div>
    <button class="btn btn-primary" v-on:click="favorite()">{{textButton}}</button>
</div>
</template>

<script>
export default {
  name: "ButtonFavorite",
  data() {
    return {
      texte: ""
    };
  },
  props: ["media"],
  methods: {
    favorite() {
      this.media.isFavoris = !this.media.isFavoris;
      if (this.media.isFavoris) {
        this.ajoutFavoris();
      } else {
        this.removeFavoris();
      }
    },
    ajoutFavoris() {
      var listFavoris = [];
      if (this.media.typeMedia === this.$root.TYPE_MEDIA.ANIME) {
        listFavoris = this.$root.listAnimeFavoris;
      } else if (this.media.typeMedia === this.$root.TYPE_MEDIA.MANGA) {
        listFavoris = this.$root.listMangaFavoris;
      }
      const index = listFavoris.map(e => e.id).indexOf(this.media.id);
      if (index === -1) {
        this.media.isFavoris = true;
        listFavoris.push(this.media);
        this.$root.saveToLocalStorage(this.media.typeMedia);
      }
    },
    removeFavoris() {
      var listFavoris = [];
      if (this.media.typeMedia === this.$root.TYPE_MEDIA.ANIME) {
        listFavoris = this.$root.listAnimeFavoris;
      } else if (this.media.typeMedia === this.$root.TYPE_MEDIA.MANGA) {
        listFavoris = this.$root.listMangaFavoris;
      }
      const index = listFavoris.map(e => e.id).indexOf(this.media.id);
      // Test sur l'index car les objets en Favoris peuvent provenir du Local Storage et donc ne possède pas la même référence objet que ceux chargés à la vue
      if (index !== -1) {
        this.media.isFavoris = false;
        listFavoris.splice(index, 1);
        this.$root.saveToLocalStorage(this.media.typeMedia);
      }
    }
  },
  computed: {
    textButton: function() {
      if (this.media.isFavoris) {
        return "Supprimer";
      } else {
        return "Favoris";
      }
    }
  }
};
</script>

<style>
</style>
