# Daily-playlist

本專案為簡單的隨機音樂推薦前端，並新增一個輕量後端用以轉發新增歌曲請求到 Google Apps Script（Apps Script 需另外部署為 Web App）。

啟動後端：

1. 安裝相依套件

```
npm install
```

2. 啟動伺服器（若已部署 Apps Script，請設定 `GAS_ENDPOINT` 環境變數為該部署的 `exec` URL）

```
GAS_ENDPOINT="https://script.google.com/macros/s/你的部署ID/exec" npm start
```

前端：開啟 `index.html`，頁面底部會有「新增歌曲到公開清單」表單，會將資料 POST 到本機後端的 `/add-song`，再由後端轉發到 Apps Script。
