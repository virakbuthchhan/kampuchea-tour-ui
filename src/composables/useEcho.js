// src/composables/useEcho.js
import { ref, onMounted, onUnmounted } from 'vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import useApi from "@/services/useApi.js";

// Make Pusher available globally
window.Pusher = Pusher

let echoInstance = null

export const useEcho = () => {
  const echo = ref(null)
  const isConnected = ref(false)
  const api = useApi();
  onMounted(() => {
    if (!echoInstance) {
      echoInstance = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        wssPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              console.log('🔐 [AUTH START] Channel:', channel.name, 'Socket ID:', socketId)

              api.registerBroadcast(socketId, channel.name)
                .then(response => {
                  console.log('✅ [AUTH SUCCESS] Raw Response:', response)
                  console.log('✅ [AUTH SUCCESS] Response Data:', response.data)

                  if (!response.data || !response.data.auth) {
                    console.error('❌ [AUTH FAIL] Missing auth in response:', response.data)
                    callback(true, { error: 'Missing auth signature' })
                    return
                  }

                  console.log('✅ [AUTH SUCCESS] Calling callback with auth:', response.data.auth)
                  callback(false, {
                    auth: response.data.auth
                  })

                  console.log('✅ [AUTH SUCCESS] Callback called')
                })
                .catch(error => {
                  console.error('❌ [AUTH ERROR] Exception:', error)
                  console.error('❌ [AUTH ERROR] Error details:', error.response?.data || error.message)

                  callback(true, {
                    error: 'Authorization failed'
                  })

                  console.log('✅ [AUTH ERROR] Callback called with error')
                })
            }
          }
        }
      })

      echoInstance.connector.pusher.connection.bind('connected', () => {
        isConnected.value = true
        console.log('✅ Echo connected to Reverb')
      })

      echoInstance.connector.pusher.connection.bind('disconnected', () => {
        isConnected.value = false
        console.log('❌ Echo disconnected')
      })
    }

    echo.value = echoInstance
  })

  onUnmounted(() => {
    // Don't disconnect — keep alive for SPA
  })

  return {
    echo,
    isConnected
  }
}
