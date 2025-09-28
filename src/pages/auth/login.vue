<template>
  <div class="center-div">
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
      <div class="text-center">
        <v-icon size="x-large">mdi-lock-check-outline</v-icon>
        <p class="heading-label mt-4">{{$t('page.loginTitle')}}</p>
      </div>
        <br/>
        <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
          <v-text-field
            :label="$t('fields.email')"
            prepend-inner-icon="mdi-email"
            required
            autofocus
            type="email"
            autocomplete="username"
            :rules="[...rules.email()]"
            v-model="form.email"
          />
          <v-text-field
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('fields.password')"
            prepend-inner-icon="mdi-lock"
            required
            v-model="form.password"
            autocomplete="current-password"
            :rules="rules.required('password')"
            @click:append-inner="showPassword = !showPassword"
          />
<!--          forget password -->
          <div class="d-flex justify-end">
            <RouterLink to="/auth/forgot-password" class="text-decoration-none">{{$t('page.forgotPassword')}}</RouterLink>
          </div>
          <v-btn block type="submit" class="mt-4" size="large" variant="tonal">{{$t('page.login')}}</v-btn>
        </v-form>
        <br/>
        <v-divider>{{$t('page.loginVia')}}</v-divider>
        <v-btn block class="mt-4" size="large" @click="login('register')" variant="outlined" prepend-icon="mdi-account-plus-outline">{{$t('page.registerTitle')}}</v-btn>
        <div class="d-flex justify-center">
          <v-btn icon="mdi-github" class="mt-4" size="large" @click="login('github')" variant="text"></v-btn>
          <v-btn icon="mdi-google" class="mt-4" size="large" @click="login('google')" variant="text"></v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useRecaptcha} from '@/composables/useRecaptcha'
import auth from "@/services/auth.js"
import {useValidationRules} from "@/validations";
import useApi from "@/services/useApi";
import {useAuthStore} from '@/stores/useAuthStore';


const { recaptcha } = useRecaptcha()

const rules = useValidationRules();
const showPassword = ref(false)
const tab = ref('verify')
const router = useRouter();
const login = (provider:'github'|'google'|'email'|'register') => {
  // email
  if(provider==='email'){
    router.push('/auth/login')
    return;
  }
  if(provider==='register'){
    router.push('/auth/register')
    return;
  }
  auth.loginWithProvider(provider);
}


// === Form State ===
const form = reactive({
  email: '',
  password: '',
  g_recaptcha_token: '',
})
const formRef = ref()


const onSubmit = async () => {
  formRef.value.validate();
  if (formRef.value.isValid) {
    form.g_recaptcha_token = await recaptcha('login')
    await useApi().loginAccount(form)
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

</style>
