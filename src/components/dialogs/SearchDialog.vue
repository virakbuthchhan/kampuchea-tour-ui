<template>
  <v-dialog v-model="open" max-width="500" persistent>
    <v-card class="glass-card rounded-xl">
      <v-text-field
        v-model="search"
        label="ស្វែងរក..."
        autofocus
        prepend-inner-icon="mdi-magnify"
        @keyup.enter="onSearch"
        clearable
      />
      <v-card-text class="pt-0">
        <div>
          <v-chip
            v-for="filter in filters"
            :key="filter"
            :color="selectedFilter === filter ? 'primary' : 'grey lighten-2'"
            class="ma-1"
            @click="selectFilter(filter)"
          >
            {{ filter }}
          </v-chip>
        </div>
        <div>
          <v-list class="bg-transparent">
            <v-list-item
              v-for="result in filteredResults"
              :key="result.id"
              @click="onSelect(result)"
            >
              <v-list-item-content>
                <v-list-item-title v-html="highlight(result.title)"></v-list-item-title>
                <v-list-item-subtitle v-html="highlight(result.subtitle)"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="handleClose">បោះបង់</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'
import {useSearchStore} from "@/stores/searchStore.js";
const store = useSearchStore();
const open = computed({
  get: () => store.open,
  set: (value) => store.setOpen(value)
});
const handleClose = () => {
  open.value = false;
};

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const dialog = ref(props.open)

const search = ref('')
const selectedFilter = ref('All')
const filters = ['All', 'Articles', 'Users', 'Products']
const results = ref([
  { id: 1, title: 'Vue.js Basics', subtitle: 'Learn the fundamentals of Vue.js', type: 'Articles' },
  { id: 2, title: 'John Doe', subtitle: 'Frontend Developer', type: 'Users' },
  { id: 3, title: 'Vuetify 3', subtitle: 'Material Design Framework', type: 'Products' },
  { id: 4, title: 'Advanced Vue.js', subtitle: 'Deep dive into Vue.js features', type: 'Articles' },
  { id: 5, title: 'Jane Smith', subtitle: 'UI/UX Designer', type: 'Users' },
  { id: 6, title: 'Vuetify Pro', subtitle: 'Premium Vuetify Components', type: 'Products' },
])
const filteredResults = computed(() => {
  let filtered = results.value
  if (selectedFilter.value !== 'All') {
    filtered = filtered.filter(result => result.type === selectedFilter.value)
  }
  if (search.value) {
    const searchTerm = search.value.toLowerCase()
    filtered = filtered.filter(result =>
      result.title.toLowerCase().includes(searchTerm) ||
      result.subtitle.toLowerCase().includes(searchTerm)
    )
  }
  return filtered
})
const selectFilter = (filter) => {
  selectedFilter.value = filter
}

const highlight = (text) => {
  if (!search.value) return text
  const regex = new RegExp(`(${search.value})`, 'gi')
  return text.replace(regex, '<span class="highlight">$1</span>')
}
const onSearch = () => {
  // Handle search action if needed
}
const onSelect = (result) => {
  alert(`Selected: ${result.title}`)
  dialog.value = false
}
</script>
<style scoped>
.highlight {
  background-color: yellow;
}
.glass-card{
  box-shadow: inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45),
  inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45) !important;
}
</style>
