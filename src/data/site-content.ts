// Dữ liệu tĩnh cho website public.
// Không gọi Prisma hoặc database trong file này.

export const siteConfig = {
  logo: "/images/site-logo-maintech.png",
  banner: "/images/maintech-page-banner.png",

  contact: {
    email: "mtv@maintechvn.com.vn",
    hotline: "+84 918 458 399",
    address: "TP. Hồ Chí Minh, Việt Nam",
  },

  home: {
    hero: {
      badge: "MAINTECH INDUSTRIAL SOLUTIONS",
      title1: "KỸ THUẬT CHUYÊN BIỆT",
      title2: "HIỆU SUẤT TỐI ƯU",
      description:
        "MAINTECHVN - Đối tác tin cậy trong cung cấp thiết bị, giải pháp kỹ thuật và dịch vụ bảo trì cho các ngành công nghiệp tại Việt Nam.",
      backgroundImage: "/images/maintech-page-banner.png",
    },
  },

  about: {
    badge: "VỀ CHÚNG TÔI",
    title: "GIẢI PHÁP KỸ THUẬT PHÙ HỢP CHO DOANH NGHIỆP",
    description:
      "Maintech Vietnam cung cấp thiết bị, giải pháp kỹ thuật và dịch vụ bảo trì cho các doanh nghiệp công nghiệp.",
    imageUrl: "/images/maintech-page-banner.png",
  },
};

export const services = [
  {
    id: 1,
    slug: "thiet-ke-lap-dat-thiet-bi-cang",
    title: "Thiết kế & lắp đặt thiết bị cảng",
    title_vi: "Thiết kế & lắp đặt thiết bị cảng",
    title_en: "Port Equipment Design & Installation",
    summary:
      "Thiết kế, lắp đặt và nâng cấp hệ thống thiết bị cảng biển theo yêu cầu vận hành.",
    summary_en:
      "Design, installation and upgrading of port equipment systems.",
    desc_vi:
      "Thiết kế, lắp đặt và nâng cấp hệ thống thiết bị cảng biển theo yêu cầu vận hành.",
    desc_en:
      "Design, installation and upgrading of port equipment systems.",
    content:
      "Maintech cung cấp giải pháp thiết kế, lắp đặt và tích hợp thiết bị cảng biển.",
    category: "THIẾT KẾ THI CÔNG",
    imageUrl:
      "/uploads/services/1778675193146_ThietKeLapDatThietBiCang.png",
    icon: "factory",
    status: "HIỂN THỊ",
    isActive: true,
  },
  {
    id: 2,
    slug: "bao-tri-thiet-bi-cang",
    title: "Bảo trì thiết bị cảng",
    title_vi: "Bảo trì thiết bị cảng",
    title_en: "Port Equipment Maintenance",
    summary:
      "Bảo trì, sửa chữa và kiểm tra định kỳ các thiết bị nâng hạ và thiết bị cảng.",
    summary_en:
      "Maintenance, repair and periodic inspection of lifting and port equipment.",
    desc_vi:
      "Bảo trì, sửa chữa và kiểm tra định kỳ các thiết bị nâng hạ và thiết bị cảng.",
    desc_en:
      "Maintenance, repair and periodic inspection of lifting and port equipment.",
    content:
      "Dịch vụ bảo trì giúp thiết bị hoạt động ổn định, an toàn và giảm thời gian dừng máy.",
    category: "BẢO TRÌ SỬA CHỮA",
    imageUrl:
      "/uploads/services/1778675523223_BaoTriThietBiNganhCang.png",
    icon: "wrench",
    status: "HIỂN THỊ",
    isActive: true,
  },
  {
    id: 3,
    slug: "bao-tri-thiet-bi-cong-nghiep",
    title: "Bảo trì thiết bị công nghiệp",
    title_vi: "Bảo trì thiết bị công nghiệp",
    title_en: "Industrial Equipment Maintenance",
    summary:
      "Giải pháp bảo trì phòng ngừa và sửa chữa thiết bị cho nhà máy công nghiệp.",
    summary_en:
      "Preventive maintenance and repair solutions for industrial factories.",
    desc_vi:
      "Giải pháp bảo trì phòng ngừa và sửa chữa thiết bị cho nhà máy công nghiệp.",
    desc_en:
      "Preventive maintenance and repair solutions for industrial factories.",
    content:
      "Đội ngũ kỹ thuật Maintech hỗ trợ kiểm tra, bảo dưỡng và khắc phục sự cố thiết bị.",
    category: "BẢO TRÌ SỬA CHỮA",
    imageUrl:
      "/uploads/services/1778675493178_BaoTriThietBiNganhFB.png",
    icon: "settings",
    status: "HIỂN THỊ",
    isActive: true,
  },
  {
    id: 4,
    slug: "thiet-ke-lap-dat-thiet-bi-nang-ha",
    title: "Thiết kế và lắp đặt thiết bị nâng hạ",
    title_vi: "Thiết kế và lắp đặt thiết bị nâng hạ",
    title_en: "Lifting Equipment Design & Installation",
    summary:
      "Thiết kế, lắp đặt cầu trục, cổng trục và các hệ thống thiết bị nâng hạ.",
    summary_en:
      "Design and installation of cranes and lifting equipment systems.",
    desc_vi:
      "Thiết kế, lắp đặt cầu trục, cổng trục và các hệ thống thiết bị nâng hạ.",
    desc_en:
      "Design and installation of cranes and lifting equipment systems.",
    content:
      "Cung cấp giải pháp thiết bị nâng hạ phù hợp với quy mô và yêu cầu của từng nhà máy.",
    category: "THIẾT KẾ THI CÔNG",
    imageUrl:
      "/uploads/services/1778675397430_ThietKeLapDatThietBiNangHa.png",
    icon: "gauge",
    status: "HIỂN THỊ",
    isActive: true,
  },
];

