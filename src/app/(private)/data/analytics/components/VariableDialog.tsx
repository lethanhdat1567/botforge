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
                    className="border-border hover:bg-muted flex h-7 gap-2 rounded-none border px-2 text-[11px] font-normal tracking-tight uppercase"
                >
                    <Database className="h-3 w-3" />
                    Dữ liệu
                </Button>
            </DialogTrigger>
            <DialogContent className="border-border max-w-md rounded-none p-0 shadow-lg">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-foreground text-sm font-semibold tracking-widest uppercase">
                        Dữ liệu thu thập được
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-2">
                    <ScrollArea className="border-border max-h-[350px] rounded-none border">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="text-muted-foreground h-10 text-[10px] font-bold uppercase">
                                        Biến
                                    </TableHead>
                                    <TableHead className="text-muted-foreground h-10 text-[10px] font-bold uppercase">
                                        Giá trị
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {variableEntries.length > 0 ? (
                                    variableEntries.map(([key, value]) => (
                                        <TableRow
                                            key={key}
                                            className="border-border hover:bg-muted/50 transition-none"
                                        >
                                            <TableCell className="text-foreground py-3 font-mono text-[11px] font-medium">
                                                {key}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground py-3 text-[11px]">
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
                                            className="text-muted-foreground h-32 text-center text-[11px]"
                                        >
                                            Chưa có dữ liệu nào.
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
