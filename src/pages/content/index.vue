<template>
  <v-container class="container-page">
    <h3 class="mb-4">
      <v-icon class="mr-2">mdi-draw-pen</v-icon> បង្កើតមាតិការថ្មី
    </h3>
    <content-form />
  </v-container>
</template>

<script setup>
import {useRouter} from "vue-router";
import StatisticCard from "@/components/me/StatisticCard.vue";
import TableContent from "@/components/me/TableContent.vue";
import ContentForm from "@/sections/contents/ContentForm.vue";

const showPassword = ref(false)
const tab = ref('login')
const router = useRouter()
const files = [
  {
    icon: 'mdi-calendar',
    subtitle: 'Jan 20, 2014',
    title: 'កាលបរិច្ចេទធ្វើដំណើរ',
  },
  {
    icon: 'mdi-account-circle-outline',
    subtitle: 'បង រ៉ាន់ ខ្នងវាល',
    title: 'សហគមន៍តំបន់',
  },
  {
    icon: 'mdi-map-marker-outline',
    subtitle: 'ភូមិ សូរិយា ឃុំតាសាល ស្រុកតាសាល ខេត្តកំពង់ស្ពឺ',
    title: 'ទីកន្លែង',
  },
  {
    icon: 'mdi-cellphone',
    subtitle: '096 96 40 495',
    title: 'ទំនាក់ទំនងសហគមន៍',
  },
  {
    icon: 'mdi-clock-time-four-outline',
    subtitle: '១យប់ ២ថ្ងៃ',
    title: 'រយៈពេលដំណើរកំសាន្ត',
  },
  {
    icon: 'mdi-hiking',
    subtitle: 'ឡើងភ្នំ បោះតង់ លេងទឹកធ្លាក់',
    title: 'សកម្មភាព',
  },
]

</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
}
.container-page{
  max-width: 650px;
  margin: auto;
  padding: 20px;
}
.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.w-100 {
  width: 100% !important;
}

.avatar-border {
  border: 3px solid #1976d2;
  border-radius: 50%;
  box-sizing: border-box;
}
</style>
