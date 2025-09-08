<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useTheme } from 'vuetify'

import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import {useSearchStore} from "@/stores/searchStore.js";

const router = useRouter();
const store = useSearchStore();
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // set in localStorage
  localStorage.setItem('theme', theme.global.name.value)
}

</script>

<template>
  <v-app-bar class="elevation-3 px-2">
    <template v-slot:prepend>
      <v-icon>mdi-flag-triangle</v-icon>
    </template>

    <v-app-bar-title class="ma-2">
      <span class="cursor-pointer text-bold" @click="router.push('/')">កម្ពុជា  Tour</span>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
      </v-btn>
      <v-btn prepend-icon="mdi-magnify" @click="store.setOpen(true)">
        ស្វែងរក
      </v-btn>
      <v-btn prepend-icon="mdi-login-variant" @click="router.push('/login')">
        ចូលគណនី
      </v-btn>
    </template>
  </v-app-bar>
  <SearchDialog />
</template>

<style scoped>

</style>
