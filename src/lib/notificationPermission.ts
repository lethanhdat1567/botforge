export async function requestNotificationPermission() {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
        await Notification.requestPermission();
    }
}

export function showSystemNotification() {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const noti = new window.Notification("🔔 Thông báo mới", {
        body: "Bạn có một thông báo mới",
    });

    noti.onclick = () => {
        window.focus();
        window.location.href = "/notifications";
    };
}
