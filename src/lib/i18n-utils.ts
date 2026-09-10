/**
 * i18n Utilities for translating dynamic data codes into human-readable labels
 * based on the current system language.
 */

export function translateDepartment(code: string | null | undefined, t: any) {
    if (!code) return "—";
    // Check if the code exists in our translation map
    return t.data.departments[code] || code;
}

export function translatePosition(code: string | null | undefined, t: any) {
    if (!code) return "—";
    return t.data.positions[code] || code;
}

export function translateRole(code: string | null | undefined, t: any) {
    if (!code) return "—";
    return t.data.roles[code] || code;
}

export function translateStatus(code: string | null | undefined, t: any) {
    if (!code) return "—";
    return t.data.status[code] || code;
}

/**
 * Specifically handles the translation of the 'System Account' badge
 */
export function getSystemBadge(t: any) {
    return t.data.system.badge;
}

export function getSystemNotice(t: any) {
    return t.data.system.notice;
}
