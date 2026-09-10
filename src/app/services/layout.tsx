import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dịch Vụ & Giải Pháp",
    description: "Maintech Vietnam cung cấp dịch vụ bảo trì, sửa chữa thiết bị công nghiệp, hệ thống nâng hạ và giải pháp kỹ thuật toàn diện cho doanh nghiệp.",
    openGraph: {
        title: "Dịch Vụ & Giải Pháp | Maintech Vietnam",
        description: "Cung cấp giải pháp kỹ thuật công nghiệp toàn diện — từ thiết kế, lắp đặt đến bảo trì định kỳ.",
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
