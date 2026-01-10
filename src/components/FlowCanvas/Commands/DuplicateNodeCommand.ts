import { Command } from "@/components/FlowCanvas/Commands/Command";
import type { FlowNode } from "../types/node/node.type";
import { useNodeStore } from "@/store/nodeStore";
import { v4 as uuid } from "uuid";

export class DuplicateNodeCommand implements Command {
    private newNode!: FlowNode;

    constructor(private sourceNodeId: string) {}

    execute() {
        const nodeStore = useNodeStore.getState();
        const sourceNode = nodeStore.nodes.find(
            (n) => n.id === this.sourceNodeId,
        );

        if (!sourceNode) return;

        const cloned = structuredClone(sourceNode);

        // 👉 1. Handle messages
        if (Array.isArray(cloned.data?.messages)) {
            cloned.data.messages = cloned.data.messages.map((msg: any) => {
                const newMsg = structuredClone(msg);

                // 🔹 handle button FIRST
                if (
                    (newMsg.type === "button" ||
                        newMsg.type === "media_template") &&
                    Array.isArray(newMsg.fields?.buttons)
                ) {
                    newMsg.fields.buttons = newMsg.fields.buttons.map(
                        (btn: any) => ({
                            ...btn,
                            id: uuid(),
                        }),
                    );
                } else if (
                    newMsg.type === "generic_template" &&
                    Array.isArray(newMsg.fields?.elements)
                ) {
                    newMsg.fields.elements = newMsg.fields.elements.map(
                        (element: any) => {
                            const newElement = {
                                ...element,
                                id: uuid(),
                            };

                            // 🔹 handle button inside element FIRST
                            if (Array.isArray(element.buttons)) {
                                newElement.buttons = element.buttons.map(
                                    (btn: any) => ({
                                        ...btn,
                                        id: uuid(),
                                    }),
                                );
                            }

                            return newElement;
                        },
                    );
                }

                newMsg.id = uuid();

                return newMsg;
            });
        } else if (cloned.data?.messages) {
            // collection / object
            cloned.data.messages = {
                ...cloned.data.messages,
                id: uuid(),
            };
        }

        // 👉 2. Create new node
        this.newNode = {
            ...cloned,
            id: uuid(),
            position: {
                x: sourceNode.position.x + 300,
                y: sourceNode.position.y,
            },
            selected: false,
        };

        nodeStore.addNode(this.newNode);
    }

    undo() {
        if (!this.newNode) return;

        useNodeStore.getState().removeNode(this.newNode.id);
    }
}
