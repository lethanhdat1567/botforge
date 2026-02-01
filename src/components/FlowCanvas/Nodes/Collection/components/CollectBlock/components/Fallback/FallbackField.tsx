"use client";

import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import FallbackModeSelect from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Fallback/FallbackModeSelect";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Fallback = {
    mode: "default" | "custom";
    value: string;
};

type Props = {
    value: Fallback;
    onChange: Dispatch<SetStateAction<VariableData>>;
    onCommit: (fallback: Fallback) => void;
};

function FallbackField({ value, onChange, onCommit }: Props) {
    const updateFallback = (
        updater: (prev: Fallback) => Fallback,
        commit = false,
    ) => {
        onChange((prev) => {
            const nextFallback = updater(prev.fallback);

            if (commit) {
                onCommit(nextFallback);
            }

            return {
                ...prev,
                fallback: nextFallback,
            };
        });
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <FallbackModeSelect
                    value={value.mode}
                    onChange={(mode) =>
                        updateFallback((prev) => ({ ...prev, mode }), true)
                    }
                />
                {value.mode === "default" && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={"/bot/settings" as any} target="_blank">
                                <Button variant={"outline"}>
                                    <Settings />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Cài đặt cấu hình</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>

            {value.mode === "custom" && (
                <Textarea
                    className="h-40 resize-none"
                    value={value.value}
                    onChange={(e) =>
                        updateFallback(
                            (prev) => ({
                                ...prev,
                                value: e.target.value,
                            }),
                            false,
                        )
                    }
                    onBlur={() => updateFallback((prev) => prev, true)}
                />
            )}
            <p className="text-muted-foreground mt-3 text-sm italic">
                *Tin nhắn này sẽ được gửi sau khi hết thời gian timeout mà người
                dùng không phản hồi.
            </p>
        </div>
    );
}

export default FallbackField;
