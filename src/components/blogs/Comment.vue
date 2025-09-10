<template>
  <div class="d-flex align-center justify-space-between mb-4">
    <p class="heading-label">បញ្ចេញមតិ ({{ comments.length }})</p>
    <v-btn
      @click="showCommentForm = !showCommentForm"
      prepend-icon="mdi-comment-plus"
      variant="text"
    >
      សរសេរមតិ
    </v-btn>
  </div>
  <section class="comment-section mx-auto">
    <!-- Comment Form -->
    <template v-if="showCommentForm">
      <v-textarea
        v-model="newComment"
        label="សូមសរសេមតិរបស់អ្នក..."
        rows="3"
        autofocus
        variant="outlined"
        hide-details
      />
      <v-spacer />
      <div class="d-flex ga-4 justify-end mt-2">
        <v-btn @click="cancelComment" variant="text">បោះបង់</v-btn>
        <v-btn @click="addComment" color="primary" :disabled="!newComment.trim()">
          រួចរាល់
        </v-btn>
      </div>
    </template>
    <!-- Comment list -->
    <div v-if="comments.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="mb-4"
      >
        <div class="d-flex align-center gap-2">
          <v-avatar size="32">
            <v-img :src="comment.avatar" :alt="comment.author" />
          </v-avatar>
          <div class="d-flex flex-column">
            <span class="text-body-2 font-weight-medium">{{ comment.author }}</span>
            <span class="text-caption text-medium-emphasis">{{ formatTime(comment.timestamp) }}</span>
          </div>
        </div>
        <p class="comment-content mb-3">{{ comment.content }}</p>

        <!-- Reactions and Reply Button -->
        <div class="d-flex align-center gap-3 mb-2">
          <!-- Existing Reactions -->
          <div class="d-flex gap-1">
            <v-chip
              v-for="[emoji, users] in Object.entries(comment.reactions || {})"
              :key="emoji"
              size="small"
              class="reaction-chip mx-1"
              :color="users.includes(currentUser) ? 'primary' : 'default'"
              :variant="users.includes(currentUser) ? 'elevated' : 'outlined'"
              @click="toggleReaction(comment.id, emoji)"
            >
              <span class="me-1">{{ emoji }}</span>
              <span class="text-caption">{{ users.length }}</span>
            </v-chip>
          </div>

          <!-- Emoji Picker Button -->
          <v-menu location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                size="small"
                icon
                v-bind="props"
                variant="text"
              >
                😊
              </v-btn>
            </template>

            <v-card>
              <v-card-item>
                <div
                  v-for="emoji in emojiOptions"
                  :key="emoji"
                  class="emoji-btn"
                  @click="toggleReaction(comment.id, emoji)"
                >
                  {{ emoji }}
                </div>
              </v-card-item>
            </v-card>
          </v-menu>


          <!-- Reply Button -->
          <v-btn
            size="small"
            variant="text"
            @click="toggleReply(comment.id)"
            prepend-icon="mdi-reply"
          >
            ឆ្លើយតប
          </v-btn>
        </div>
        <!-- Reply Input -->
        <div v-if="replyingTo === comment.id" class="mt-3">
          <div class="d-flex gap-2">
            <v-avatar size="32">
              <v-img src="https://picsum.photos/40/40?random=99" alt="You"></v-img>
            </v-avatar>
            <div class="flex-grow-1">
              <v-textarea
                v-model="replyText"
                :placeholder="`ឆ្លើយតបទៅ ${comment.author}...`"
                variant="outlined"
                rows="2"
                autofocus
                no-resize
                hide-details
              ></v-textarea>
              <div class="d-flex justify-end gap-2 my-2">
                <v-btn
                  size="small"
                  variant="text"
                  @click="cancelReply"
                >
                  បោះបង់
                </v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  :disabled="!replyText.trim()"
                  @click="addReply(comment.id)"
                >
                  តបមតិនេះ
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Replies -->
        <div v-if="comment.replies && comment.replies.length > 0">
          <div
            v-for="reply in comment.replies"
            :key="reply.id"
            class="reply-comment"
          >
            <v-divider></v-divider>
            <br/>
            <div class="d-flex align-center gap-2">
              <v-avatar size="32">
                <v-img :src="reply.avatar" :alt="reply.author" />
              </v-avatar>
              <div class="d-flex flex-column">
                <span class="text-body-2 font-weight-medium">{{ reply.author }}</span>
                <span class="text-caption text-medium-emphasis">{{ formatTime(reply.timestamp) }}</span>
              </div>
            </div>
            <p class="comment-content mb-3">{{ reply.content }}</p>
            <div class="flex-grow-1">
              <!-- Reply Reactions -->
              <div class="d-flex align-center gap-2">
                <div class="d-flex gap-1">
                  <v-chip
                    v-for="[emoji, users] in Object.entries(reply.reactions || {})"
                    :key="emoji"
                    size="x-small"
                    class="reaction-chip mx-1"
                    :color="users.includes(currentUser) ? 'primary' : 'default'"
                    :variant="users.includes(currentUser) ? 'elevated' : 'outlined'"
                    @click="toggleReaction(comment.id, emoji, true, reply.id)"
                  >
                    <span class="me-1">{{ emoji }}</span>
                    <span class="text-caption">{{ users.length }}</span>
                  </v-chip>
                </div>

                <v-menu location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      size="small"
                      icon
                      v-bind="props"
                      variant="text"
                    >
                      😊
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-item>
                      <div
                        v-for="emoji in emojiOptions"
                        :key="emoji"
                        class="emoji-btn"
                        @click="toggleReaction(comment.id, emoji, true, reply.id)"
                      >
                        {{ emoji }}
                      </div>
                    </v-card-item>
                  </v-card>
                </v-menu>
              </div>
            </div>
          </div>
        </div>
        <v-divider class="my-2"></v-divider>
      </div>
    </div>
    <div v-else>
      <p class="text-center">មិនមានមតិទេ។ ជួយបញ្ចេញមតិដំបូង!</p>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue';
