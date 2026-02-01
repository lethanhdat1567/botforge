"use client";

import CollectSheetContent from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/CollectSheetContent";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";

type Props = {
    variable: VariableData;
    nodeId: string;
    fieldId: string;
    setErrors: any;
};

function CollectBlock({ variable, nodeId, fieldId, setErrors }: Props) {
    useEffect(() => {
        if (!variable.key.trim()) {
            setErrors((prev: any[]) => {
                const exists = prev.some((e) => e.field === "variable");
                return exists
                    ? prev.map((e) =>
                          e.field === "variable"
                              ? { ...e, message: "Biến không được rỗng" }
                              : e,
                      )
                    : [
                          ...prev,
                          {
                              field: "variable",
                              message: "Biến không được rỗng",
                          },
                      ];
            });
        } else {
            setErrors((prev: any[]) =>
                prev.filter((e) => e.field !== "variable"),
            );
        }
    }, [setErrors, variable]);

    return (
        <Sheet>
            <SheetTrigger asChild className="p-3">
                <div className="mt-2 cursor-pointer rounded-sm bg-white p-2">
                    <h3 className="text-md mb-4 font-medium">
                        Thu thập câu trả lời
                    </h3>
                    <div className="flex items-center">
                        <span className="text-muted-foreground text-sm font-medium">
                            Lưu vào:{" "}
                        </span>
                        <span className="flex-1 text-center">
                            {variable.key || <strong>Rỗng</strong>}
                        </span>
                    </div>
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
                    setErrors={setErrors}
                />
            </SheetContent>
        </Sheet>
    );
}

export default CollectBlock;
