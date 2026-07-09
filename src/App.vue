<script setup lang="ts">
import { ref } from 'vue'

const idea = ref('')
</script>

<template>
  <div class="window">

    <div class="title-bar">
      💡 Idea Bubble
    </div>

    <div class="content">

      <p class="hint">
        今天有什么想法？
      </p>

      <textarea
        v-model="idea"
        placeholder="随便写下任何念头..."
      ></textarea>

      <button>
        记录想法
      </button>

    </div>

  </div>
</template>

<style scoped>

.window{
  height:100vh;
  display:flex;
  flex-direction:column;
  background:white;
}

.title-bar{
  height:40px;

  display:flex;
  align-items:center;

  padding-left:14px;

  background:#f5f5f5;

  font-weight:bold;

  border-bottom:1px solid #ddd;

  -webkit-app-region:drag;
}

.content{
  flex:1;

  display:flex;
  flex-direction:column;

  padding:15px;

  gap:12px;
}

.hint{
  margin:0;
  color:#666;
}

textarea{

  flex:1;

  resize:none;

  border-radius:8px;

  border:1px solid #ccc;

  padding:10px;

  font-size:14px;

  outline:none;

}

button{

  align-self:flex-end;

  padding:8px 16px;

  border:none;

  border-radius:8px;

  background:#4f8cff;

  color:white;

  cursor:pointer;

}

button:hover{

  background:#3b74db;

}

</style>
