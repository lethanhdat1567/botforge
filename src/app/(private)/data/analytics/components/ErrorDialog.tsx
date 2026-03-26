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
            <DialogContent className="max-w-xl rounded-none border-neutral-200 p-0 shadow-xl">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xs font-bold tracking-[0.2em] text-neutral-800 uppercase">
                        System Incident Log
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-2">
                    <ScrollArea className="h-[250px] w-full border border-neutral-100 bg-neutral-50/50 p-4">
                        <code className="font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-neutral-600">
                            {log}
                        </code>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
