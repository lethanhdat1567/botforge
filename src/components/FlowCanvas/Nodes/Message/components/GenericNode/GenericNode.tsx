import {
    GenericTemplateData,
    GenericTemplateElement,
} from "@/components/FlowCanvas/types/node/message.type";
import { Button } from "@/components/ui/button";
import { ChevronsDownUp, Maximize2 } from "lucide-react";
import { useState } from "react";
import GenericCarousel from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericCarousel/GenericCarousel";
import GenericExpand from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericExpand/GenericExpand";

type Props = {
    nodeId: string;
    payload: GenericTemplateData;
};

function GenericNode({ nodeId, payload }: Props) {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <Button
                onClick={() => setExpand(!expand)}
                className="mb-2"
                variant={"outline"}
            >
                {expand ? (
                    <>
                        <ChevronsDownUp /> Thu nhỏ
                    </>
                ) : (
                    <>
                        <Maximize2 /> Mở rộng
                    </>
                )}
            </Button>

            {expand ? (
                <GenericExpand nodeId={nodeId} genericLists={payload.fields} />
            ) : (
                <GenericCarousel
                    nodeId={nodeId}
                    genericLists={payload.fields}
                />
            )}
        </div>
    );
}

export default GenericNode;