const showCommentForm = ref(false);
const newComment = ref('');
const initialComments = [
  {
    id: 1,
    author: 'John Doe',
    avatar: 'https://picsum.photos/40/40?random=1',
    content: 'This eco tour sounds amazing! I love the combination of hiking and cultural immersion.',
    timestamp: new Date('2024-01-15T10:30:00'),
    reactions: {
      '👍': ['user1', 'user2'],
      '❤️': ['user3'],
      '🔥': ['user1', 'user4', 'user5']
    },
    replies: [
      {
        id: 11,
        author: 'Jane Smith',
        avatar: 'https://picsum.photos/40/40?random=2',
        content: 'I agree! The waterfall activity looks particularly exciting.',
        timestamp: new Date('2024-01-15T11:00:00'),
        reactions: {
          '👍': ['user1'],
          '💯': ['user2', 'user3']
        }
      }
    ]
  },
  {
    id: 2,
    author: 'Mike Johnson',
    avatar: 'https://picsum.photos/40/40?random=3',
    content: 'Has anyone been on this tour before? I\'d love to hear about your experience!',
    timestamp: new Date('2024-01-14T15:45:00'),
    reactions: {
      '🤔': ['user1', 'user2'],
      '👍': ['user4']
    },
    replies: []
  },
  {
    id: 3,
    author: 'Sarah Wilson',
    avatar: 'https://picsum.photos/40/40?random=4',
    content: 'The community services included are really comprehensive. Great value for the experience!',
    timestamp: new Date('2024-01-13T09:20:00'),
    reactions: {
      '👏': ['user1', 'user3', 'user5'],
      '❤️': ['user2']
    },
    replies: []
  }
];

const comments = ref(initialComments);
const replyingTo = ref(null);
const replyText = ref('');
const showEmojiPicker = ref(null);
const currentUser = ref('currentUser');

