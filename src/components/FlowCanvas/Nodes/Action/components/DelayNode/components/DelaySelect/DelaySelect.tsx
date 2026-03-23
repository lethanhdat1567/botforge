import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    unit: "s" | "m" | "h";
    onChangeUnit: (unit: "s" | "m" | "h") => void;
};

function DelaySelect({ unit, onChangeUnit }: Props) {
    return (
        <Select value={unit} onValueChange={onChangeUnit}>
            <SelectTrigger className="w-30 bg-white">
                <SelectValue placeholder="Time unit" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="s">Giây</SelectItem>
                <SelectItem value="m">Phút</SelectItem>
                <SelectItem value="h">Giờ</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default DelaySelect;
