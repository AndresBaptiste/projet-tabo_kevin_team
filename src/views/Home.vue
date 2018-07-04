<template>
  <div class="home">

  </div>
</template>

<script>
import axios from "axios";

axios
  .get("https://kitsu.io/api/edge/genres?page[limit]=10&page[offset]=0")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

export default {
  name: "home"
};
</script>
