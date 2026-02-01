import { Button } from "@/components/ui/button";
import { Expand, Minimize } from "lucide-react";

type Props = {
    isExpand: boolean;
    onToggleExpand: () => void;
};

function ExpandBtn({ isExpand, onToggleExpand }: Props) {
    return (
        <Button
            onClick={onToggleExpand}
            variant="outline"
            className="flex flex-1 items-center gap-2"
        >
            {isExpand ? (
                <>
                    <Minimize size={16} />
                    <span>Thu nhỏ</span>
                </>
            ) : (
                <>
                    <Expand size={16} />
                    <span>Mở rộng</span>
                </>
            )}
        </Button>
    );
}

export default ExpandBtn;
