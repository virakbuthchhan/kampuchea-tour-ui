<template>
  <div class="background-layer"></div>
  <loading-dialog/>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <div class=""></div>
  </v-app>
</template>

<script setup>
  //
import LoadingDialog from "@/components/dialogs/LoadingDialog.vue";
</script>