export const articles = [
  {
    id: 1,
    slug: "maintech-industrial-updates",
    title: "Cập nhật hoạt động kỹ thuật Maintech",
    title_en: "Maintech Industrial Updates",
    summary:
      "Những thông tin mới nhất về giải pháp kỹ thuật và hoạt động dự án của Maintech.",
    summary_en:
      "The latest updates on Maintech engineering solutions and projects.",
    category: "TIN_TUC",
    imageUrl: "/images/maintech-page-banner.png",
    createdAt: "2024-05-01",
    status: "PUBLISHED",
  },
  {
    id: 2,
    slug: "engineering-solutions",
    title: "Giải pháp kỹ thuật công nghiệp",
    title_en: "Industrial Engineering Solutions",
    summary:
      "Khám phá năng lực triển khai và bảo trì thiết bị công nghiệp của Maintech.",
    summary_en:
      "Discover Maintech's industrial equipment deployment and maintenance capabilities.",
    category: "GIAI_PHAP",
    imageUrl: "/images/maintech-page-banner.png",
    createdAt: "2024-04-15",
    status: "PUBLISHED",
  },
  {
    id: 3,
    slug: "maintech-projects",
    title: "Dự án tiêu biểu",
    title_en: "Featured Maintech Projects",
    summary:
      "Các dự án tiêu biểu thể hiện tiêu chuẩn và kinh nghiệm của đội ngũ Maintech.",
    summary_en:
      "Selected projects highlighting Maintech's standards and experience.",
    category: "DU_AN",
    imageUrl: "/images/maintech-page-banner.png",
    createdAt: "2024-03-20",
    status: "PUBLISHED",
  },
];

