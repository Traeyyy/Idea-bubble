<script setup lang="ts">
import { ref } from 'vue'

type Page = 'record' | 'history'

interface Idea {
  text: string
  createdAt: string
}

const page = ref<Page>('record')
const idea = ref('')
const saved = ref(false)
const ideas = ref<Idea[]>([])

const saveIdea = async () => {
  if (!idea.value.trim()) {
    return
  }

  const result = await window.ideaBubble.saveIdea(idea.value)

  if (result) {
    saved.value = true

    setTimeout(() => {
      saved.value = false
    }, 1500)
  }

  idea.value = ''
}

const showHistory = async () => {
  ideas.value = await window.ideaBubble.readIdeas()
  page.value = 'history'
}

const showRecord = () => {
  page.value = 'record'
}

const formatTime = (value: string) => {
  const date = new Date(value)
  const pad = (number: number) => String(number).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
</script>

<template>
  <div class="window">
    <div
      v-if="page === 'record'"
      class="title-bar"
    >
      <span>💡 Idea Bubble</span>
      <button
        class="icon-button"
        aria-label="历史想法"
        @click="showHistory"
      >
        📚
      </button>
    </div>

    <div
      v-else
      class="title-bar"
    >
      <button
        class="back-button"
        aria-label="返回记录"
        @click="showRecord"
      >
        ←
      </button>
      <span>历史想法</span>
    </div>

    <div
      v-if="page === 'record'"
      class="content"
    >
      <div
        v-if="saved"
        class="saved-tip"
      >
        ✓ 已保存
      </div>

      <p class="hint">今天有什么想法？</p>

      <textarea
        v-model="idea"
        placeholder="随便写下任何念头..."
      ></textarea>

      <button @click="saveIdea">记录想法</button>
    </div>

    <div
      v-else
      class="history-content"
    >
      <p
        v-if="ideas.length === 0"
        class="empty-tip"
      >
        暂无想法
      </p>

      <div
        v-else
        class="history-list"
      >
        <div
          v-for="historyIdea in ideas"
          :key="`${historyIdea.createdAt}-${historyIdea.text}`"
          class="idea-item"
        >
          <div class="idea-text">{{ historyIdea.text }}</div>
          <div class="idea-time">{{ formatTime(historyIdea.createdAt) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}

.title-bar {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 14px;
  background: #f5f5f5;
  font-weight: 600;
  -webkit-app-region: drag;
}

.title-bar span {
  flex: 1;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 12px;
}

.hint {
  margin: 0;
}

textarea {
  flex: 1;
  resize: none;
  border: 1px solid #cccccc;
  padding: 10px;
  font-size: 14px;
}

button {
  align-self: flex-end;
  padding: 10px 18px;
  border: 0;
  background: #1677ff;
  color: white;
  cursor: pointer;
}

.icon-button,
.back-button {
  -webkit-app-region: no-drag;
}

.icon-button {
  align-self: stretch;
  padding: 0 14px;
  background: #f5f5f5;
  color: inherit;
  font-size: 16px;
}

.back-button {
  align-self: stretch;
  padding: 0 10px 0 0;
  background: #f5f5f5;
  color: inherit;
  font-size: 18px;
}

.saved-tip {
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
}

.history-content {
  flex: 1;
  min-height: 0;
  padding: 15px;
}

.history-list {
  height: 100%;
  overflow-y: auto;
}

.idea-item {
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}

.idea-text {
  white-space: pre-wrap;
}

.idea-time {
  margin-top: 6px;
  color: #666666;
  font-size: 12px;
}

.empty-tip {
  margin: 0;
}
</style>
