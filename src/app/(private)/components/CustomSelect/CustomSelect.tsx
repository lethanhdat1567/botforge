import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Định nghĩa kiểu dữ liệu cho Option
export type SelectOption = {
    label: string;
    value: string | number;
};

type CustomSelectProps = {
    value?: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
};

function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Select an option",
    className = "",
}: CustomSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className={`w-full rounded-none focus:ring-0 ${className}`}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.length > 0 ? (
                    options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={String(option.value)}
                        >
                            {option.label}
                        </SelectItem>
                    ))
                ) : (
                    <div className="text-muted-foreground p-2 text-center text-sm">
                        No options available
                    </div>
                )}
            </SelectContent>
        </Select>
    );
}

export default CustomSelect;
