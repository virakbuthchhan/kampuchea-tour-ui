<template>
  <v-row>
    <v-col cols="12" sm="12" md="12" lg="6">
      <v-img
        src="https://picsum.photos/500/300?image=25"
        height="100%"
        cover
        lazy-src="@/assets/blur.jpg"
        class="rounded-img "
      ></v-img>
    </v-col>
    <v-col cols="12" sm="12" md="12" lg="6">
      <v-row>
        <v-col cols="6">
          <v-img
            src="https://picsum.photos/500/300?image=25"
            height="100%"
            cover
            lazy-src="@/assets/blur.jpg"
            class="rounded-img "
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://picsum.photos/500/300?image=26"
            height="100%"
            cover
            lazy-src="@/assets/blur.jpg"
            class="rounded-img "
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://picsum.photos/500/300?image=25"
            height="100%"
            cover
            lazy-src="@/assets/blur.jpg"
            class="rounded-img "
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://picsum.photos/500/300?image=26"
            height="100%"
            cover
            lazy-src="@/assets/blur.jpg"
            class="rounded-img "
          ></v-img>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script setup>

</script>
<style scoped>
  .rounded-img {
    border-radius: 12px;
  }
</style>
