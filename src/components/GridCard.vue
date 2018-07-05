<template>
    <div class="gridcard">
        <div class="row">
            <div v-if="loading" class="col-lg-12" style="font-size:24px;"><div class=typewriter><h5>Loading...</h5></div></div>
            <div v-else class="col-md-4" v-for="media in listMedia" v-bind:key="media.id">
                <media-card v-bind:media="media">
                </media-card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "GridCard",
  props: ["listMedia", "loading"],
  components: {
    "media-card": Card
  }
};
</script>
