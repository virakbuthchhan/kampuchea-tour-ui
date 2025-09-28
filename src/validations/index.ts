
import { useI18n } from 'vue-i18n'

export function useValidationRules() {
  const { t } = useI18n()

  // Format message with field name
  const msg = (key: string, fieldName?: string, params: Record<string, any> = {}) => {
    if (fieldName) {
      return t(`validations.${key}`, { field: t(`fields.${fieldName}`), ...params })
    }
    return t(`validations.${key}`, params)
  }

  // === RULES ===

  const required = (fieldName: string) => [
    (v: any) => (!!v || v === 0) ? true : msg('required', fieldName)
  ]

  // const required = (fieldName: string) => [
  //   (v: any) => !!v || v === 0 || msg('required', fieldName)
  // ]

  const email = () => [
    (v: string) => /.+@.+\..+/.test(v) || msg('email')
  ]

  const minLength = (fieldName: string, min: number) => (v: string) =>
    (v && v.length >= min) || msg('min', fieldName, { min })

  const maxLength = (fieldName: string, max: number) => (v: string) =>
    !v || v.length <= max || msg('max', fieldName, { max })

  const sameAs = (target: () => string) => (v: string) =>
    v === target() || msg('sameAs')

  const numeric = (fieldName: string) => (v: string) =>
    /^\d+$/.test(v) || msg('numeric', fieldName)

  const url = (fieldName: string) => (v: string) =>
    /^https?:\/\/.+\..+/.test(v) || msg('url', fieldName)

  const phone = () => (v: string) =>
    /^[\+]?[0-9]{1,4}[\s.-]?[0-9]{7,}$/.test(v) || msg('phone')

  const checked = () => (v: boolean) =>
    v === true || msg('checked')

  const selected = (fieldName: string) => (v: any) =>
    !!v || msg('selected', fieldName)

  // === ASYNC RULE (simulate API) ===
  const asyncEmailNotTaken = () => [
    async (v: string) => {
      if (!v || !/.+@.+\..+/.test(v)) return true
      await new Promise(r => setTimeout(r, 1000))
      const taken = ['taken@example.com', 'admin@km.com']
      return !taken.includes(v) || msg('asyncEmail')
    }
  ]
  const strongPassword = (fieldName: string) => (v: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v) ||
    msg('strongPassword', fieldName)

  const otp6Digit = (fieldName: string) => (v: string) =>
    /^\d{6}$/.test(v) || msg('otp6Digit', fieldName)


  // === PRESETS ===

  const password = (min = 8) => [
    required('password'),
    minLength('password', min),
    strongPassword('password')
  ]

  const name = () => [
    required('name'),
    minLength('name', 3),
    maxLength('name', 50)
  ]

  const age = () => [
    required('age'),
    numeric('age')
  ]

  const website = () => [
    required('website'),
    url('website')
  ]

  const phoneRules = () => [
    required('phone'),
    phone()
  ]

  const country = () => [
    selected('country')
  ]

  const terms = () => [
    checked()
  ]

  return {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
    numeric,
    url,
    phone,
    checked,
    selected,
    asyncEmailNotTaken,
    otp6Digit,

    // Presets
    password,
    name,
    age,
    website,
    phoneRules,
    country,
    terms
  }
}
