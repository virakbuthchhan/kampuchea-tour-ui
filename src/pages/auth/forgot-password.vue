<template>
  <div class="center-div">
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
        <v-icon>mdi-lock-open-alert-outline</v-icon>
        <p class="heading-label mt-4">{{$t('page.forgotPasswordTitle')}}</p>
        <br/>
        <v-form>
          <v-text-field
            :label="$t('fields.email')"
            prepend-inner-icon="mdi-email"
            required
            autofocus
            type="email"
          />
<!--          forget password -->
          <div class="d-flex justify-end">
            <RouterLink to="/auth/login" class="text-decoration-none">{{$t('page.backToLogin')}}</RouterLink>
          </div>
          <v-btn block class="mt-4" size="large" variant="tonal">{{$t('page.continue')}}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import auth from "@/services/auth.js"
const showPassword = ref(false)
const tab = ref('verify')

const login = (provider) => {
  auth.loginWithProvider(provider);
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
  text-align: center;
}

.w-100 {
  width: 100% !important;
}
</style>
