<script setup>
const topics = [
  '🎤 Advice',
  '🐕 Animals',
  '🤖 Anime',
  '🎨 Art & Design',
  '💄 Beauty',
  '🏢 Business',
  '📚 Books',
  '💡 Damn That\'s Interesting',
  '💃 Hobbies',
  '🎮 Gaming',
  '🎥 Movies',
  '🎵 Music',
  '📺 TV',
  '🌮 Food',
  '😂 Funny',
  '💖 Health & Lifestyle',
  '🎓 School',
  '📰 News',
  '🌲 Nature',
  '🎨 Photography',
  '🎏 Sports',
]
</script>

<template>
  <div class="home-hero d-flex flex-column justify-center align-center">
    <h1 class="hero-text">កម្ពុជាសូមស្វាគមន៍</h1>
    <p class="hero-subtext">ស្វែងរកកន្លែងដើរលេងថ្មីៗ និងទទួលបានបទពិសោធន៍ដ៏អស្ចារ្យនៅក្នុងប្រទេសកម្ពុជា</p>
  </div>
  <br>
  <v-divider></v-divider>
  <br/>
  <p class="text-center">ស្វែងរកតាមតំបន់</p>
  <v-chip-group class="mt-3" column>
    <v-chip
      class="liquid-glass"
      v-for="topic in topics"
      :key="topic"
      :text="topic"
      :value="topic"
    ></v-chip>
  </v-chip-group>
  <br/>
</template>
<style scoped>
.hero-text{
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
