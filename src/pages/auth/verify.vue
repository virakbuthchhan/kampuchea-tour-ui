<template>
  <div class="center-div">
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
       <div class="text-center">
         <v-icon>mdi-email-alert-outline</v-icon>
         <p class="heading-label mt-4">{{$t('page.verifyAccount')}}</p>
       </div>
        <br/>
        <v-form ref="formRef" lazy-validation @submit.prevent="onSubmit">
          <p>{{$t('page.verifyMessage')}}</p>
          <v-otp-input   v-model="form.otp"
                         :error="error"
                         autofocus
                         type="number"></v-otp-input>
          <v-btn type="submit" block class="mt-4" size="large" variant="tonal">{{$t('page.verify')}}</v-btn>
          <p class="pt-2 text-end">{{$t('page.notReceived')}} <span>{{$t('page.resendCode')}}</span></p>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useApi from "@/services/useApi";
import {useValidationRules} from "@/validations/index.js";
const formRef = ref()

const rule = useValidationRules();
const route = useRoute()
const router = useRouter()
const error = ref(null)
// form
const form = reactive({
  otp: ''
})
const token = route.query.token
onMounted(async () => {
  if (!token) {
    return router.push('/auth/login')
  }
  // verify token with api
  // const res = await useApi().checkToken(token)
  // if (!res) {
  //   return router.push('/auth/login')
  // }
})

const onSubmit = async () => {

  // form.otp is 6 digit number
  form['token'] = token
  if(form.otp.length >= 6) {
    console.log(form.otp)
  }else{
    error.value = 'Invalid OTP code'
    return;
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
