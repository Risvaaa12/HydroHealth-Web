// middleware/proxy.ts

import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';

const app = express();

app.use('/api', createProxyMiddleware({
  target: '${process.env.NEXT_PUBLIC_VERCEL_FASTAPI_CLASSIFY}', // Ganti dengan base URL API Anda
  changeOrigin: true, // Mengizinkan perubahan origin
  secure: false, // Menonaktifkan validasi sertifikat SSL untuk permintaan dari server ke API (harus dipertimbangkan dengan hati-hati untuk produksi)
}));

export default app;
