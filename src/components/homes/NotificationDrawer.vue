<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps<{
  showDrawer: boolean
}>()

const emit = defineEmits(['update:showDrawer'])
const items = [
  { type: 'subheader', title: 'Today' },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]
const drawer = computed({
  get: () => props.showDrawer,
  set: (val: boolean) => emit('update:showDrawer', val),
})

</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    :location="$vuetify?.display?.mobile ? 'bottom' : 'right'"
    width="350"
    class="liquid-glass rounded-xl notification-card"

  >
    <v-list-item class="my-2">
      <template #append>
        <v-btn icon="mdi-close" size="small" variant="text" @click="$emit('update:showDrawer', false)">
        </v-btn>
      </template>
      {{$t('page.notification')}}
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      :items="items"
      lines="three"
      item-props
    >
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.notification-card {

  box-shadow: inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45),
  inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45) !important;
}
</style>
