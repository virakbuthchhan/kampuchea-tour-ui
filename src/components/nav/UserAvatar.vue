<template>
  <v-menu min-width="200px">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <v-avatar
          image="https://avatars.githubusercontent.com/u/149345575?v=4"
          color="white"
        >
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="liquid-glass bg-transparent rounded-lg">
      <v-card-text>
        <div class="mx-auto">
          <v-btn
            block
            variant="text"
            @click="route.push('/dashboard')"
            prepend-icon="mdi-view-dashboard"
            rounded
          >
            គ្រប់គ្រងមាតិការ
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn
            variant="text"
            @click="route.push('/me')"
            block
            prepend-icon="mdi-account-reactivate-outline"
            rounded
          >
            គណនី
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn
            variant="text"
            block
            prepend-icon="mdi-connection"
            rounded
          >
            ចាកចេញ
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script setup>
import {useRouter} from 'vue-router';
const route = useRouter();
const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com',
}

</script>
