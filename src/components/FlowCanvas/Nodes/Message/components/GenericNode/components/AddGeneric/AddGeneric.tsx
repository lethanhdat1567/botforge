import { Button } from "@/components/ui/button";

type Props = {
    onAddGeneric: () => void;
};

function AddGeneric({ onAddGeneric }: Props) {
    return (
        <div>
            <Button onClick={onAddGeneric} variant={"outline"}>
                Thêm mẫu
            </Button>
        </div>
    );
}

export default AddGeneric;
