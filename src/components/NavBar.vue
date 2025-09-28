<script setup lang="ts">
import { ref,watch } from 'vue'
import { useRouter } from "vue-router";
import { useTheme } from 'vuetify'
import {useSearchStore} from "@/stores/searchStore.js";
import { useLocale } from '@/locale'

import {useAuthStore} from "@/stores/useAuthStore";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import UserAvatar from "@/components/nav/UserAvatar.vue";
import NotificationDrawer from "@/components/homes/NotificationDrawer.vue";

const { locale, setLocale } = useLocale()

// Reactive binding for v-model
const currentLocale = ref(locale.value)

// Watch for changes and persist
watch(currentLocale, (newLocale) => {
  setLocale(newLocale)
})


const router = useRouter();
const store = useSearchStore();
const authStore = useAuthStore()
const {isAuthenticated,user} = authStore;
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // set in localStorage
  localStorage.setItem('theme', theme.global.name.value)
}

// toggle notification
const showNotificationDrawer = ref(false)
const toggleNotificationDrawer = () => {
  showNotificationDrawer.value = !showNotificationDrawer.value
}
</script>

<template>
  <v-app-bar class="elevation-0 px-2 liquid-glass">
    <template v-slot:prepend>
      <v-icon>mdi-flag-triangle</v-icon>
    </template>

    <v-app-bar-title class="ma-2">
      <span class="cursor-pointer text-bold no-select" @click="router.push('/')">កម្ពុជា  Tour</span>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        icon
        class="mx-1 text-h5"
        @click="setLocale(locale === 'km' ? 'en' : 'km')"
      >
        {{ locale === 'km' ? '🇰🇭' : '🇬🇧' }}
      </v-btn>
<!--      <v-btn icon @click="toggleTheme">-->
<!--        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>-->
<!--      </v-btn>-->
      <template v-if="$vuetify.display.mobile">
        <v-btn icon @click="store.setOpen(true)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <template v-if="!isAuthenticated">
          <v-btn icon @click="router.push('/auth/login')">
            <v-icon>mdi-login-variant</v-icon>
          </v-btn>
        </template>
      </template>
     <template v-else>
       <v-btn prepend-icon="mdi-magnify" @click="store.setOpen(true)">
         <span class="btn-text">{{$t('page.search')}}</span>
       </v-btn>
       <template v-if="!isAuthenticated">
         <v-btn prepend-icon="mdi-login-variant" @click="router.push('/auth/login')">
           <span class="btn-text">{{$t('page.login')}}</span>
         </v-btn>
       </template>
     </template>
      <template v-if="isAuthenticated">
        <v-btn icon @click="toggleNotificationDrawer">
          <v-badge location="top right" color="error" dot>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
        <user-avatar :data="user"/>
      </template>
    </template>
  </v-app-bar>
  <SearchDialog />
  <NotificationDrawer :show-drawer="showNotificationDrawer" @update:show-drawer="toggleNotificationDrawer"/>
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
