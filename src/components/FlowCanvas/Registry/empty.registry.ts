import type { FlowNodeType } from "@/components/FlowCanvas/types/node/node.type";
import type { NodeRegistry } from "@/components/FlowCanvas/types/registry/registry";

export function createEmptyRegistry<TType extends FlowNodeType>(): NodeRegistry<
    TType,
    Record<string, unknown>
> {
    return {
        type: "" as TType,

        create() {
            throw new Error("Registry not implemented");
        },

        update(node) {
            return node;
        },
    };
}
