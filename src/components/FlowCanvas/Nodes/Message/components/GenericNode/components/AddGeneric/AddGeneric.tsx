import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    onAddGeneric: () => void;
};

function AddGeneric({ onAddGeneric }: Props) {
    return (
        <div className="mb-2">
            <Button
                onClick={onAddGeneric}
                variant={"default"}
                className="w-full"
            >
                <Plus /> Thêm mục
            </Button>
        </div>
    );
}

export default AddGeneric;
