import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    value?: "active" | "inactive";
    onChange: (value: "active" | "inactive") => void;
};

function SelectStatus({ value, onChange }: Props) {
    return (
        <Select value={value ?? "active"} onValueChange={onChange}>
            <SelectTrigger className="w-45 rounded-none">
                <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default SelectStatus;
