// 📍 File: src/app/products/page.tsx

import { products as staticProducts } from "@/data/site-content";
import ProductsClient from "./ProductsClient";

 // Bypass cache to ensure instant settings sync updates

export default function ProductsPage() {
    const products = staticProducts || [];

    const pageConfig = {
        badgeVi: "SẢN PHẨM & THIẾT BỊ",
        badgeEn: "PRODUCTS & EQUIPMENT",
        titleVi: "SẢN PHẨM & THIẾT BỊ CÔNG NGHIỆP",
        titleEn: "INDUSTRIAL PRODUCTS & EQUIPMENT",
        descVi: "Maintech chuyên cung cấp thiết bị F&B, thiết bị nâng hạ và phụ tùng công nghiệp.",
        descEn: "Maintech specializes in providing high-quality F&B, lifting equipment and industrial components.",
        backgroundImage: "/images/maintech-page-banner.png",
        overlayOpacity: 60
    };

    const safeProducts = products;
    const safePageConfig = pageConfig;

    return (
        <ProductsClient 
            initialProducts={safeProducts} 
            pageConfig={safePageConfig} 
        />
    );
}
