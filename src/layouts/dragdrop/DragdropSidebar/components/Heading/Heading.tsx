import PrivateLogo from "@/components/PrivateLogo";
import { Button } from "@/components/ui/button";
import { PanelLeftClose } from "lucide-react";

function Heading({
    setExpand,
}: {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-2">
            <PrivateLogo />
            <Button
                variant={"ghost"}
                size={"icon-lg"}
                onClick={() => setExpand(false)}
            >
                <PanelLeftClose />
            </Button>
        </div>
    );
}

export default Heading;
