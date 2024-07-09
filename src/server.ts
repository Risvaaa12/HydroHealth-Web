// backend/server.ts

import express from 'express';
import proxyMiddleware from './middleware/proxy';

const app = express();

// Gunakan middleware proxy
app.use(proxyMiddleware);

// Endpoint dan middleware lainnya di sini

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
