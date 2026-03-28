import { Maximize2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type LiveChatWidgetChromeProps = {
    onExpand: () => void;
    onClose: () => void;
    showExpand: boolean;
};

export function LiveChatWidgetChrome({
    onExpand,
    onClose,
    showExpand,
}: LiveChatWidgetChromeProps) {
    return (
        <div className="bg-muted/40 flex shrink-0 items-center justify-between gap-2 border-b px-2 py-1.5">
            <span className="text-muted-foreground px-2 text-xs font-medium tracking-wide uppercase">
                Chat trực tiếp
            </span>
            <div className="flex items-center gap-0.5">
                {showExpand && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground"
                        aria-label="Mở rộng toàn màn hình"
                        onClick={onExpand}
                    >
                        <Maximize2 className="size-4" />
                    </Button>
                )}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    aria-label="Đóng"
                    onClick={onClose}
                >
                    <X className="size-4" />
                </Button>
            </div>
        </div>
    );
}
