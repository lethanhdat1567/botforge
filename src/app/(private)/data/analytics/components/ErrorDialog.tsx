// components/flow-record/ErrorLogDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ErrorLogDialog({ log }: { log: string }) {
    if (!log) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-left text-[10px] tracking-tighter text-red-500 uppercase hover:text-red-600 hover:underline">
                    [ Error Details ]
                </button>
            </DialogTrigger>
            <DialogContent className="border-border max-w-xl rounded-none p-0 shadow-xl">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-foreground text-xs font-bold tracking-[0.2em] uppercase">
                        System Incident Log
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-2">
                    <ScrollArea className="border-border bg-muted/50 h-[250px] w-full border p-4">
                        <code className="text-muted-foreground font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap">
                            {log}
                        </code>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
