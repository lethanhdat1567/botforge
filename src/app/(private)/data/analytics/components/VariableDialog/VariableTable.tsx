import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function VariableTable({ variable }: { variable: Record<string, any> }) {
    if (!variable || Object.keys(variable).length === 0) {
        return <p className="text-muted-foreground text-sm">No data</p>;
    }

    const columns = Object.keys(variable);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    {columns.map((key) => (
                        <TableCell key={key}>{String(variable[key])}</TableCell>
                    ))}
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default VariableTable;
