import GenericItem from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericItem/GenericItem";
import {
    GenericTemplateData,
    GenericTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";

type Props = {
    nodeId: string;
    genericLists: GenericTemplateData["fields"];
};

function GenericExpand({ nodeId, genericLists }: Props) {
    function handleUpdateGeneric(generic: GenericTemplateElement) {}

    return (
        <div className="flex items-stretch gap-4">
            {genericLists.elements.map((item: any, index: number) => (
                <GenericItem
                    key={index}
                    nodeId={nodeId}
                    generic={item}
                    onUpdateGeneric={handleUpdateGeneric}
                />
            ))}
        </div>
    );
}

export default GenericExpand;
