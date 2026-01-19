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
