import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

type Props = {
    onChange: any;
    variableBtnValue: string;
    postbackBtnValue: string;
};

function ButtonSetVariable({
    onChange,
    variableBtnValue,
    postbackBtnValue,
}: Props) {
    const [variableValue, setVariableValue] = useState(variableBtnValue || "");
    const [postbackValue, setPostbackValue] = useState(postbackBtnValue || "");
    const debouncedVariableValue = useDebounce(variableValue, 500);
    const debouncedPostbackValue = useDebounce(postbackValue, 500);

    useEffect(() => {
        onChange(debouncedVariableValue, debouncedPostbackValue);
    }, [debouncedVariableValue, debouncedPostbackValue]);

    return (
        <div className="mt-4 space-y-4">
            <div>
                <Label className="mb-3">Bien của bạn:</Label>
                <Input
                    className="w-full"
                    placeholder="Variable..."
                    onChange={(e) => setVariableValue(e.target.value)}
                    value={variableValue}
                />
            </div>
            <div>
                <Label className="mb-3">Postback của bạn:</Label>
                <Input
                    className="w-full"
                    placeholder="Postpack..."
                    onChange={(e) => setPostbackValue(e.target.value)}
                    value={postbackValue}
                />
            </div>
        </div>
    );
}

export default ButtonSetVariable;
