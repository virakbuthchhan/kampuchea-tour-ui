<template>
  <v-container class="container-page">
    <div>
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
    <v-tabs
      v-model="tab"
      align-tabs="start"
    >
      <v-tab :value="1" prepend-icon="mdi-account">{{$t('page.personalInfo')}}</v-tab>
      <v-tab :value="2" prepend-icon="mdi-lock-outline">{{$t('page.security')}}</v-tab>
      <v-tab :value="3" prepend-icon="mdi-devices">{{$t('page.device')}}</v-tab>
      <v-tab :value="4" prepend-icon="mdi-clock-time-ten-outline">{{$t('page.log')}}</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="n in 4"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                height="205"
                cover
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup>

import {useRouter} from "vue-router";

const route = useRouter()
const tab = ref(null)
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
</style>
