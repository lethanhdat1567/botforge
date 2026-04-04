import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    onAddGeneric: () => void;
};

function AddGeneric({ onAddGeneric }: Props) {
    return (
        <Button onClick={onAddGeneric} variant="default" className="gap-1">
            <Plus className="size-4" />
            Thêm mục
        </Button>
    );
}

export default AddGeneric;
