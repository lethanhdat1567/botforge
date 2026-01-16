import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import ButtonContinue from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/components/ButtonContinue";
import CustomSelect from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/components/ButtonSelect";
import ButtonSetVariable from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/components/ButtonSetVariable";
import ButtonUrl from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/components/ButtonUrl";
import {
    options,
    titleMap,
} from "@/components/FlowCanvas/Nodes/BasicComp/Button/components/ButtonDialog/data";
import { ButtonNode } from "@/components/FlowCanvas/types/node/button.type";
import { useState } from "react";

type Props = {
    showTooltip: boolean;
    btn: ButtonNode;
    onChange: any;
};

function ButtonDialog({ showTooltip, btn, onChange }: Props) {
    const [selected, setSelected] = useState<string>("continue");

    function handleUrlChange(url: string) {
        const newBtn = { ...btn, payload: { url } };
        onChange(newBtn);
    }

    function handlePostbackChange(keyValue: string, variableValue: string) {
        const newBtn = {
            ...btn,
            payload: { key: keyValue, value: variableValue },
        };
        onChange(newBtn);
    }

    function handleSelect(selectValue: string) {
        let payloadData = null;
        if (selectValue === "url") {
            payloadData = { url: "" };
            FlowController.removeButtonEdge(btn.id);
        } else if (selectValue === "postback") {
            payloadData = { key: "", value: "" };
        } else if (selectValue === "continue") payloadData = { next: "" };
        const newBtn = {
            ...btn,
            type: selectValue,
            payload: payloadData,
            children: null,
        };

        onChange(newBtn);
        setSelected(selectValue);
    }

    return (
        <div
            className={`${showTooltip ? "visible opacity-100" : "invisible opacity-0"} bg-background absolute top-1/2 -right-4 z-10 block w-100 translate-x-full -translate-y-1/2 rounded-sm border px-3 py-2 text-sm shadow-md`}
        >
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-md font-medium">{titleMap[selected]}</h3>
                <CustomSelect
                    value={selected}
                    onValueChange={handleSelect}
                    options={options}
                    className="w-40"
                />
            </div>
            <div>
                {selected === "continue" && <ButtonContinue />}
                {selected === "url" && btn?.type === "url" && (
                    <ButtonUrl
                        onChange={handleUrlChange}
                        urlValue={btn.payload.url}
                    />
                )}
                {selected === "postback" && btn?.type === "postback" && (
                    <ButtonSetVariable
                        onChange={handlePostbackChange}
                        variableBtnValue={btn.payload.variable}
                        postbackBtnValue={btn.payload.value}
                    />
                )}
            </div>
        </div>
    );
}

export default ButtonDialog;
