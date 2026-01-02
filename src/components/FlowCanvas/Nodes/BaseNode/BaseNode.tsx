import AddFieldFooter from "@/components/FlowCanvas/Nodes/BaseNode/components/AddFieldFooter/AddFieldFooter";
import Handler from "@/components/FlowCanvas/Nodes/BaseNode/components/Handler/Handler";
import Heading from "@/components/FlowCanvas/Nodes/BaseNode/components/Heading/Heading";
import Toolbar from "@/components/FlowCanvas/Nodes/BaseNode/components/Toolbar/Toolbar";
import {
    NodeType,
    typeNodeData,
} from "@/components/FlowCanvas/Nodes/BaseNode/data";

type Props = {
    children?: React.ReactNode;
    childProps: any;
    isContentDragging?: boolean;
};

function BaseNode({ children, childProps, isContentDragging }: Props) {
    const nodeTypeData = typeNodeData[childProps.type as NodeType];

    return (
        <div
            style={{ "--c": nodeTypeData.color } as React.CSSProperties}
            className={` ${isContentDragging ? "nodrag" : ""} group/base bg-background w-70 space-y-4 rounded-md border p-3 pb-0 text-[14px] hover:border-(--c) ${childProps.selected ? "border-(--c)" : ""} `}
        >
            {/* Heading */}
            <Heading nodeTypeData={nodeTypeData} name={childProps.data.label} />

            {/* Content */}
            <div>{children}</div>

            {/* Fooder */}
            <AddFieldFooter />

            {/* Handler */}
            <Handler />

            {/* Toolbar */}
            <Toolbar />
        </div>
    );
}

export default BaseNode;
