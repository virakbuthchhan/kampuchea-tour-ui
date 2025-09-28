<template>
  <div class="center-div">
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
        <v-window v-model="registerWindow">
          <v-window-item>
            <div class="text-center">
              <v-icon size="x-large">mdi-account-plus-outline</v-icon>
              <p class="heading-label mt-4">{{ $t('page.registerNewAccount') }}</p>
            </div>
            <br/>
            <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
              <v-text-field
                v-model="form.first_name"
                :label="$t('fields.firstName')"
                :rules="rules.name()"
                autofocus
                type="text"
              />
              <v-text-field
                v-model="form.last_name"
                :label="$t('fields.lastName')"
                :rules="rules.name()"
                autofocus
                type="text"
              />
              <div class="d-flex justify-end">
                <RouterLink class="text-decoration-none" to="/auth/login">{{ $t('page.backToLogin') }}</RouterLink>
              </div>
              <v-btn block class="mt-4" size="large" type="submit" variant="tonal">{{ $t('page.next') }}</v-btn>
            </v-form>

          </v-window-item>
          <v-window-item>
            <div class="text-center">
              <v-icon size="x-large">mdi-calendar-lock</v-icon>
              <p class="heading-label mt-4">{{ $t('page.basicInformation') }}</p>
            </div>
            <br/>
            <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
              <div class="d-flex gap-2">
                <v-text-field
                  v-model="form.date_of_birth"
                  :label="$t('fields.day')"
                  :rules="rules.required('day')"
                  class="equal-width"
                  type="text"
                />
                <v-text-field
                  v-model="form.date_of_birth"
                  :label="$t('fields.month')"
                  :rules="rules.required('month')"
                  class="equal-width"
                  type="text"
                />
                <v-text-field
                  v-model="form.date_of_birth"
                  :label="$t('fields.year')"
                  :rules="rules.required('year')"
                  class="equal-width"
                  type="text"
                />
              </div>
              <v-select v-model="form.gender_id" :items="['Male','Female']" :label="$t('fields.gender')">

              </v-select>

              <v-btn block class="mt-4" size="large" type="submit" variant="tonal">{{ $t('page.register') }}
              </v-btn>
            </v-form>
          </v-window-item>
          <v-window-item>
            <div class="text-center">
              <v-icon size="x-large">mdi-robot-confused-outline</v-icon>
              <p class="heading-label mt-4">{{ $t('page.verifyYouAreNotRobot') }}</p>
            </div>
            <br/>
            <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
              <v-text-field
                v-model="form.email"
                :error="!!emailError"
                :error-messages="emailError"
                :label="$t('fields.email')"
                :rules="[...rules.email()]"
                prepend-inner-icon="mdi-email"
                type="email"
              />
              <v-btn block class="mt-4" size="large" type="submit" variant="tonal">{{ $t('page.sendOTP') }}
              </v-btn>
            </v-form>
          </v-window-item>
          <v-window-item>
            <div class="text-center">
              <v-icon size="x-large">mdi-robot-confused-outline</v-icon>
              <p class="heading-label mt-4">{{ $t('page.verifyEmail') }}</p>
            </div>
            <br/>
            <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
              <v-otp-input/>
              <div class="d-flex justify-end">
                <RouterLink class="text-decoration-none" to="/auth/login">{{ $t('page.resendOtp') }}
                </RouterLink>
              </div>
              <v-btn block class="mt-4" size="large" type="submit" variant="tonal">{{ $t('page.verify') }}
              </v-btn>
            </v-form>
          </v-window-item>
          <v-window-item>
            <div class="text-center">
              <v-icon size="x-large">mdi-form-textbox-password</v-icon>
              <p class="heading-label mt-4">{{ $t('page.setYourPassword') }}</p>
            </div>
            <br/>
            <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
              <v-text-field
                v-model="form.password"
                :label="$t('fields.password')"
                :rules="rules.password()"
                :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !showPassword"
              />
              <v-text-field
                v-model="form.password_confirmation"
                :label="$t('fields.confirmPassword')"
                :rules="rules.password()"
                :type="showPassword ? 'text' : 'password'"
                @click:append-inner="showPassword = !showPassword"
              />
              <v-checkbox
                v-model="form.agree"
                @click="showPassword = !showPassword"
                :label="$t('page.showPassword')"
              />
              <v-btn block class="mt-4" size="large" type="submit" variant="tonal">{{ $t('page.register') }}
              </v-btn>
            </v-form>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useValidationRules} from "@/validations";
import useApi from "@/services/useApi.js";
import {isEmail} from "@/plugins/helper.js";
import {useI18n} from 'vue-i18n'

const showPassword = ref(false)
const registerWindow = ref(4)

const {t} = useI18n()
const router = useRouter()
// === Validation ===
const rules = useValidationRules()
const formRef = ref()

// === Form State ===
const form = reactive({
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender_id: null,
  email: '',
  password: '',
  password_confirmation: '',
  agree: false,
})

const emailError = ref('')
let debounceTimeout

const checkEmailUnique = async () => {
  if (!form.email || !isEmail(form.email)) return
  const res = await useApi().checkUnique('email', form.email)
  if (!res) {
    emailError.value = t('validation.emailTaken')
  } else {
    emailError.value = ''
  }
}
// Debounce watcher for email input
watch(() => form.email, () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(checkEmailUnique, 500)
})


const onSubmit = async () => {
  formRef.value.validate();
  if (formRef.value.isValid) {
    registerWindow.value = 1
    // const {verify_token} = await useApi().registerAccount(form)
    // // push to route /verify with query param token
    // if (verify_token) {
    //   await router.push({path: '/auth/verify', query: {token: verify_token}})
    // }
  }
}

</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
}

.center-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.w-100 {
  width: 100% !important;
}

.equal-width {
  width: 100%;
}

.d-flex {
  display: flex;
  gap: 0.5rem;
}
</style>