export const products = [
  {
    id: 1,
    slug: "thiet-bi-nang-ha-cong-nghiep",
    name: "Thiết bị nâng hạ công nghiệp",
    title: "Thiết bị nâng hạ công nghiệp",
    title_en: "Industrial Lifting Equipment",
    content:
      "Các loại thiết bị nâng hạ phục vụ nhà máy, cảng biển và kho vận.",
    imageUrl: "/images/maintech-page-banner.png",
    isActive: true,
  },
  {
    id: 2,
    slug: "thiet-bi-cang-bien",
    name: "Thiết bị cảng biển",
    title: "Thiết bị cảng biển",
    title_en: "Port Equipment",
    content:
      "Giải pháp thiết bị và phụ tùng phục vụ vận hành cảng biển.",
    imageUrl: "/images/maintech-page-banner.png",
    isActive: true,
  },
];

export const aboutData = {
  title: "Về chúng tôi",
  title_en: "About Us",
  summary:
    "Maintech Vietnam là đơn vị cung cấp thiết bị, giải pháp kỹ thuật và dịch vụ bảo trì công nghiệp.",
  content:
    "Chúng tôi đồng hành cùng doanh nghiệp trong thiết kế, lắp đặt, bảo trì và nâng cấp hệ thống thiết bị công nghiệp.",
  imageUrl: "/images/maintech-page-banner.png",
  hero_bg_path: "/images/maintech-page-banner.png",
};

export const certificates: any[] = [];
export const partners: any[] = [];
export const categories: any[] = [];
export const staffMembers: any[] = [];

export const contactConfig = {
  hero: {
    title: {
      vi: "LIÊN HỆ CHÚNG TÔI",
      en: "CONTACT US",
    },
    subtitle: {
      vi: "Maintech Vietnam luôn sẵn sàng hỗ trợ bạn.",
      en: "Maintech Vietnam is ready to support you.",
    },
    backgroundImage: "/images/maintech-page-banner.png",
    overlayOpacity: 0.7,
  },

  pageContent: {
    subtitle: {
      vi: "KẾT NỐI",
      en: "CONNECT",
    },
    title: {
      vi: "Chúng tôi luôn sẵn sàng lắng nghe",
      en: "We are always ready to listen",
    },
    description: {
      vi: "Hãy liên hệ với Maintech để nhận tư vấn kỹ thuật và giải pháp phù hợp.",
      en: "Contact Maintech for technical advice and suitable solutions.",
    },
  },

  contactInfo: {
    hotlines: ["0918 458 399"],
    emails: ["mtv@maintechvn.com.vn"],
    hotline: "0918 458 399",
    email: "mtv@maintechvn.com.vn",
    responseTime: {
      vi: "Chúng tôi sẽ phản hồi yêu cầu của bạn trong thời gian sớm nhất.",
      en: "We will respond to your request as soon as possible.",
    },
  },

  addresses: {
    list: ["TP. Hồ Chí Minh, Việt Nam"],
    headOffice: "TP. Hồ Chí Minh, Việt Nam",
    factory: "",
    mapUrl:
      "https://maps.google.com/maps?q=Ho%20Chi%20Minh%20Vietnam&output=embed&z=12",
  },

  quickChannels: {
    zalo: {
      enabled: true,
      label: "Zalo",
      value: "0918458399",
    },
    whatsapp: {
      enabled: true,
      label: "WhatsApp",
      value: "+84918458399",
    },
    telegram: {
      enabled: false,
      label: "Telegram",
      value: "maintechvn",
    },
  },

  form: {
    enabled: true,
    title: {
      vi: "Gửi yêu cầu tư vấn",
      en: "Request a consultation",
    },
    subtitle: {
      vi: "Đội ngũ kỹ thuật sẽ liên hệ với bạn sớm nhất.",
      en: "Our engineering team will contact you shortly.",
    },
    submitText: {
      vi: "Gửi thông tin ngay",
      en: "Send request",
    },
    receiverEmail: "mtv@maintechvn.com.vn",
    successMessage: {
      vi: "Yêu cầu đã được gửi thành công.",
      en: "Your request has been sent successfully.",
    },
  },
};