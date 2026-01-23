import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    status: "draft" | "published";
    onUpdateStatus: (value: string) => void;
};

function ActionStatus({ status, onUpdateStatus }: Props) {
    return (
        <Select defaultValue={status} onValueChange={onUpdateStatus}>
            <SelectTrigger className="w-35 cursor-pointer border-0 p-0 shadow-none">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default ActionStatus;
