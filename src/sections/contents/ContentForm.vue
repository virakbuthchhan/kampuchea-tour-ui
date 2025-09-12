<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-text-field label="ចំណងជើង"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea label="បរិយាយ"/>
      </v-col>
      <v-col cols="12">
        <v-textarea label="រំលេច"/>
      </v-col>
      <v-col cols="12">
        <v-select label="សេវាកម្មសហគមន៍"></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea label="ផ្សេងៗ"/>
      </v-col>
      <v-col cols="12">
        <v-select label="ទិដ្ឋភាពទូទៅ"></v-select>
      </v-col>
      <v-col cols="12">
        <v-file-upload density="compact" title="រូបភាពភ្ជាប់" subtitle="hello " rounded class="rounded-xl border-0 liquid-glass"></v-file-upload>
      </v-col>
      <v-col cols="12">
        <v-select label="ស្លាកសំគាល់"></v-select>
      </v-col>
    </v-row>
    <div class="d-flex gap-2 my-10 justify-end">
      <v-btn rounded variant="text">បោះបង់</v-btn>
      <v-btn prepend-icon="mdi-content-save-alert" rounded class="liquid-glass" variant="text">ព្រាងទុក</v-btn>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const panel = ref(['foo', 'bar', 'baz'])
function all () {
  panel.value = ['foo', 'bar', 'baz']
}
function none () {
  panel.value = []
}
</script>
