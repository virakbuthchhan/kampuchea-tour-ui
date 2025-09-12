<template>
  <v-card
    class="mx-auto content-card liquid-glass rounded-xl">
    <v-card-item
      class="card-content-text"
      style="background-image: url('https://zone-ui.vercel.app/assets/images/travel/travel-6.webp'); background-size: cover; background-position: center; position: relative; height: 230px;">
      <template v-slot:title>
        <v-chip
          class="ma-2 liquid-glass rounded-xl"
          label
        >
          ទេសភាពខ្នងវាល
        </v-chip>
      </template>
      <br/><br/><br/><br/>
      <div class="d-flex pt-10 justify-space-between">
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
    <v-card-text>
      <div class="d-flex flex-wrap justify-space-between">
        <div>
          <v-icon
            class="me-1 pb-1"
            icon="mdi-draw-pen"
            size="16"
          ></v-icon>
          បុត្រ
        </div>
        <div>
          <v-icon
            class="me-1 pb-1"
            icon="mdi-clock-time-five-outline"
            size="16"
          ></v-icon>
          20 មិថុនា 2024
        </div>
      </div>
      <h2>ទេសភាពខ្នងវាល</h2>
      <p class="mt-2 subtitle">ដំណើរកំសាន្ត ១យប់ ២ថ្ងៃ ជាមួយធម្មជាតិព្រៃភ្នំ និងទឹកធ្លាក់ នៅខ្នងវាល ធ្វើអោយអារម្មណ៍ស្រស់ស្រាយ និងសុខភាពល្អ។</p>
    </v-card-text>
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
.subtitle{
  font-size: 1rem;
}
</style>
