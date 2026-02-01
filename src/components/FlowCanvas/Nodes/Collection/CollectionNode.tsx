"use client";

import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import BaseNode from "@/components/FlowCanvas/Nodes/BaseNode/BaseNode";
import AskBlock from "@/components/FlowCanvas/Nodes/Collection/components/AskBlock/AskBlock";
import CollectBlock from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/CollectBlock";
import { useState } from "react";

function CollectionNode(props: any) {
    const [errors, setErrors] = useState([]);
    const nodeContent = props.data.messages.fields;

    return (
        <BaseNode childProps={props}>
            <BaseContent
                nodeId={props.id}
                payloadId={props.data.messages.id}
                errors={errors}
                isHideToolbar={true}
            >
                <AskBlock
                    text={nodeContent.text}
                    buttons={nodeContent.buttons}
                    variable={nodeContent.variable.key}
                    nodeId={props.id}
                    fieldId={props.data.messages.id}
                    setErrors={setErrors}
                />
                <CollectBlock
                    variable={nodeContent.variable}
                    nodeId={props.id}
                    fieldId={props.data.messages.id}
                    setErrors={setErrors}
                />
            </BaseContent>
        </BaseNode>
    );
}

export default CollectionNode;
