"use client";

import TimeoutCustomFields from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Timeout/TimeoutCustomFields";
import TimeoutModeSelect from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/Timeout/TimeoutModeSelect";
import { VariableData } from "@/components/FlowCanvas/types/node/collection.type";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Timeout = {
    duration: number;
    unit: "second" | "minute" | "hour";
    mode: "default" | "custom";
};

type Props = {
    value: Timeout;
    onChange: Dispatch<SetStateAction<VariableData>>;
    onCommit: (timeout: Timeout) => void;
};

function TimeoutField({ value, onChange, onCommit }: Props) {
    const updateTimeout = (
        updater: (prev: Timeout) => Timeout,
        commit = false,
    ) => {
        onChange((prev) => {
            const nextTimeout = updater(prev.timeout);

            if (commit) {
                onCommit(nextTimeout);
            }

            return {
                ...prev,
                timeout: nextTimeout,
            };
        });
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <TimeoutModeSelect
                    value={value.mode}
                    onChange={(mode) =>
                        updateTimeout((prev) => ({ ...prev, mode }), true)
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
                <TimeoutCustomFields
                    value={value}
                    onChangeDuration={(duration) =>
                        updateTimeout(
                            (prev) => ({
                                ...prev,
                                duration: Math.max(1, Math.min(99, duration)),
                            }),
                            false,
                        )
                    }
                    onCommitDuration={() => updateTimeout((prev) => prev, true)}
                    onChangeUnit={(unit) =>
                        updateTimeout((prev) => ({ ...prev, unit }), true)
                    }
                />
            )}
            <p className="text-muted-foreground mt-3 text-sm italic">
                *Thời gian chờ tối đa để người dùng phản hồi.
            </p>
        </div>
    );
}

export default TimeoutField;
