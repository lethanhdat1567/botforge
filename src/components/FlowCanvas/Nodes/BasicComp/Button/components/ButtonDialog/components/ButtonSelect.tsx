import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type SelectOption = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
};

function CustomSelect({
    value,
    onValueChange,
    options,
    placeholder = "Chọn...",
    className = "",
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside, true);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onValueChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
                <span className={selectedOption ? "" : "text-muted-foreground"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="border-input bg-popover absolute top-full left-0 z-50 mt-1 w-full rounded-md border shadow-md">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`hover:bg-accent hover:text-accent-foreground w-full cursor-pointer px-3 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md ${
                                value === option.value ? "bg-accent" : ""
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;
