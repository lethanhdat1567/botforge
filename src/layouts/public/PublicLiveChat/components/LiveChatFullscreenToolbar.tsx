import { Minimize2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type LiveChatFullscreenToolbarProps = {
    onShrink: () => void;
};

export function LiveChatFullscreenToolbar({
    onShrink,
}: LiveChatFullscreenToolbarProps) {
    return (
        <div className="bg-muted/40 flex shrink-0 items-center justify-end gap-0.5 border-b px-2 py-1.5">
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground"
                aria-label="Thu nhỏ"
                onClick={onShrink}
            >
                <Minimize2 className="size-4" />
            </Button>
            <DialogClose asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    aria-label="Đóng"
                >
                    <X className="size-4" />
                </Button>
            </DialogClose>
        </div>
    );
}
