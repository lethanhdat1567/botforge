import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type TimeoutMode = "default" | "custom";

type Props = {
    value: TimeoutMode;
    onChange: (mode: TimeoutMode) => void;
};

function TimeoutModeSelect({ value, onChange }: Props) {
    return (
        <div className="flex items-center gap-2">
            <label className="w-32 font-medium">Timeout Bot:</label>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="min-w-40">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Dùng mặc định</SelectItem>
                    <SelectItem value="custom">Tự tuỳ chỉnh</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default TimeoutModeSelect;
