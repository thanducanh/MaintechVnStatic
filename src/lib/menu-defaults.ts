// 📍 File: src/lib/menu-defaults.ts

export const ADMIN_MENU_KEYS = {
  DASHBOARD: "dashboard",
  PERSONNEL: "personnel",
  ACCOUNTING: "accounting",
  CUSTOMERS: "customers",
  WORK: "work",
  WEBSITE: "website",
  LOGS: "logs",
  CHAT: "chat",
  SUPPORT: "support",
  SYSTEM: "system",
} as const;

export function getDefaultVisibleMenus(role: string): string[] {
  const r = role?.toUpperCase();

  if (r === "ADMIN") {
    return [
      ADMIN_MENU_KEYS.DASHBOARD,
      ADMIN_MENU_KEYS.PERSONNEL,
      ADMIN_MENU_KEYS.ACCOUNTING,
      ADMIN_MENU_KEYS.CUSTOMERS,
      ADMIN_MENU_KEYS.WORK,
      ADMIN_MENU_KEYS.WEBSITE,
      ADMIN_MENU_KEYS.LOGS,
      ADMIN_MENU_KEYS.CHAT,
      ADMIN_MENU_KEYS.SUPPORT,
      ADMIN_MENU_KEYS.SYSTEM,
    ];
  }

  if (r === "KE_TOAN" || r === "TRUONG_PHONG_KE_TOAN" || r === "NV_KE_TOAN") {
    return [
      ADMIN_MENU_KEYS.ACCOUNTING, 
      ADMIN_MENU_KEYS.WORK, 
      ADMIN_MENU_KEYS.CHAT, 
      ADMIN_MENU_KEYS.SUPPORT
    ];
  }

  if (r === "GIAM_DOC") {
    return [
      ADMIN_MENU_KEYS.DASHBOARD,
      ADMIN_MENU_KEYS.PERSONNEL,
      ADMIN_MENU_KEYS.ACCOUNTING,
      ADMIN_MENU_KEYS.CUSTOMERS,
      ADMIN_MENU_KEYS.WORK,
      ADMIN_MENU_KEYS.WEBSITE,
      ADMIN_MENU_KEYS.LOGS,
      ADMIN_MENU_KEYS.CHAT,
      ADMIN_MENU_KEYS.SUPPORT,
    ];
  }
  
  if (r === "KY_THUAT" || r === "CHUYEN_VIEN_KY_THUAT" || r === "NV_KY_THUAT") {
    return [
      ADMIN_MENU_KEYS.WORK,
      ADMIN_MENU_KEYS.CHAT,
      ADMIN_MENU_KEYS.SUPPORT,
    ];
  }

  return [
    ADMIN_MENU_KEYS.WORK, 
    ADMIN_MENU_KEYS.CHAT, 
    ADMIN_MENU_KEYS.SUPPORT
  ];
}
