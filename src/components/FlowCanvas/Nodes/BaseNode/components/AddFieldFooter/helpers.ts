import { menuData } from "@/components/FlowCanvas/Canvas/components/ContextMenu/data";
import { NodeType } from "@/components/FlowCanvas/Nodes/BaseNode/data";

export function getMenuByNodeType(type: NodeType) {
    return menuData.find((menu) => menu.category === type);
}
