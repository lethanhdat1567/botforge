"use client";

import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import BaseNode from "@/components/FlowCanvas/Nodes/BaseNode/BaseNode";
import AskBlock from "@/components/FlowCanvas/Nodes/Collection/components/AskBlock/AskBlock";
import CollectBlock from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/CollectBlock";
import { CollectionData } from "@/components/FlowCanvas/types/node/collection.type";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

function CollectionNode(props: any) {
    const [errors, setErrors] = useState([]);
    const messageCollection = props.data.messages as CollectionData;

    return (
        <BaseNode childProps={props}>
            <BaseContent
                nodeId={props.id}
                payloadId={props.data.messages.id}
                errors={errors}
                isHideToolbar={true}
            >
                <div className="p-2">
                    <AskBlock
                        text={messageCollection.fields.text}
                        buttons={messageCollection.fields.buttons}
                        variable={messageCollection.fields.variable.key}
                        nodeId={props.id}
                        fieldId={props.data.messages.id}
                        setErrors={setErrors}
                    />
                    <Separator className="my-2" />
                    <CollectBlock
                        fallback={messageCollection.fields.fallback}
                        variable={messageCollection.fields.variable}
                        nodeId={props.id}
                        fieldId={props.data.messages.id}
                        setErrors={setErrors}
                    />
                </div>
            </BaseContent>
        </BaseNode>
    );
}

export default CollectionNode;
