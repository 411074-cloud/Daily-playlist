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

Apps Script（範例）

專案中包含一個 Apps Script 範例檔案：`/apps_script/doPost.gs`。
這個範例會將 POST 傳來的 JSON（格式例如 {id, title, artist, source}）寫入你指定的 Google 試算表工作表中。

步驟：

1. 建立 Google 試算表，複製試算表 ID，編輯 `apps_script/doPost.gs` 中的 `SHEET_ID`。
2. 在 Apps Script 編輯器貼上程式碼並儲存。
3. 部署 → 新增部署 → 選擇「Web 應用程式」，設定誰可以存取為「任何人（含匿名）」（若你希望任何使用者可提交）或適當的授權範圍。
4. 取得部署後的 `exec` URL，並把後端環境變數 `GAS_ENDPOINT` 設為該 URL，或直接將前端改為呼叫該 URL。

注意事項：
- Apps Script 的編輯頁面 URL（包含 `/edit`）不是可用的接收端，必須使用部署後的 `exec` URL。
- 若要限制權限，請不要開放匿名存取，改用 OAuth 或其他驗證機制。

