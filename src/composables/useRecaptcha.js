// composables/useRecaptcha.js
import {useReCaptcha} from 'vue-recaptcha-v3'

export function useRecaptcha() {
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

  const recaptcha = async (action) => {
    // (optional) Wait until recaptcha has been loaded.
    await recaptchaLoaded()

    // Execute reCAPTCHA with action "login".
    // Do stuff with the received token.
    return await executeRecaptcha(action)
  }

  return {
    recaptcha
  }
}
