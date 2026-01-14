import CollectSheetContent from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/CollectSheetContent";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
    variable: VariableData;
    nodeId: string;
    fieldId: string;
};

function CollectBlock({ variable, nodeId, fieldId }: Props) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="mt-2 cursor-pointer rounded-sm bg-white p-2">
                    {variable.key}
                </div>
            </SheetTrigger>
            <SheetContent className="min-w-[30vw]!">
                <SheetHeader>
                    <SheetTitle>Cấu hình node thu thập</SheetTitle>
                </SheetHeader>
                <CollectSheetContent
                    variable={variable}
                    nodeId={nodeId}
                    fieldId={fieldId}
                />
            </SheetContent>
        </Sheet>
    );
}

export default CollectBlock;
