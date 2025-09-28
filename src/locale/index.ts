import { createI18n } from 'vue-i18n'
import en from "@/locale/lang/en"
import km from "@/locale/lang/km"


// Key for localStorage
const LOCALE_STORAGE_KEY = 'app-locale'

// Get saved locale or fallback to 'km'
const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) || 'km'

// Create i18n instance
const i18n = createI18n({
  legacy: false, // IMPORTANT: use Composition API mode
  locale: savedLocale, // ← persisted locale
  fallbackLocale: 'en',
  messages: {
    km,
    en
  }
})

// Export composable for switching locale anywhere
export const useLocale = () => {
  const { locale } = i18n.global

  const setLocale = (newLocale: 'km' | 'en') => {
    locale.value = newLocale
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale) // persist
  }

  return {
    locale,
    setLocale
  }
}

export default i18n
