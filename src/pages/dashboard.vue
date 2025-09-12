<template>
  <v-container class="container-page">
    <div class="center-div">
      <v-avatar
        image="https://avatars.githubusercontent.com/u/149345575?v=4" size="100">
      </v-avatar>
      <p class="heading-label mt-4 mb-2">សួស្ដី បុត្រ</p>
      <br/>
      <div class="d-flex gap-2">
        <v-btn variant="text" class="liquid-glass" rounded prepend-icon="mdi-pencil"
               @click="router.push('/content')"
               target="_blank"
        >បង្កើតមាតិការ</v-btn>
        <v-btn variant="text" rounded class="liquid-glass" prepend-icon="mdi-account-circle"
               href="https://www.facebook.com/profile.php?id=crushbuth"
               target="_blank"
        >គណនី</v-btn>
      </div>
    </div>
    <br/>
    <v-row>
      <v-col v-for="file in files"  :key="file.title"
             cols="12" md="6" sm="12">
        <v-list lines="two" class="liquid-glass rounded-xl">
          <v-list-item
            :subtitle="file.subtitle"
            :title="file.title"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon>{{ file.icon }}</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <StatisticCard/>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <StatisticCard/>
      </v-col>
    </v-row>
    <p class="heading-label mt-4 mb-2">មាតិការរបស់អ្នក</p>
    <TableContent/>
  </v-container>
</template>

<script setup>
import {useRouter} from "vue-router";
import StatisticCard from "@/components/me/StatisticCard.vue";
import TableContent from "@/components/me/TableContent.vue";

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
