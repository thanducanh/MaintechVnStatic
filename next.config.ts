// 📍 File: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Cấu hình load ảnh từ tên miền bên ngoài (Giữ nguyên của Chủ tịch)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // 2. 🚀 LỆNH BÁO CHO BẢO VỆ MỞ CỔNG: Cho phép up file nặng lên tới 10MB
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

