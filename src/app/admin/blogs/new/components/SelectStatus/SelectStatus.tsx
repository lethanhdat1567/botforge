import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Status = "draft" | "published" | "archived";

type Props = {
    value?: Status;
    onChange: (value: Status) => void;
};

function SelectStatus({ value, onChange }: Props) {
    return (
        <Select
            value={value ?? "draft"}
            onValueChange={(v) => onChange(v as Status)}
        >
            <SelectTrigger className="w-45 rounded-none">
                <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="published">Đã xuất bản</SelectItem>
                <SelectItem value="archived">Lưu trữ</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default SelectStatus;
