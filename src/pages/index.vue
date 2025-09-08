<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
      <HomeCard />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <HomeCard />
      </v-col>
    </v-row>
   <div class="d-flex align-center gap-2 my-6">
      <v-icon size="28">mdi-flag</v-icon>
      <p class="heading-label mt-0 mb-0">កន្លែងដើរលេង</p>
    </div>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
    </v-row>
    <div class="d-flex align-center gap-2 my-6">
      <v-icon size="28">mdi-flag</v-icon>
      <p class="heading-label mt-0 mb-0">កន្លែងដើរលេង</p>
    </div>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
    </v-row>
    <div class="d-flex align-center gap-2 my-6">
      <v-icon size="28">mdi-flag</v-icon>
      <p class="heading-label mt-0 mb-0">កន្លែងដើរលេង</p>
    </div>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <ContentCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  //
import NavBar from "@/components/NavBar.vue";
  import HomeCard from "@/components/cards/HomeCard.vue";
  import ContentCard from "@/components/cards/ContentCard.vue";
</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
}
.gap-2{
  gap: 0.5rem;
}
</style>
