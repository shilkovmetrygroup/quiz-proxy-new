const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFkzmseIHPc6KS2oR409q1wqzsZIKRkdwbyLTBkCoMWGelAB63LHYiqFQ-8BzmO-iQYQ/exec';

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  console.log("➡️ Запрос от клиента:", req.body);

  try {
    const formBody = new URLSearchParams();
    formBody.append("payload", JSON.stringify(req.body));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const result = await response.text();
    console.log("✅ Ответ от Google Script:", result);
    res.status(200).send({ status: 'ok', result });
  } catch (error) {
    console.error('❌ Ошибка отправки в Google Script:', error);
    res.status(500).send({ error: 'Ошибка отправки в Google Script' });
  }
});

app.get('/', (_, res) => {
  res.send('Proxy server is working ✅');
});

app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
