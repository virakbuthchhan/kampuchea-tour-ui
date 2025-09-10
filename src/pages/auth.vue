<template>
  <div class="center-div">
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab value="login">មានគណនី</v-tab>
      <v-tab value="register">ចុះឈ្មោះថ្មី</v-tab>
    </v-tabs>
    <v-card class="w-100" max-width="400" variant="text">
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="login">
            <v-icon>mdi-flag-triangle</v-icon>
            <p class="heading-label mt-4">ចូលប្រើប្រាស់ប្រព័ន្ធ</p>
            <br/>
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
              <v-btn block class="mt-4" size="large" variant="tonal">ចូលគណនី</v-btn>
            </v-form>
          </v-tabs-window-item>
          <v-tabs-window-item value="register">
            <v-icon>mdi-flag-triangle</v-icon>
            <p class="heading-label mt-4">បង្កើតគណនី</p>
            <br/>
            <v-form>
              <v-text-field
                label="ឈ្មោះពេញ"
                prepend-inner-icon="mdi-account"
                required
                type="text"
              />
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
              <v-btn block class="mt-4" size="large" variant="tonal">បង្កើតគណនី</v-btn>
            </v-form>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const showPassword = ref(false)
const tab = ref('login')
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
