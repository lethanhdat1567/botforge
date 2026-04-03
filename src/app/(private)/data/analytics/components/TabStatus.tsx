"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlowRecordStatus } from "@/services/flowRecordService";

interface TabStatusProps {
    value?: string;
    onStatusChange?: (status: string) => void;
}

const STATUS_TABS = [
    { label: "Tất cả", value: "all" },
    { label: "Đang chạy", value: FlowRecordStatus.running },
    { label: "Chờ duyệt", value: FlowRecordStatus.pending },
    { label: "Đang xử lý", value: FlowRecordStatus.processing },
    { label: "Hoàn thành", value: FlowRecordStatus.completed },
    { label: "Đã hủy", value: FlowRecordStatus.cancelled },
    { label: "Lỗi", value: FlowRecordStatus.error },
];

function TabStatus({ value = "all", onStatusChange }: TabStatusProps) {
    return (
        <Tabs value={value} onValueChange={onStatusChange} className="w-full">
            {/* Giảm h-9 xuống h-8, bỏ border-b ở đây nếu bạn muốn nó mỏng nhất có thể */}
            <TabsList className="border-border h-8 w-full justify-start rounded-none border-b bg-transparent p-0">
                {STATUS_TABS.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="data-[state=active]:border-b-foreground data-[state=active]:text-foreground relative h-8 rounded-none border-b-2 border-b-transparent bg-transparent px-3 pt-1.5 pb-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase transition-none hover:text-foreground data-[state=active]:shadow-none"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

export default TabStatus;
