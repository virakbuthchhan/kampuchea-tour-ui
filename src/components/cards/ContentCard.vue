<template>
  <v-card
    class="mx-auto content-card liquid-glass rounded-xl">
    <v-card-item
      class="card-content-text"
      style="background-image: url('https://zone-ui.vercel.app/assets/images/travel/travel-6.webp'); background-size: cover; background-position: center; position: relative;"
      title="ទេសភាពខ្នងវាល">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          icon="mdi-clock-time-five-outline"
          size="18"
        ></v-icon>
        20 មិថុនា 2024
      </template>
      <v-row align="center" no-gutters>
        <v-col
          cols="8"
        >
          ដំណើរកំសាន្ត ១យប់ ២ថ្ងៃ ជាមួយធម្មជាតិព្រៃភ្នំ និងទឹកធ្លាក់ នៅខ្នងវាល ធ្វើអោយអារម្មណ៍ស្រស់ស្រាយ និងសុខភាពល្អ។
        </v-col>
      </v-row>
      <div class="d-flex py-3 justify-space-between">
        <v-list-item
          density="compact"
          prepend-icon="mdi-map-marker-outline"
        >
          ខេត្តកំពង់ស្ពឺ
        </v-list-item>

        <v-list-item
          density="compact"
          prepend-icon="mdi-shape-plus"
        >
          បោះតង់
        </v-list-item>
      </div>
    </v-card-item>
    <v-divider></v-divider>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn prepend-icon="mdi-book-open-outline" text="អានបន្ថែម"
             @click="router.push('/blogs/1')"
      ></v-btn>
      <v-btn append-icon="mdi-share"
             text="ចែករំលែក"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router"

const router = useRouter()
</script>
<style scoped>
.card-content-text{
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
}
.content-card{
  max-width: 400px;
}
</style>
