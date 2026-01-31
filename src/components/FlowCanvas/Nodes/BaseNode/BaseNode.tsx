import AddFieldFooter from "@/components/FlowCanvas/Nodes/BaseNode/components/AddFieldFooter/AddFieldFooter";
import Handler from "@/components/FlowCanvas/Nodes/BaseNode/components/Handler/Handler";
import Heading from "@/components/FlowCanvas/Nodes/BaseNode/components/Heading/Heading";
import Note from "@/components/FlowCanvas/Nodes/BaseNode/components/Note/Note";
import StartPinner from "@/components/FlowCanvas/Nodes/BaseNode/components/StartPinner/StartPinner";
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
            className={` ${isContentDragging ? "nodrag" : ""} group/base bg-background relative w-70 space-y-4 rounded-md border p-3 pb-0 text-[14px] hover:border-(--c) ${childProps.selected ? "border-(--c)" : ""} `}
            data-node-id={childProps.id}
        >
            {/* Heading */}
            <Heading
                nodeTypeData={nodeTypeData}
                name={childProps.data.label}
                nodeId={childProps.id}
            />

            {childProps.data.note && (
                <Note nodeId={childProps.id} noteData={childProps.data.note} />
            )}
            {/* Content */}
            <div>{children}</div>

            {/* Fooder */}
            {childProps.type !== "collection" && (
                <AddFieldFooter node={childProps} type={childProps.type} />
            )}

            {/* Toolbar */}
            <Toolbar node={childProps} />

            {/* Handler */}
            <Handler nodeId={childProps.id} />

            {childProps.data.markStart && <StartPinner />}
        </div>
    );
}

export default BaseNode;
