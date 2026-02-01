import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    status: "draft" | "published";
    onUpdateStatus: (value: "draft" | "published") => void;
};

const STATUS_LABEL = {
    draft: "Nháp",
    published: "Đã xuất bản",
};

const STATUS_COLOR = {
    draft: "bg-gray-400",
    published: "bg-green-500",
};

function ActionStatus({ status, onUpdateStatus }: Props) {
    return (
        <Select value={status} onValueChange={onUpdateStatus}>
            <SelectTrigger className="w-36 cursor-pointer border-0 p-0 shadow-none">
                <SelectValue placeholder="Trạng thái" asChild>
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-2 w-2 rounded-xs ${STATUS_COLOR[status]}`}
                        />
                        <span className="text-sm">{STATUS_LABEL[status]}</span>
                    </div>
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="draft" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-xs bg-gray-400" />
                        <span>Nháp</span>
                    </div>
                </SelectItem>

                <SelectItem value="published" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-xs bg-green-500" />
                        <span>Đã xuất bản</span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
}

export default ActionStatus;
