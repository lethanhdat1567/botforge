import { Command } from "@/components/FlowCanvas/Commands/Command";
import { NodeRegistryMap } from "@/components/FlowCanvas/Registry";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { FlowNode } from "@/components/FlowCanvas/types/node/node.type";
import { useEdgeStore } from "@/store/edgeStore";
import { useNodeStore } from "@/store/nodeStore";
import { Connection, MarkerType } from "@xyflow/react";
import next from "next";
import { v4 as uuid } from "uuid";

export interface ButtonConnectionData {
    sourceNodeId: string;
    targetNodeId: string;
    buttonId: string; // Chính là sourceHandle sau khi đã replace prefix
}

export class ConnectButtonEdge implements Command {
    private backupNode?: FlowNode;
    private createdEdgeId?: string;

    // Chỉ nhận vào những gì thực sự cần để xử lý logic
    constructor(private data: ButtonConnectionData) {}

    execute() {
        const { sourceNodeId, targetNodeId, buttonId } = this.data;
        const nodeStore = useNodeStore.getState();

        // 1. Tìm Node nguồn
        const sourceNode = nodeStore.nodes.find((n) => n.id === sourceNodeId);
        if (!sourceNode || !Array.isArray(sourceNode.data?.messages))
            return false;

        // Lưu backup để undo
        this.backupNode = structuredClone(sourceNode);

        // 2. Tìm message chứa button đang được kéo
        const targetMessage = sourceNode.data.messages.find((msg: any) => {
            const hasInFields = msg.fields?.buttons?.some(
                (btn: any) => btn.id === buttonId,
            );
            if (hasInFields) return true;

            const hasInElements = msg.fields?.elements?.some((el: any) =>
                el.buttons?.some((btn: any) => btn.id === buttonId),
            );

            return hasInElements;
        });

        if (!targetMessage) return false;

        let fieldsToUpdate: any = {};
        const isGeneric = targetMessage.type === "generic_template";

        if (isGeneric) {
            fieldsToUpdate = {
                elements: targetMessage.fields.elements.map((el: any) => ({
                    ...el,
                    buttons: (el.buttons || []).map((btn: any) =>
                        btn.id === buttonId
                            ? {
                                  ...btn,
                                  payload: {
                                      ...btn.payload,
                                      next: targetNodeId,
                                  },
                              }
                            : btn,
                    ),
                })),
            };
        } else {
            fieldsToUpdate = {
                buttons: ((targetMessage.fields as any).buttons || []).map(
                    (btn: any) =>
                        btn.id === buttonId
                            ? {
                                  ...btn,
                                  payload: {
                                      ...btn.payload,
                                      next: targetNodeId,
                                  },
                              }
                            : btn,
                ),
            };
        }

        // 4. Update Node thông qua Registry (Data Layer)
        const registry = NodeRegistryMap[sourceNode.type];
        if (!registry?.updatePayload) return false;

        const newNode = registry.updatePayload(
            sourceNode as any,
            targetMessage.id,
            fieldsToUpdate,
        );

        nodeStore.updateNode(sourceNodeId, newNode);

        // 5. Thêm dây nối (UI Layer)
        const edgeStore = useEdgeStore.getState();
        this.createdEdgeId = uuid();

        edgeStore.addEdge({
            id: this.createdEdgeId,
            source: sourceNodeId,
            target: targetNodeId,
            sourceHandle: `btn-source-${buttonId}`,
            type: "custom-edge",
            markerEnd: { type: MarkerType.Arrow },
        });

        return true;
    }

    undo() {
        if (this.backupNode) {
            useNodeStore
                .getState()
                .updateNode(this.backupNode.id, this.backupNode);
        }
        if (this.createdEdgeId) {
            useEdgeStore.getState().removeEdge(this.createdEdgeId);
        }
    }
}
