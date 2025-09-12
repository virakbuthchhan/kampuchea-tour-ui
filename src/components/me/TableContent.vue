<template>
  <v-table
    class="liquid-glass bg-transparent rounded-xl"
    height="600px"
    fixed-header
  >
    <thead class="bg-transparent">
    <tr>
      <th class="text-left bg-transparent">
        មាតិការ
      </th>
      <th class="text-left bg-transparent" width="40%">
        ចំណាប់អារម្មណ៍
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in desserts"
      :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>
        <v-chip prepend-icon="mdi-eye" variant="text">
          {{ item.calories }}
        </v-chip>
        <v-chip prepend-icon="mdi-thumb-up" variant="text">
          {{ item.calories }}
        </v-chip>
        <v-chip prepend-icon="mdi-comment" variant="text">
          {{ item.calories }}
        </v-chip>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
<script setup>
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>
