"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation"; // Dùng router gốc của Next

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();

    const toggle = () => {
        const nextLocale = locale === "vi" ? "en" : "vi";
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <button onClick={toggle} className="rounded border p-2">
            {locale === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}
        </button>
    );
}
