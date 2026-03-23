import { FinalConnectionState, InternalNode } from "@xyflow/react";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import { useContextMenuStore } from "@/store/contextMenuStore";

export function useFlowConnect() {
    const openMenu = useContextMenuStore((s) => s.openAt);

    const handleEndConnect = (
        event: MouseEvent | TouchEvent,
        connectionState: FinalConnectionState<InternalNode>,
    ) => {
        const { fromNode, fromHandle } = connectionState;

        const eventTarget = event.target as HTMLElement | null;
        const targetNode = eventTarget?.closest("[data-node-id]");
        const toNodeId = targetNode?.getAttribute("data-node-id");

        // 1. Kiểm tra điều kiện cơ bản: Phải kéo từ một Handle nào đó
        if (!fromNode || !fromHandle) return;

        const sourceNodeId = fromNode.id;
        const sourceHandleId = fromHandle.id || "";

        // 2. Trường hợp thả chuột vào một Node cụ thể (toNode có tồn tại)
        if (toNodeId) {
            const targetNodeId = toNodeId;

            // Chặn việc tự nối chính mình (nếu logic của bạn không cho phép)
            if (sourceNodeId === targetNodeId) return;

            // Phân loại logic xử lý dựa trên loại Handle
            if (sourceHandleId.startsWith("btn-source-")) {
                FlowController.connectByButtonHandle({
                    sourceNodeId,
                    targetNodeId,
                    buttonId: sourceHandleId.replace("btn-source-", ""),
                });
            } else if (sourceHandleId.startsWith("condition-source-")) {
                FlowController.connectByConditionHandle({
                    sourceNodeId,
                    targetNodeId,
                    conditionId: sourceHandleId.replace(
                        "condition-source-",
                        "",
                    ),
                });
            } else {
                // Logic kết nối mặc định cho các loại handle khác
                FlowController.connect({
                    source: sourceNodeId,
                    sourceHandle: sourceHandleId,
                    target: targetNodeId,
                    targetHandle: `node-target-${targetNodeId}`,
                });
            }
            return;
        }

        // 3. Trường hợp thả chuột ra vùng trống (toNode là null)
        // Kiểm tra xem vị trí thả có nằm trên một phần tử DOM của Node nào không (fallback)
        const targetElement = event.target as HTMLElement | null;
        const targetNodeDom = targetElement?.closest("[data-node-id]");

        if (targetNodeDom) {
            const targetNodeId = targetNodeDom.getAttribute("data-node-id");
            if (targetNodeId && targetNodeId !== sourceNodeId) {
                FlowController.connect({
                    source: sourceNodeId,
                    sourceHandle: sourceHandleId,
                    target: targetNodeId,
                    targetHandle: `node-target-${targetNodeId}`,
                });
            }
        } else {
            // Thả ra hoàn toàn vùng trống -> Mở menu để tạo Node mới
            // Ép kiểu để lấy tọa độ chuột chính xác từ event
            const mouseEvent = event as MouseEvent;
            openMenu(mouseEvent.clientX, mouseEvent.clientY);
        }
    };

    return {
        handleEndConnect,
    };
}
