export function timeAgo(timestamp: number) {
    const diff = Math.floor((Date.now() - timestamp) / 1000);

    if (diff < 5) return "vừa xong";
    if (diff < 60) return `${diff} giây trước`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} phút trước`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;

    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
}
export function timerFormat(
    date: Date | string,
    options?: Intl.DateTimeFormatOptions,
): string {
    if (!date) return "";

    const d = typeof date === "string" ? new Date(date) : date;

    if (isNaN(d.getTime())) return "";

    return d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        ...options,
    });
}
