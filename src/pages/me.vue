<template>
  <v-container class="container-page">
    <div class="center-div">
      <div class="avatar-wrapper">
        <v-avatar
          image="https://avatars.githubusercontent.com/u/149345575?v=4"
          size="100"
        />
        <span
          class="status-badge"
          :class="statusClass"
        >
      <v-icon size="25">{{ statusIcon }}</v-icon>
    </span>
      </div>
      <p class="heading-label mt-4 mb-2">ស្វាគមន៍មកកាន់គេហទំព័ររបស់ខ្ញុំ!</p>
      <p class="mb-6">នេះគឺជាទំព័រដែលខ្ញុំបង្កើតឡើង ដើម្បីបង្ហាញពីជំនាញ និងគម្រោងរបស់ខ្ញុំ។ សូមរីករាយក្នុងការស្វែងរក!</p>
      <div class="d-flex gap-2">
        <v-btn variant="text" class="liquid-glass" rounded prepend-icon="mdi-human-greeting-proximity"
               href="https://www.facebook.com/profile.php?id=crushbuth"
               target="_blank"
        >តាមដាន</v-btn>
        <v-btn variant="text" rounded class="liquid-glass" prepend-icon="mdi-share"
               href="https://www.facebook.com/profile.php?id=crushbuth"
               target="_blank"
        >ចែករំលែក</v-btn>
        <v-btn variant="text" rounded class="liquid-glass" prepend-icon="mdi-cog-outline"
              @click="route.push('/account-setting')"
        >{{$t('page.setting')}}</v-btn>
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
import StatisticCard from "@/components/me/StatisticCard.vue";
import TableContent from "@/components/me/TableContent.vue";
import {useRouter} from "vue-router";

const route = useRouter()

const showPassword = ref(false)
const tab = ref('login')
const files = [
  {
    icon: 'mdi-human-greeting-proximity',
    subtitle: 'អ្នកតាមដាន',
    title: '200 នាក់',
  },
  {
    icon: 'mdi-note-search',
    subtitle: 'មាតិការ',
    title: '10 អត្ថបទ',
  },
]

const userStatus = 'premium' // 'premium', 'standard', 'banned', 'verified

const statusIcon = {
  verified: 'mdi-check-decagram',
  premium: 'mdi-star-david',
  standard: 'mdi-account',
  banned: 'mdi-block-helper',
}[userStatus]

const statusClass = {
  verified: 'badge-verified',
  premium: 'badge-premium',
  standard: 'badge-standard',
  banned: 'badge-banned',
}[userStatus]

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

.avatar-wrapper {
  position: relative;
  display: inline-block;
}
.status-badge {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: #fff;
  padding: 2px;
  width: 20px;
  height: 20px;
  box-shadow: 0 0 2px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
}
.badge-verified {
  color: #2196f3;
}
.badge-premium {
  color: #ffd700;
}
.badge-standard {
  color: #9e9e9e;
}
.badge-banned {
  color: #f44336;
}
</style>
