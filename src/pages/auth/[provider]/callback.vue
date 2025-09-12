<template>
  <div class="center-div">
    <template v-if="loading">
      <v-card class="w-100" max-width="400" variant="text">
        <v-card-text>
          <v-progress-circular indeterminate></v-progress-circular>
          <p class="heading-label mt-4">ជិតបានហើយ! ចាំតិចទៀត...</p>
        </v-card-text>
      </v-card>
    </template>
<!--    error message-->
    <template v-else-if="error">
      <v-card class="w-100" max-width="400" variant="text">
        <v-card-text>
          <v-icon color="red" size="64">mdi-alert-circle</v-icon>
          <p class="heading-label mt-4 mb-2">មានបញ្ហាអ្វីមួយ!</p>
          <p class="mb-6">{{ error }}</p>
          <v-btn variant="text" @click="router.push('/auth')">ទៅទំព័រចូល</v-btn>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <v-card class="w-100" max-width="400" variant="text">
        <v-card-text>
          <v-icon color="green" size="64">mdi-check-circle</v-icon>
          <p class="heading-label mt-4 mb-2">ជោគជ័យ!</p>
          <p class="mb-6">អ្នកបានចូលប្រព័ន្ធដោយជោគជ័យ។ កំពុងបញ្ជូនទៅទំព័រដើម...</p>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from "@/services/auth.js"


const error = ref(null);
const user = ref(null);
const router = useRouter();
const loading = ref(false)


onMounted(() => {
  const provider = router.currentRoute.value.params.provider;
  const urlParams = new URLSearchParams(window.location.search);
 // get all url query parameters
  const allParams = Object.fromEntries(urlParams.entries());
  console.log('All URL Parameters:', allParams);
  const code = urlParams.get('code');
  // const code = router.currentRoute.value.query.code;
  if (provider && code) {
    loading.value = true
    auth.handleCallback(provider,allParams)
      .then(response => {
        // user.value = response.data.user;
        console.log(response);
        // Redirect to dashboard or home page after successful login
        router.push('/');
      })
      .catch(err => {
        error.value = 'Authentication failed. Please try again.';
        console.error(err);
      })
      .finally(() => {
        loading.value = false
      });
  } else {
    error.value = 'No provider specified.';
    console.error('No provider or code specified in the URL.');
    router.push('/auth');
  }
})

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
