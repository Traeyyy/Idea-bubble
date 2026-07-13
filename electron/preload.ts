console.log("✅ preload loaded")
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ideaBubble", {

  saveIdea(text: string) {
    return ipcRenderer.invoke("save-idea", text);
  },

  readIdeas() {
    return ipcRenderer.invoke("read-ideas");
  },

});
