import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sản Phẩm & Thiết Bị",
    description: "Khám phá danh mục sản phẩm và thiết bị kỹ thuật công nghiệp chính hãng từ Maintech Vietnam. Cung cấp cẩu trục, phụ tùng nâng hạ đạt chuẩn quốc tế.",
    openGraph: {
        title: "Sản Phẩm & Thiết Bị | Maintech Vietnam",
        description: "Thiết bị kỹ thuật công nghiệp chính hãng — cẩu trục, nâng hạ, phụ tùng đạt chuẩn quốc tế.",
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
