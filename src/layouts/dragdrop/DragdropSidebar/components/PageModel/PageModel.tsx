/* eslint-disable react-hooks/set-state-in-effect */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import PageItem from "@/layouts/dragdrop/DragdropSidebar/components/PageModel/PageItem";
import {
    facebookAuthService,
    FacebookResponse,
} from "@/services/facebookAuthService";
import { Page, pageService } from "@/services/pageService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PageModel() {
    const [open, setOpen] = useState(false);
    const [pages, setPages] = useState<FacebookResponse[]>([]);
    const [currentConnectedPage, setCurrentConnectedPage] = useState<Page>();

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(window.location.search);
    const flowId = searchParams.get("connectFlowId");

    function handleSetOpen(value: boolean) {
        if (!value) {
            params.delete("connectFlowId");
            router.push(`${pathname}?${params.toString()}`);
        }

        setOpen(value);
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

    async function handleConnect(page: FacebookResponse) {
        if (!flowId) return;
        try {
            await pageService.upsert(flowId, {
                pageUid: page.id,
                pageAccessToken: page.accessToken,
            });

            toast.success("Kết nối trang facebook thành công");
            params.delete("connectFlowId");
            router.push(`${pathname}?${params.toString()}`);
            setOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Kết nối thất bại, đã có lỗi xảy ra");
        }
    }

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
                            />
                        ))}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PageModel;
