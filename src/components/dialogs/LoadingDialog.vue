<script setup>
import {ref, computed, watch} from 'vue'
import {useAppStore} from "@/stores/appStore";

const appStore = useAppStore();
const loading = computed(() => appStore.loading);
const snackbar = computed(() => appStore.snackbar);
const message = computed(() => appStore.message);
const color = computed(() => appStore.color);
</script>

<template>
  <div class="overlay" v-if="loading">
    <div class="progress-bar-top">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
  </div>
  <v-snackbar
    variant="elevated"
    :color="color"
    location="top right"
    v-model="snackbar"
    :timeout="4000"
    elevation="2"
    multi-line
  >
    {{ message }}

    <template v-slot:actions>
      <v-btn
        variant="text"
      >
        {{$t('page.close')}}
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4); /* semi-transparent */
  z-index: 9998;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.progress-bar-top {
  width: 100%;
  z-index: 9999;
  overflow: auto;
}
</style>
