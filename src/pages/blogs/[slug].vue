<template>
  <v-container>
   <ImageGrid/>
    <div class="d-flex align-center justify-space-between gap-2 my-6">
      <div class="d-flex flex-column">
        <p class="heading-label mt-0 mb-2">ភ្នំខ្នងវាលខេត្តកំពង់ស្ពឺ</p>
        <div class="d-flex align-center gap-2">
          <v-avatar size="32">
            <v-img :src="postData.author.avatar" :alt="postData.author.name" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span class="text-body-2 font-weight-medium">{{ postData.author.name }}</span>
            <span class="text-caption text-medium-emphasis">{{ formatDate(postData.publishedAt) }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex gap-1">
        <v-btn
          :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
          variant="text"
          color="red"
          @click="toggleFavorite"
        />
        <v-btn
          icon="mdi-share"
          variant="text"
          color="primary"
          @click="shareContent"
        />
      </div>
    </div>
    <v-divider />
    <Overview/>
    <v-divider />
    <br/>
    <Comment />
  </v-container>
</template>

<script setup>
//
import NavBar from "@/components/NavBar.vue";
import HomeCard from "@/components/cards/HomeCard.vue";
import ContentCard from "@/components/cards/ContentCard.vue";
import ImageGrid from "@/components/blogs/ImageGrid.vue";
import Overview from "@/components/blogs/Overview.vue";
import Comment from "@/components/blogs/Comment.vue";

const isFavorite = ref(false)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  // Logic to handle favorite action (e.g., save to user profile)
  console.log(isFavorite.value ? "Added to favorites" : "Removed from favorites");
}

function shareContent() {
  // Logic to handle share action (e.g., open share dialog)
  console.log("Share button clicked");
}

const postData = ref({
  author: {
    name: "បង បុត្រ",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
  },
  publishedAt: new Date('2024-01-15T10:30:00Z')
})

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>
<style scoped>
.heading-label {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
