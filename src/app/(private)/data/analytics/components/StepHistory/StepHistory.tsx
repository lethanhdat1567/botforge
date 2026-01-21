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
import StepTimeline from "@/app/(private)/data/analytics/components/StepHistory/StepTimeline";

type Props = {
    history: {
        stepId: string;
        enteredAt: string;
    }[];
};

function StepHistory({ history }: Props) {
    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <NotepadText className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>

                <TooltipContent>
                    <p>View step history</p>
                </TooltipContent>
            </Tooltip>

            <DialogContent className="max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Flow Execution</DialogTitle>
                </DialogHeader>

                {history.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                        No step history
                    </p>
                ) : (
                    <StepTimeline history={history} />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default StepHistory;
