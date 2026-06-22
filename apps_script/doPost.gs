// Apps Script 範例：接收 POST 請求，將歌曲資料寫入試算表
// 使用方式：
// 1. 建立一個 Google 試算表，取得試算表 ID（網址中 d/ID/ 部分）
// 2. 將此檔案貼到 Apps Script 編輯器，並在最上方設定 const SHEET_ID
// 3. 部署為「Web 應用程式」，存取權限選擇「任何人，包括匿名使用者（若要允許公開提交）」，取得 exec URL
// 4. 將後端或前端的目標 URL 設為該 exec URL

const SHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // <-- 改成你的試算表 ID
const SHEET_NAME = 'songs'; // 試算表中的工作表名稱

function doPost(e) {
  try {
    // 解析傳入的 JSON（前端以 JSON body 發送）
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const id = body.id || '';
    const title = body.title || '';
    const artist = body.artist || '';
    const source = body.source || 'web';
    const timestamp = new Date();

    if (!id) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'missing id' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['timestamp', 'youtube_id', 'title', 'artist', 'source']);
    }

    sheet.appendRow([timestamp, id, title, artist, source]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
+      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
