import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

type Props = {
    text: string;
    buttons: ButtonNode[];
    setErrors: any;
    nodeId: string;
    fieldId: string;
};

function AskBlock({ nodeId, fieldId, text, buttons, setErrors }: Props) {
    const [textValue, setTextValue] = useState(text);
    const debounceText = useDebounce(textValue, 300);

    function handleSetButtons(lists: ButtonNode[]) {
        FlowController.updateNodePayload(nodeId, fieldId, { buttons: lists });
    }

    function handleSetText(text: string) {
        setTextValue(text);
    }

    useEffect(() => {
        FlowController.updateNodePayload(nodeId, fieldId, { text: textValue });
    }, [debounceText, fieldId, nodeId, textValue]);

    return (
        <div>
            <TextArea
                value={textValue}
                onChange={handleSetText}
                setErrors={setErrors}
            />
            <ButtonList
                buttonLists={buttons}
                setButtonList={handleSetButtons}
                setErrors={setErrors}
            />
        </div>
    );
}

export default AskBlock;
