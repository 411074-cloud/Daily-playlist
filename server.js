const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// 注意：若你已部署 Apps Script 為 Web App，請改為該部署的 URL（exec 形式）
const GAS_ENDPOINT = process.env.GAS_ENDPOINT || 'https://script.google.com/d/1mGHaa4elJE1ZZZMNP3jK5JnKxyDDYqRliLP8wP_-hY2smif6W1saHJNS/edit?usp=sharing';

app.post('/add-song', async (req, res) => {
  try {
    const payload = req.body || {};

    // 將收到的資料轉發到 Google Apps Script
    const resp = await axios.post(GAS_ENDPOINT, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.status(200).json({ ok: true, status: resp.status, data: resp.data });
  } catch (err) {
    console.error('forward error:', err && err.toString ? err.toString() : err);
    res.status(500).json({ ok: false, error: err && err.toString ? err.toString() : String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Daily-playlist backend listening on port ${PORT}`);
});
