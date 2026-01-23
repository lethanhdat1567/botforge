"use client";

import ActionConnect from "@/app/(private)/data/templates/components/PlatformContent/components/ActionConnect/ActionConnect";
import ActionStatus from "@/app/(private)/data/templates/components/PlatformContent/components/ActionStatus/ActionStatus";
import Options from "@/app/(private)/data/templates/components/PlatformContent/components/Options/Options";
import ShareBtn from "@/app/(private)/data/templates/components/PlatformContent/components/ShareBtn/ShareBtn";

function PlatformItem() {
    function handleUpdateStatus(value: string) {}

    function handleConnect(pageId: string) {}

    return (
        <div className="hover:bg-muted flex items-center gap-10 border p-3 transition">
            <p className="text-sm">16 Aug 2025</p>
            <div className="flex-1">
                <h3 className="text-sm font-medium">
                    Withdrawal to JP Morgan Chase (0440)
                </h3>
                <ActionStatus onUpdateStatus={handleUpdateStatus} />
            </div>
            <div className="flex items-center gap-6">
                <ActionConnect onConnect={handleConnect} />
                <div className="flex items-center gap-2">
                    <Options
                        onUpdate={() => {}}
                        onDuplicate={() => {}}
                        onDestroy={() => {}}
                    />
                    <ShareBtn />
                </div>
            </div>
        </div>
    );
}

export default PlatformItem;
