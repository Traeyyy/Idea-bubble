"use strict";
const electron = require("electron");
console.log("✅ preload loaded");
electron.contextBridge.exposeInMainWorld("ideaBubble", {
  saveIdea(text) {
    return electron.ipcRenderer.invoke("save-idea", text);
  }
});
