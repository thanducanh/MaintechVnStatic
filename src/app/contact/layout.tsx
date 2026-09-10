import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Liên Hệ",
    description: "Liên hệ với Maintech Vietnam để nhận tư vấn và báo giá thiết bị kỹ thuật công nghiệp. Đội ngũ kỹ sư của chúng tôi sẵn sàng hỗ trợ bạn 24/7.",
    openGraph: {
        title: "Liên Hệ | Maintech Vietnam",
        description: "Đội ngũ kỹ sư Maintech sẵn sàng tư vấn và hỗ trợ bạn 24/7 — miễn phí, không ràng buộc.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
