"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

type Props = {
    onCommit: (variable: string, postback: string) => void;
    variableBtnValue: string;
    postbackBtnValue: string;
};

function ButtonSetVariable({
    onCommit,
    variableBtnValue,
    postbackBtnValue,
}: Props) {
    const [variableValue, setVariableValue] = useState(variableBtnValue || "");
    const [postbackValue, setPostbackValue] = useState(postbackBtnValue || "");

    // sync khi undo / redo / external update
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVariableValue(variableBtnValue || "");
    }, [variableBtnValue]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPostbackValue(postbackBtnValue || "");
    }, [postbackBtnValue]);

    const commitChange = () => {
        if (
            variableValue === variableBtnValue &&
            postbackValue === postbackBtnValue
        )
            return;

        onCommit(variableValue, postbackValue);
    };

    return (
        <div className="mt-4 space-y-4">
            <div>
                <Label className="mb-3">Biến của bạn:</Label>
                <Input
                    className="w-full"
                    placeholder="Biến..."
                    value={variableValue}
                    onChange={(e) => setVariableValue(e.target.value)}
                    onBlur={commitChange}
                />
            </div>

            <div>
                <Label className="mb-3">Giá trị của biến:</Label>
                <Input
                    className="w-full"
                    placeholder="Giá trị..."
                    value={postbackValue}
                    onChange={(e) => setPostbackValue(e.target.value)}
                    onBlur={commitChange}
                />
            </div>
        </div>
    );
}

export default ButtonSetVariable;
