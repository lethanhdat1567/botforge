"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import { HttpError } from "@/http/helpers";
import {
    flowShareDowloadService,
    getDownloadFlowTarget,
    isDownloadFlowSuccess,
} from "@/services/flowShareDowloadService";
import { Download, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = { flowShareId: string };

function DownloadBtn({ flowShareId }: Props) {
    const router = useRouter();
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchStatus = async () => {
        try {
            const res =
                await flowShareDowloadService.checkStatus(flowShareId);
            setIsDownloaded(res.isDownloaded);
        } catch {
            // Chưa đăng nhập hoặc lỗi mạng — giữ mặc định, nút vẫn thử khi bấm
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [flowShareId]);

    async function handleDownload() {
        setLoading(true);
        try {
            const data = await flowShareDowloadService.download(flowShareId);
            const target = getDownloadFlowTarget(data);

            if (isDownloadFlowSuccess(data)) {
                toast.success("Đã thêm flow vào tài khoản của bạn");
                setIsDownloaded(true);
            } else {
                toast.success("Đã mở flow của bạn");
            }

            if (target?.id) {
                router.push(`/bot/flows?flowId=${target.id}`);
            } else {
                router.push("/bot/flows");
            }
        } catch (e) {
            const msg =
                e instanceof HttpError
                    ? e.message
                    : "Không thể tải mẫu. Vui lòng thử lại.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            className="flex flex-1 items-center justify-center gap-2"
            disabled={loading}
            onClick={handleDownload}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : null}
            {isDownloaded ? "Tải lại" : "Tải xuống"}
            {!loading ? <Download className="h-4 w-4 shrink-0" /> : null}
        </Button>
    );
}

export default DownloadBtn;