// Custom emoji options
const emojiOptions = [
  '👍', '👎', '❤️', '😂', '😮', '😢', '😡', '🔥', '💯', '🎉', '🤔', '👏', '🙌', '💪', '✨'
];


const cancelComment = () => {
  newComment.value = '';
  showCommentForm.value = false;
};

const toggleReaction = (commentId, emoji, isReply = false, replyId = null) => {
  const commentIndex = comments.value.findIndex(c => c.id === commentId);
  if (commentIndex === -1) return;

  if (isReply && replyId) {
    // Handle reply reaction
    const replyIndex = comments.value[commentIndex].replies.findIndex(r => r.id === replyId);
    if (replyIndex !== -1) {
      const reply = comments.value[commentIndex].replies[replyIndex];
      if (!reply.reactions) reply.reactions = {};

      if (reply.reactions[emoji]) {
        if (reply.reactions[emoji].includes(currentUser.value)) {
          reply.reactions[emoji] = reply.reactions[emoji].filter(u => u !== currentUser.value);
          if (reply.reactions[emoji].length === 0) {
            delete reply.reactions[emoji];
          }
        } else {
          reply.reactions[emoji].push(currentUser.value);
        }
      } else {
        reply.reactions[emoji] = [currentUser.value];
      }
    }
  } else {
    // Handle comment reaction
    const comment = comments.value[commentIndex];
    if (!comment.reactions) comment.reactions = {};

    if (comment.reactions[emoji]) {
      if (comment.reactions[emoji].includes(currentUser.value)) {
        comment.reactions[emoji] = comment.reactions[emoji].filter(u => u !== currentUser.value);
        if (comment.reactions[emoji].length === 0) {
          delete comment.reactions[emoji];
        }
      } else {
        comment.reactions[emoji].push(currentUser.value);
      }
    } else {
      comment.reactions[emoji] = [currentUser.value];
    }
  }

  showEmojiPicker.value = null;
};

const toggleReply = (commentId) => {
  replyingTo.value = replyingTo.value === commentId ? null : commentId;
  if (replyingTo.value === null) {
    replyText.value = '';
  }
};

// Methods
const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return timestamp.toLocaleDateString();
};

const generateId = () => Date.now() + Math.random();

const addComment = () => {
  if (!newComment.value.trim()) return;

  const comment = {
    id: generateId(),
    author: 'You',
    avatar: 'https://picsum.photos/40/40?random=99',
    content: newComment.value,
    timestamp: new Date(),
    reactions: {},
    replies: []
  };

  comments.value.unshift(comment);
  newComment.value = '';
};

const cancelReply = () => {
  replyingTo.value = null;
  replyText.value = '';
};

const addReply = (commentId) => {
  if (!replyText.value.trim()) return;

  const reply = {
    id: generateId(),
    author: 'You',
    avatar: 'https://picsum.photos/40/40?random=99',
    content: replyText.value,
    timestamp: new Date(),
    reactions: {}
  };

  const commentIndex = comments.value.findIndex(c => c.id === commentId);
  if (commentIndex !== -1) {
    comments.value[commentIndex].replies.push(reply);
  }

  replyText.value = '';
  replyingTo.value = null;
};
</script>
<style scoped>
.heading-label {
  font-size: 1.2rem;
  font-weight: 500;
}

.comment-section {
  max-width: 800px;
}

.reaction-chip {
  cursor: pointer;
  transition: all 0.2s ease;
}
.reaction-chip:hover {
  transform: translateY(-1px);
}

.emoji-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2px;
}
.emoji-btn:hover {
  background: #f5f5f5;
  transform: scale(1.1);
}
.comment-content {
  line-height: 1.6;
}
.fade-transition {
  transition: all 0.3s ease;
}
.reply-comment{
  margin-left: 40px;
  padding-left: 16px;
}
</style>
