import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { NotepadText } from "lucide-react";
import VariableTable from "@/app/(private)/data/analytics/components/VariableDialog/VariableTable";

function VariableDialog({ variable }: { variable: any }) {
    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <NotepadText />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>

                <TooltipContent>
                    <p>View variable</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User variable</DialogTitle>
                </DialogHeader>
                <VariableTable variable={variable} />
            </DialogContent>
        </Dialog>
    );
}

export default VariableDialog;
