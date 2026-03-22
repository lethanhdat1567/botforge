function ActiveAuthHeader({ onAction }: { onAction: () => void }) {
    return (
        <div className="border-border/50 bg-muted/20 mb-6 flex items-center justify-between rounded-lg border px-4 py-3">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-muted-foreground text-xs font-medium">
                    Đã kết nối Facebook
                </span>
            </div>
            <button
                onClick={onAction}
                className="text-muted-foreground hover:text-foreground text-[11px] font-semibold tracking-wider uppercase transition-colors"
            >
                Đổi tài khoản
            </button>
        </div>
    );
}

export default ActiveAuthHeader;
