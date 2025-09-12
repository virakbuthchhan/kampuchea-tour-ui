<script setup>
import {ref, computed, watch} from 'vue'
import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore();
const loading = computed(() => appStore.loading);
</script>

<template>
  <div class="overlay" v-if="loading">
    <div class="progress-bar-top">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
  </div>
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
