"use client";

import { useEffect, useState } from "react";
import {
    FallbackData,
    VariableData,
} from "@/components/FlowCanvas/types/node/collection.type";
import { Input } from "@/components/ui/input";
import { FlowController } from "@/components/FlowCanvas/Controller/FlowController";
import equal from "fast-deep-equal";
import { Separator } from "@/components/ui/separator";
import SuggestVariable from "@/components/SuggestVariableInput/SuggestVariable";
import FallbackTimeOut from "@/components/FlowCanvas/Nodes/Collection/components/CollectBlock/components/FallbackTimeout/FallbackTimeout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
    variable: VariableData;
    fallback: FallbackData;
    nodeId: string;
    fieldId: string;
    setErrors: any;
};

function CollectSheetContent({ variable, fallback, nodeId, fieldId }: Props) {
    const [localVariable, setLocalVariable] = useState<VariableData>(variable);
    const [localFallback, setLocalFallback] = useState<FallbackData>(fallback);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalVariable(variable);
        setLocalFallback(fallback);
    }, [variable, fallback]);

    const commitVar = (next: VariableData) =>
        !equal(next, variable) &&
        FlowController.updateNodePayload(nodeId, fieldId, { variable: next });
    const commitFallback = (next: FallbackData) =>
        !equal(next, fallback) &&
        FlowController.updateNodePayload(nodeId, fieldId, { fallback: next });

    return (
        <div className="space-y-8 px-2 py-4 antialiased">
            {/* Group 1: Data Variable */}
            <section className="space-y-4">
                <header>
                    <Label className="text-foreground text-[13px] font-semibold tracking-wider uppercase">
                        Dữ liệu thu thập
                    </Label>
                    <p className="text-muted-foreground text-[12px]">
                        Xác định biến lưu trữ và định dạng kiểm tra.
                    </p>
                </header>

                <div className="ml-1 grid gap-4 border-l-2 border-black/5 pl-4">
                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-[12px] font-medium">
                            Tên biến
                        </Label>
                        <SuggestVariable
                            value={localVariable.key}
                            onSelect={(val) => {
                                const next = { ...localVariable, key: val };
                                setLocalVariable(next);
                                commitVar(next);
                            }}
                        >
                            <Input
                                value={localVariable.key}
                                onChange={(e) =>
                                    setLocalVariable((p) => ({
                                        ...p,
                                        key: e.target.value,
                                    }))
                                }
                                onBlur={() => commitVar(localVariable)}
                                className="border-input focus-visible:ring-ring h-9 rounded-md bg-transparent shadow-none focus-visible:ring-1"
                                placeholder="e.g. user_email"
                            />
                        </SuggestVariable>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-muted-foreground text-[12px] font-medium">
                            Regex Pattern
                        </Label>
                        <Input
                            value={localVariable.regex || ""}
                            onChange={(e) =>
                                setLocalVariable((p) => ({
                                    ...p,
                                    regex: e.target.value,
                                }))
                            }
                            onBlur={() => commitVar(localVariable)}
                            className="bg-secondary/30 h-9 border-none font-mono text-[11px] shadow-none focus-visible:ring-0"
                            placeholder="Chưa thiết lập mẫu..."
                        />
                    </div>
                </div>
            </section>

            <Separator className="opacity-50" />

            {/* Group 2: Error Handling */}
            <section className="space-y-4">
                <header>
                    <Label className="text-foreground text-[13px] font-semibold tracking-wider uppercase">
                        Xử lý quá hạn & lỗi
                    </Label>
                    <p className="text-muted-foreground text-[12px]">
                        Hành động khi người dùng không phản hồi đúng.
                    </p>
                </header>

                <div className="ml-1 grid gap-4 border-l-2 border-black/5 pl-4">
                    <div className="space-y-2">
                        <Label className="text-muted-foreground text-[12px] font-medium">
                            Thời gian chờ phản hồi
                        </Label>
                        <FallbackTimeOut
                            timeout={localFallback.timeout}
                            onCommit={(t) => {
                                const next = { ...localFallback, timeout: t };
                                setLocalFallback(next);
                                commitFallback(next);
                            }}
                        />
                    </div>

                    <div className="space-y-2 pt-2">
                        <Label className="text-muted-foreground text-[12px] font-medium">
                            Tin nhắn Fallback
                        </Label>
                        <Textarea
                            value={localFallback.message}
                            onChange={(e) =>
                                setLocalFallback((p) => ({
                                    ...p,
                                    message: e.target.value,
                                }))
                            }
                            onBlur={() => commitFallback(localFallback)}
                            className="border-input focus-visible:ring-ring min-h-[120px] resize-none rounded-md bg-transparent text-sm shadow-none focus-visible:ring-1"
                            placeholder="Nhập nội dung nhắc nhở..."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CollectSheetContent;
