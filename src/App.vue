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
      key="record-title"
      class="title-bar"
    >
      <span>💡 Idea Bubble</span>
      <button
        class="icon-button"
        aria-label="历史想法"
        @click="showHistory"
      >
        <span>📚</span>
      </button>
    </div>

    <div
      v-else
      key="history-title"
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
      key="record-content"
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
      key="history-content"
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

  background: rgba(255, 255, 255, 0.18);

  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  border-radius: 24px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.15);

  overflow: hidden;
}


/* 顶部栏：不再单独形成一个玻璃块 */
.title-bar {
  height: 40px;

  display: flex;
  align-items: center;

  padding-left: 14px;

  background: transparent;


  font-weight: 600;

  -webkit-app-region: drag;
}


.title-bar span {
  flex: 1;
}


/* 记录页面 */
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


/* 输入框 */
textarea {
  flex: 1;

  resize: none;

  background: rgba(255, 255, 255, 0.12);

  border: none;

  border-radius: 12px;

  padding: 12px;

  font-size: 14px;

  color: #333;

  outline: none;

  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.15);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}


textarea::placeholder {
  color: rgba(0,0,0,0.45);
}


/* 主按钮 */
button {
  padding: 10px 18px;

  border: 0;

  border-radius: 12px;

  background: rgba(41, 106, 247, 0.55);

  color: white;

  cursor: pointer;

  backdrop-filter: blur(10px);

  transition: transform .15s ease;
}


button:hover {
  transform: scale(1.05);
}


/* 图标按钮 */
.icon-button,
.back-button {
  -webkit-app-region: no-drag;
}


.icon-button {
  align-self: center;

  width: 32px;
  height: 32px;

  margin-right: 8px;

  padding: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: transparent;

  color: inherit;

  font-size: 15px;

  transition: 
    background .2s ease,
    transform .15s ease;
}

.icon-button:hover {
  background: rgba(255,255,255,0.25);

  transform: scale(1.05);
}


.back-button {
  align-self: stretch;

  padding: 0 10px 0 0;

  background: transparent;

  color: inherit;

  font-size: 18px;
}


/* 保存提示 */
.saved-tip {
  text-align: center;

  color: #2e7d32;

  font-weight: bold;
}


/* 历史页面 */
.history-content {
  flex:1;

  min-height:0;

  display:flex;

  flex-direction:column;

  padding:15px;

  overflow:hidden;

  background: rgba(111, 181, 255, 0.92);

  color:#333;
}


.history-list {
  height: 100%;

  overflow-y: auto;
}


/* 历史记录条目 */
.idea-item {
  padding: 12px 0;

  border-bottom: 1px solid rgba(255,255,255,0.18);
}


.idea-text {
  white-space: pre-wrap;
}


.idea-time {
  margin-top: 6px;

  color: rgba(0,0,0,0.45);

  font-size: 12px;
}


.empty-tip {
  margin: 0;
}
</style>
