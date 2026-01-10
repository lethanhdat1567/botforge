import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Clock3 } from "lucide-react";

type Props = {
    rangeInput: number;
    setRangeInput: any;
};

function DelayInput({ rangeInput, setRangeInput }: Props) {
    function handleChangeInput(e: any) {
        const val = Number(e.target.value);

        // Cho phép xóa input
        if (e.target.value === "") {
            setRangeInput(null);
            return;
        }

        // Điều kiện > 0 và <= 100
        if (val <= 0) setRangeInput(1);
        else if (val > 100) setRangeInput(100);
        else setRangeInput(val);
    }

    return (
        <InputGroup>
            <InputGroupInput
                type="number"
                placeholder="Timer..."
                value={rangeInput || ""}
                min={1}
                max={100}
                onChange={handleChangeInput}
            />
            <InputGroupAddon>
                <Clock3 />
            </InputGroupAddon>
        </InputGroup>
    );
}

export default DelayInput;
