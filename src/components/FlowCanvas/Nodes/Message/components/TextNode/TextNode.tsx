import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { ButtonMessageData } from "@/components/FlowCanvas/types/node/message.type";
import { useState } from "react";

export type ErrorType = {
    field: string;
    message: string;
}[];

type Props = {
    nodeId: string;
    payload: ButtonMessageData;
};

function TextNode({ nodeId, payload }: Props) {
    const [errors, setErrors] = useState<ErrorType>([]);

    function handleUpdateText(text: string) {
        FlowController.updateNodePayload(nodeId, payload.id, {
            text: text,
        });
    }

    function handleUpdateBtns(lists: ButtonNode[]) {
        FlowController.updateNodePayload(nodeId, payload.id, {
            buttons: lists,
        });
    }

    return (
        <BaseContent nodeId={nodeId} payloadId={payload.id} errors={errors}>
            <div className="space-y-4 p-2">
                <TextArea
                    value={payload.fields.text}
                    onCommit={handleUpdateText}
                    setErrors={setErrors}
                />
                <ButtonList
                    buttonLists={payload.fields.buttons}
                    setErrors={setErrors}
                    setButtonList={handleUpdateBtns}
                />
            </div>
        </BaseContent>
    );
}

export default TextNode;
