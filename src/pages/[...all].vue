<template>
  <div class="center-div">
    <v-icon size="64">mdi-emoticon-devil-outline</v-icon>
    <p class="heading-label mt-4 mb-2">រកមិនឃើញអ្វីទេ!</p>
    <p class="mb-6">អធ្យាស្រ័យបង! កន្លែងនេះអត់មានអ្វីទេ ទៅទំព័រដើមវិញទៅ 👌</p>
    <v-btn variant="text" @click="goHome">ទៅទំព័រដើម</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
}

.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
}
</style>
