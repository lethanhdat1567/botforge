import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function VariableDialog({ variables }: { variables: Record<string, any> }) {
    const variableEntries = Object.entries(variables || {});

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex h-7 gap-2 rounded-none border-neutral-200 px-2 text-[11px] font-normal tracking-tight uppercase hover:bg-neutral-50"
                >
                    <Database className="h-3 w-3" />
                    Biến số
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-none border-neutral-200 p-0 shadow-lg">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-sm font-semibold tracking-widest text-neutral-800 uppercase">
                        Variables Log
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-2">
                    <ScrollArea className="max-h-[350px] rounded-none border border-neutral-100">
                        <Table>
                            <TableHeader className="bg-neutral-50/50">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="h-10 text-[10px] font-bold text-neutral-500 uppercase">
                                        Key
                                    </TableHead>
                                    <TableHead className="h-10 text-[10px] font-bold text-neutral-500 uppercase">
                                        Value
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {variableEntries.length > 0 ? (
                                    variableEntries.map(([key, value]) => (
                                        <TableRow
                                            key={key}
                                            className="border-neutral-100 transition-none hover:bg-neutral-50/50"
                                        >
                                            <TableCell className="py-3 font-mono text-[11px] font-medium text-neutral-900">
                                                {key}
                                            </TableCell>
                                            <TableCell className="py-3 text-[11px] text-neutral-600">
                                                {typeof value === "object"
                                                    ? JSON.stringify(value)
                                                    : String(value)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="h-32 text-center text-[11px] text-neutral-400"
                                        >
                                            No data recorded.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default VariableDialog;
