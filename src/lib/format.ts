export function formatDate(
    date: Date | string | number | undefined,
    opts: Intl.DateTimeFormatOptions = {},
) {
    if (!date) return "";

    try {
        return new Intl.DateTimeFormat("en-US", {
            month: opts.month ?? "long",
            day: opts.day ?? "numeric",
            year: opts.year ?? "numeric",
            ...opts,
        }).format(new Date(date));
    } catch (_err) {
        return "";
    }
}

export function htmlToText(html?: string) {
    if (!html) return "";

    if (typeof window === "undefined") {
        // fallback cho SSR
        return html.replace(/<[^>]*>/g, "");
    }

    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
