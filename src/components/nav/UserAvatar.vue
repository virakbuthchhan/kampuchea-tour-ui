<template>
  <v-menu min-width="200px">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
      >
        <v-avatar
          :image="data.avatar"
          color="primary"
        >
          <span>{{getInitials(data.full_name)}}</span>
        </v-avatar>
      </v-btn>
    </template>
<!--    username -->
    <v-card class="liquid-glass rounded-xl">
      <v-card-text>
        <p class="text-center py-2">{{data.full_name}}</p>
        <v-divider></v-divider>
        <div class="mx-auto">
          <v-list variant="plain" class="bg-transparent" density="comfortable">
            <v-list-item  @click="route.push('/dashboard')">
             <template #prepend>
               <v-icon>mdi-view-dashboard</v-icon>
             </template>
              <v-list-item-title>
                {{$t('page.manageContent')}}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="route.push('/me')">
              <template #prepend>
                <v-icon>mdi-account-reactivate-outline</v-icon>
              </template>
              <v-list-item-title>
                {{$t('page.profile')}}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <template #prepend>
                <v-icon>mdi-connection</v-icon>
              </template>
              <v-list-item-title>
                {{$t('page.logout')}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/useAuthStore";

import type {UserProfile} from "@/types";
import {getInitials} from "@/plugins/helper";

const route = useRouter();
const authStore = useAuthStore();
const {logout} = authStore;

// props data
defineProps<{
  data: UserProfile
}>();
</script>

<style scoped>

.liquid-glass {
  background-color: rgba(255, 255, 255, 0.2) !important;

  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px);

  border: 0 solid rgba(255, 255, 255, 0.1) !important;


  box-shadow: inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45),
  inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45) !important;

  transition: all 0.3s ease-in-out !important;
}

</style>
