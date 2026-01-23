"use client";

import ActionConnect from "@/app/(private)/data/templates/components/PlatformContent/components/ActionConnect/ActionConnect";
import ActionStatus from "@/app/(private)/data/templates/components/PlatformContent/components/ActionStatus/ActionStatus";
import Options from "@/app/(private)/data/templates/components/PlatformContent/components/Options/Options";
import ShareBtn from "@/app/(private)/data/templates/components/PlatformContent/components/ShareBtn/ShareBtn";
import { FlowType } from "@/app/(private)/data/templates/type";
import { timerFormat } from "@/lib/timer";
import { flowService } from "@/services/flowService";
import { toast } from "sonner";

type Props = {
    template: FlowType;
    onRefresh: () => void;
};

function PlatformItem({ template, onRefresh }: Props) {
    async function handleUpdateStatus(value: string) {
        try {
            await flowService.updateFlow(template.id, { status: value });
            toast.success("Status updated successfully");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    }

    async function handleConnect(pageId: string) {
        try {
            await flowService.updateFlow(template.id, { pageId });
            toast.success("Status updated successfully");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    }

    async function handleDestroy() {
        try {
            await flowService.destroyFlow(template.id);
            toast.success("Template deleted successfully");
            onRefresh();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete template");
        }
    }

    return (
        <div className="hover:bg-muted flex items-center gap-10 border p-3 transition">
            <p className="text-sm">{timerFormat(template.createdAt)}</p>
            <div className="flex-1">
                <h3 className="text-sm font-medium">{template.name}</h3>
                <ActionStatus
                    status={template.status}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
            <div className="flex items-center gap-6">
                <ActionConnect
                    pageId={template.pageId || ""}
                    onConnect={handleConnect}
                />
                <div className="flex items-center gap-2">
                    <Options onDestroy={handleDestroy} />
                    <ShareBtn />
                </div>
            </div>
        </div>
    );
}

export default PlatformItem;
