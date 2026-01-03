import BaseContent from "@/components/FlowCanvas/Nodes/BaseContent/BaseContent";
import ButtonList from "@/components/FlowCanvas/Nodes/BasicComp/Button/ButtonList";
import TextArea from "@/components/FlowCanvas/Nodes/BasicComp/TextArea/TextArea";
import GenericUploadImage from "@/components/FlowCanvas/Nodes/Message/components/GenericNode/components/GenericItem/GenericUploadImage";
import { GenericTemplateElement } from "@/components/FlowCanvas/types/node/message.type";
import { useState } from "react";

type Props = {
    nodeId: string;
    generic: GenericTemplateElement;
    onUpdateGeneric: any;
};

function GenericItem({ nodeId, generic }: Props) {
    const { title, subtitle, image_url, default_action, buttons } = generic;
    const [errors, setErrors] = useState([]);

    function handleUpload(src: string) {}
    function handleChangeTitle(title: string) {}
    function handleChangeUrl(url: string) {}

    function handleSetBtnList(lists: any) {}

    return (
        <BaseContent id={nodeId}>
            <div className="shrink-0 space-y-4">
                <GenericUploadImage src={image_url} onUpload={handleUpload} />
                <div className="space-y-2">
                    <TextArea
                        value={title}
                        onChange={handleChangeTitle}
                        setErrors={setErrors}
                    />
                    <TextArea
                        value={subtitle || ""}
                        onChange={handleChangeTitle}
                    />
                    <TextArea
                        value={default_action.url}
                        onChange={handleChangeUrl}
                        setErrors={setErrors}
                    />
                </div>

                <ButtonList
                    buttonLists={buttons || []}
                    setButtonList={handleSetBtnList}
                    setErrors={setErrors}
                />
            </div>
        </BaseContent>
    );
}

export default GenericItem;
