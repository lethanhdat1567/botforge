"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useQueryParams } from "@/hooks/use-query-params";
import PageItem from "@/layouts/dragdrop/DragdropSidebar/components/PageModel/PageItem";
import {
    facebookAuthService,
    FacebookResponse,
} from "@/services/facebookAuthService";
import { Page, pageService } from "@/services/pageService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PageModel({ onRefresh }: { onRefresh: () => void }) {
    const [open, setOpen] = useState(false);
    const [pages, setPages] = useState<FacebookResponse[]>([]);
    const [currentConnectedPage, setCurrentConnectedPage] = useState<Page>();

    const { getQueryParam, deleteQueryParams } = useQueryParams();
    const flowId = getQueryParam("connectFlowId");

    function handleSetOpen(value: boolean) {
        if (!value) {
            deleteQueryParams("connectFlowId", {
                scroll: false,
                replace: true,
            });
        }

        setOpen(value);
    }

    async function handleConnect(page: FacebookResponse) {
        if (!flowId) return;
        try {
            await pageService.upsert(flowId, {
                pageUid: page.id,
                pageAccessToken: page.accessToken,
            });

            toast.success("Kết nối trang facebook thành công");
            deleteQueryParams("connectFlowId", {
                scroll: false,
                replace: true,
            });
            setOpen(false);
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Kết nối thất bại, đã có lỗi xảy ra");
        }
    }

    async function handleDisconnect() {
        if (!flowId) return;
        try {
            await pageService.delete(flowId);

            toast.success("Hủy Kết nối thành công");
            deleteQueryParams("connectFlowId", {
                scroll: false,
                replace: true,
            });
            setOpen(false);
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Hủy kết nối thất bại, đã có lỗi xảy ra");
        }
    }

    const fetchPages = async () => {
        try {
            const res = await facebookAuthService.getPages();
            setPages(res);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCurrentConnectedPage = async () => {
        try {
            const res = await pageService.detail(flowId || "");

            setCurrentConnectedPage(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (flowId) {
            setOpen(true);
            fetchPages();
            fetchCurrentConnectedPage();
        } else {
            setOpen(false);
        }
    }, [flowId]);

    return (
        <Dialog open={open} onOpenChange={handleSetOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Danh sách trang facebook</DialogTitle>
                    <Separator />
                    <div>
                        {pages.map((page) => (
                            <PageItem
                                currentConnectedPageUid={
                                    currentConnectedPage?.pageUid
                                }
                                key={page.id}
                                page={page}
                                onConnect={handleConnect}
                                onDisconnect={handleDisconnect}
                            />
                        ))}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PageModel;
