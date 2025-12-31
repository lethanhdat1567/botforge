import { Button } from "@/components/ui/button";
import { Command, PanelLeftClose } from "lucide-react";

function Heading({
    setExpand,
}: {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex items-center justify-between border-b pb-2">
            <a href="#" className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">BotForge</span>
                    <span className="truncate text-xs">ChatbotAI</span>
                </div>
            </a>
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
