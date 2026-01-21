import { Input } from "@/components/ui/input";

function DataTableFilter({ table, column }: { table: any; column: any }) {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Filter emails..."
                value={
                    (table.getColumn(column)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table.getColumn(column)?.setFilterValue(event.target.value)
                }
                className="w-md rounded-none"
            />
        </div>
    );
}

export default DataTableFilter;
