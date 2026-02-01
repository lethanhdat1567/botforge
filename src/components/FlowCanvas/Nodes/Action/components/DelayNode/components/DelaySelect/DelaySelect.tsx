import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    unit: "second" | "minute" | "hour";
    onChangeUnit: (unit: "second" | "minute" | "hour") => void;
};

function DelaySelect({ unit, onChangeUnit }: Props) {
    return (
        <Select value={unit} onValueChange={onChangeUnit}>
            <SelectTrigger className="w-30 bg-white">
                <SelectValue placeholder="Time unit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="second">Giây</SelectItem>
                <SelectItem value="minute">Phút</SelectItem>
                <SelectItem value="hour">Giờ</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default DelaySelect;
