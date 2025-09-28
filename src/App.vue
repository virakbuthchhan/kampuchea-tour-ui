<template>
  <div class="background-layer"></div>
  <loading-dialog/>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import {useAppStore} from "@/stores/appStore";
import { useEcho } from '@/composables/useEcho'

const appStore = useAppStore();

const { echo, isConnected } = useEcho()

  //
import LoadingDialog from "@/components/dialogs/LoadingDialog.vue";

const authStore = useAuthStore()
const currentUser = computed(() => authStore.currentUser)

const snackbar = ref({
  show: false,
  message: '',
  color: 'info'
})

const getSnackbarColor = (type) => {
  switch (type) {
    case 'success': return 'green'
    case 'error': return 'red'
    case 'warning': return 'orange'
    default: return 'blue'
  }
}
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.fetchUserProfile()
    const userUuid = currentUser.value?.uuid

    if (userUuid && echo.value) {
      const channelName = `users-${userUuid}`

      // ✅ Get channel
      const channel = echo.value.private(channelName)

      // ✅ Check if already listening (simple flag)
      if (!channel.__listening) {
        channel.listen('.notification', (e) => {
          console.log('🎯 EVENT RECEIVED:', e)
        })
        channel.__listening = true // Custom flag
        console.log('✅ Listener attached for', channelName)
      } else {
        console.log('ℹ️ Already listening to', channelName)
      }
    }
  }
})

</script>
