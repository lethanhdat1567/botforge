import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Timeout = {
    duration: number;
    unit: "second" | "minute" | "hour";
};

type Props = {
    value: Timeout;
    onChangeDuration: (duration: number) => void;
    onCommitDuration: () => void;
    onChangeUnit: (unit: Timeout["unit"]) => void;
};

function TimeoutCustomFields({
    value,
    onChangeDuration,
    onCommitDuration,
    onChangeUnit,
}: Props) {
    return (
        <div className="flex items-center gap-2">
            <Input
                type="number"
                min={1}
                max={99}
                step={1}
                value={value.duration || ""}
                onChange={(e) => onChangeDuration(Number(e.target.value))}
                onBlur={onCommitDuration}
            />

            <Select value={value.unit} onValueChange={onChangeUnit}>
                <SelectTrigger className="min-w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="second">Giây</SelectItem>
                    <SelectItem value="minute">Phút</SelectItem>
                    <SelectItem value="hour">Giờ</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default TimeoutCustomFields;
