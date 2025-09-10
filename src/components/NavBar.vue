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
  <v-app-bar class="elevation-3 px-2 liquid-glass2">
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
      <template v-if="$vuetify.display.mobile">
        <v-btn icon @click="store.setOpen(true)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon @click="router.push('/auth')">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </template>
     <template v-else>
       <v-btn prepend-icon="mdi-magnify" @click="store.setOpen(true)">
         <span class="btn-text">ស្វែងរក</span>
       </v-btn>
       <v-btn prepend-icon="mdi-login-variant" @click="router.push('/auth')">
         <span class="btn-text">ចូលគណនី</span>
       </v-btn>
     </template>
    </template>
  </v-app-bar>
  <SearchDialog />
</template>

<style scoped>
.liquid-glass2 {
  background-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
</style>
