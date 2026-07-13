<script setup lang="ts">
import { ref } from 'vue'

const idea = ref('')
const saved = ref(false)

const saveIdea = async () => {
  console.log("按钮被点击了")

  if (!idea.value.trim()) {
    return
  }

  const result = await window.ideaBubble.saveIdea(idea.value)

  console.log("save result:", result)

  if (result) {
    saved.value = true

    setTimeout(() => {
      saved.value = false
    }, 1500)
  }

  idea.value = ''
}
</script>

<template>
  <div class="window">

    <div class="title-bar">
      💡 Idea Bubble
    </div>

    <div class="content">

      <div
        v-if="saved"
        class="saved-tip"
      >
        ✓ 已保存
      </div>

      <p class="hint">
        今天有什么想法？
      </p>

      <textarea
        v-model="idea"
        placeholder="随便写下任何念头..."
      ></textarea>

      <button @click="saveIdea">
        记录想法
      </button>

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
  -webkit-app-region:drag;
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


.saved-tip {
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
}

</style>
