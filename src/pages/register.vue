<template>
  <div class="center-div">
    <v-icon>mdi-flag-triangle</v-icon>
    <p class="heading-label mt-4">ចូលប្រើប្រាស់ប្រព័ន្ធ</p>
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
        <v-form>
          <v-text-field
            label="អុីមែល"
            prepend-inner-icon="mdi-email"
            required
            type="email"
          />
          <v-text-field
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            label="ពាក្យសម្ងាត់"
            prepend-inner-icon="mdi-lock"
            required
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn block size="large" variant="tonal" class="mt-4">ចូលគណនី</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const showPassword = ref(false)
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
  height: 90vh;
  text-align: center;
}
</style>
