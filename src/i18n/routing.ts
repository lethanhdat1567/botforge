import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localePrefix: "never",
});

// Xuất các helper để dùng cho việc chuyển đổi ngôn ngữ sau này
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
