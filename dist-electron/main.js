import { app as a, BrowserWindow as p, ipcMain as f } from "electron";
import i from "node:fs";
import e from "node:path";
import { fileURLToPath as h } from "node:url";
function P() {
  const r = e.join(a.getPath("userData"), "ideas.json");
  if (!i.existsSync(r))
    return [];
  const o = i.readFileSync(r, "utf-8"), t = JSON.parse(o);
  if (!Array.isArray(t))
    throw new Error("ideas.json must contain an array");
  return t.sort(
    (s, l) => new Date(l.createdAt).getTime() - new Date(s.createdAt).getTime()
  );
}
function R(r) {
  const o = a.getPath("userData"), t = e.join(o, "ideas.json");
  let s = [];
  if (i.existsSync(t)) {
    const l = i.readFileSync(t, "utf-8"), d = JSON.parse(l);
    if (!Array.isArray(d))
      throw new Error("ideas.json must contain an array");
    s = d;
  }
  return s.push({
    text: r,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }), i.writeFileSync(t, JSON.stringify(s, null, 2), "utf-8"), console.log("保存成功:", t), !0;
}
const m = e.dirname(h(import.meta.url));
process.env.APP_ROOT = e.join(m, "..");
const c = process.env.VITE_DEV_SERVER_URL, T = e.join(process.env.APP_ROOT, "dist-electron"), u = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = c ? e.join(process.env.APP_ROOT, "public") : u;
let n;
function w() {
  n = new p({
    width: 320,
    height: 240,
    x: 20,
    y: 20,
    frame: !1,
    alwaysOnTop: !0,
    resizable: !1,
    maximizable: !1,
    minimizable: !1,
    autoHideMenuBar: !0,
    webPreferences: {
      preload: e.join(m, "preload.mjs")
    }
  }), n.webContents.on("did-finish-load", () => {
    n == null || n.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), c ? n.loadURL(c) : n.loadFile(e.join(u, "index.html"));
}
a.on("window-all-closed", () => {
  process.platform !== "darwin" && (a.quit(), n = null);
});
a.on("activate", () => {
  p.getAllWindows().length === 0 && w();
});
a.whenReady().then(() => {
  w(), f.handle("save-idea", (r, o) => R(o)), f.handle("read-ideas", () => P());
});
export {
  T as MAIN_DIST,
  u as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};
