"use client";

import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";

type Props = {
    text: string;
    buttons: ButtonNode[];
    setErrors: any;
    nodeId: string;
    fieldId: string;
    variable?: string;
};

function AskBlock({
    nodeId,
    fieldId,
    text,
    buttons,
    setErrors,
    variable,
}: Props) {
    function commitText(nextText: string) {
        if (nextText === text) return;

        FlowController.updateNodePayload(nodeId, fieldId, {
            text: nextText,
        });
    }

    function handleSetButtons(lists: ButtonNode[]) {
        FlowController.updateNodePayload(nodeId, fieldId, {
            buttons: lists,
        });
    }

    return (
        <div className="space-y-2">
            <TextArea
                value={text}
                onCommit={commitText}
                setErrors={setErrors}
                placeholder="Thêm nội dung..."
            />

            <ButtonList
                buttonLists={buttons}
                setButtonList={handleSetButtons}
                setErrors={setErrors}
                variable={variable}
            />
        </div>
    );
}

export default AskBlock;
