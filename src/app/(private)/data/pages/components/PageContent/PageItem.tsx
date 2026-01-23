"use client";

import ActionStatus from "@/app/(private)/data/pages/components/PageContent/components/ActionStatus/ActionsStatus";
import Options from "@/app/(private)/data/pages/components/PageContent/components/Options/Options";

function PageItem() {
    function handleUpdateStatus(value: string) {}

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
                <div className="flex items-center gap-2">
                    <Options
                        onUpdate={() => {}}
                        onDuplicate={() => {}}
                        onDestroy={() => {}}
                    />
                </div>
            </div>
        </div>
    );
}

export default PageItem;
