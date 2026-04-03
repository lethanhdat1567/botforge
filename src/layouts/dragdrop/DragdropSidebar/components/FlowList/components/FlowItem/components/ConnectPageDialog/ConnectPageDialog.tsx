"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { HttpError } from "@/http/helpers";
import {
    facebookAuthService,
    type FacebookResponse,
} from "@/services/facebookAuthService";
import { pageService } from "@/services/pageService";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    flowId: string;
    onSuccess: () => void;
};

function ConnectPageDialog({ open, onOpenChange, flowId, onSuccess }: Props) {
    const [pages, setPages] = useState<FacebookResponse[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [connectingId, setConnectingId] = useState<string | null>(null);

    function resetLocalState() {
        setPages([]);
        setLoadError(null);
        setIsLoading(false);
        setConnectingId(null);
    }

    function handleDialogOpenChange(next: boolean) {
        if (!next) {
            resetLocalState();
        }
        onOpenChange(next);
    }

    async function handleSelectPage(page: FacebookResponse) {
        setConnectingId(page.id);
        try {
            await pageService.upsert(flowId, {
                pageUid: page.id,
                pageAccessToken: page.accessToken,
            });
            toast.success("Kết nối page thành công");
            handleDialogOpenChange(false);
            onSuccess();
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message || "Kết nối page thất bại.");
            } else {
                toast.error("Kết nối page thất bại.");
            }
        } finally {
            setConnectingId(null);
        }
    }

    useEffect(() => {
        if (!open) return;

        setPages([]);
        setLoadError(null);
        setConnectingId(null);

        let cancelled = false;

        async function load() {
            setIsLoading(true);
            try {
                const data = await facebookAuthService.getPages();
                if (cancelled) return;
                if (data == null) {
                    setPages([]);
                    setLoadError("Bạn chưa kết nối tài khoản Facebook.");
                    return;
                }
                if (!Array.isArray(data) || data.length === 0) {
                    setPages([]);
                    setLoadError("Không có Facebook Page nào.");
                    return;
                }
                setPages(data);
            } catch (error) {
                console.log(error);
                if (!cancelled) {
                    setPages([]);
                    setLoadError("Không tải được danh sách page.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        void load();
        return () => {
            cancelled = true;
        };
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Kết nối Facebook Page</DialogTitle>
                    <DialogDescription>
                        Chọn một page để gắn với flow này.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[min(320px,50vh)] space-y-2 overflow-y-auto pr-1">
                    {isLoading && (
                        <div className="text-muted-foreground flex items-center justify-center gap-2 py-8 text-sm">
                            <Loader2 className="size-4 animate-spin" />
                            Đang tải danh sách…
                        </div>
                    )}

                    {!isLoading && loadError && (
                        <p className="text-destructive text-center text-sm">
                            {loadError}
                        </p>
                    )}

                    {!isLoading &&
                        !loadError &&
                        pages.map((page) => {
                            const busy = connectingId === page.id;
                            return (
                                <Button
                                    key={page.id}
                                    type="button"
                                    variant="ghost"
                                    className="h-auto w-full justify-start px-3 py-2 text-left font-normal"
                                    disabled={connectingId !== null}
                                    onClick={() => void handleSelectPage(page)}
                                >
                                    <span className="min-w-0 flex-1 truncate">
                                        {page.name}
                                    </span>
                                    {busy && (
                                        <Loader2 className="text-muted-foreground size-4 shrink-0 animate-spin" />
                                    )}
                                </Button>
                            );
                        })}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ConnectPageDialog;
