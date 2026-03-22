import { HttpError } from "@/http/helpers";
import Action from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/components/FlowItem/components/Action/Action";
import ConnectAlert from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/components/FlowItem/components/ConnectAlert/ConnectAlert";
import NameBlock from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/components/FlowItem/components/NameBlock/NameBlock";
import StatusBadge from "@/layouts/dragdrop/DragdropSidebar/components/FlowList/components/FlowItem/components/StatusBadge/StatusBadge";
import { FlowList, flowService } from "@/services/flowService";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    onRefresh: () => void;
    flow: FlowList;
};

function FlowItem({ flow, onRefresh }: Props) {
    const [isRename, setIsRename] = useState(false);

    async function handleDestroy() {
        try {
            await flowService.removeFlow(flow.id);
            toast.success("Xóa flow thành công");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Xóa Flow thất bại!.");
        }
    }

    async function handleDuplicate() {
        try {
            await flowService.duplicateFlow(flow.id);
            toast.success("Nhân bản flow thành công");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Nhân bản Flow thất bại!.");
        }
    }

    async function handleChangeStatus() {
        try {
            await flowService.toggleActive(flow.id);
            onRefresh();
            toast.success("Đổi trạng thái thành công!");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                if (error.status === 400) {
                    toast.error("Flow chưa kết nối page, không thể active!.");
                }
            }
        }
    }

    return (
        <div className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm p-2 transition hover:bg-slate-100">
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="shrink-0">
                    <ConnectAlert pageUid={flow.pageId} />
                </div>

                <div className="shrink-0">
                    <StatusBadge status={flow.status} />
                </div>

                <NameBlock
                    flowId={flow.id}
                    isRename={isRename}
                    name={flow.name}
                    onRename={() => {
                        onRefresh();
                        setIsRename(false);
                    }}
                />
            </div>

            <Action
                onRename={() => setIsRename(true)}
                onDuplicate={handleDuplicate}
                onDestroy={handleDestroy}
                onChangeStatus={handleChangeStatus}
            />
        </div>
    );
}

export default FlowItem;
