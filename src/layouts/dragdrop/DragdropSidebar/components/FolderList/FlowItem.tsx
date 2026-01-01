import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Options from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/Options";
import RenameFlow from "@/layouts/dragdrop/DragdropSidebar/components/FolderList/RenameFlow";
import { flowService } from "@/services/flowService";
import { Activity, PencilRuler } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    id: string;
    name: string;
    status: "draft" | "published";
    onRefresh: any;
};

function FlowItem({ id, name, status, onRefresh }: Props) {
    const [isRename, setIsRename] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleClickItem() {
        const params = new URLSearchParams(searchParams.toString());
        params.set("flowId", id);
        router.push(`${window.location.pathname}?${params.toString()}` as any);
    }

    function handleRename() {
        setIsRename(true);
    }
    async function handleDuplicate() {
        try {
            await flowService.duplicateFlow(id);
            onRefresh();
            toast.success("Nhân bản flow thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Nhân bản flow thất bại!");
        }
    }
    async function handleDestroy() {
        try {
            await flowService.destroyFlow(id);
            onRefresh();
            toast.success("Xóa flow thành công!");
        } catch (error) {
            console.log(error);
            toast.error("Xóa flow thất bại!");
        }
    }

    return (
        <div
            className="group hover:bg-muted group flex h-8 w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-5"
            onClick={handleClickItem}
        >
            {/* LEFT */}
            <div className="flex min-w-0 flex-1 items-center gap-2">
                {status === "published" && (
                    <Activity size={14} className="shrink-0 text-green-500" />
                )}
                {status === "draft" && (
                    <PencilRuler
                        size={14}
                        className="shrink-0 text-yellow-500"
                    />
                )}

                {isRename ? (
                    <RenameFlow
                        flowId={id}
                        name={name}
                        onRefresh={onRefresh}
                        setIsRename={setIsRename}
                    />
                ) : (
                    <h3 className="truncate text-sm font-medium">{name}</h3>
                )}
            </div>

            {/* RIGHT */}
            {!isRename && (
                <Options
                    onDestroy={handleDestroy}
                    onDuplicate={handleDuplicate}
                    onRename={handleRename}
                />
            )}
        </div>
    );
}

export default FlowItem;
