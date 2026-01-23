"use client";

import ActionStatus from "@/app/(private)/data/pages/components/PageContent/components/ActionStatus/ActionsStatus";
import Options from "@/app/(private)/data/pages/components/PageContent/components/Options/Options";
import { PageFormData } from "@/app/(private)/data/pages/components/PageForm/PageForm";
import { PageType } from "@/app/(private)/data/pages/type";
import { timerFormat } from "@/lib/timer";

type Props = {
    page: PageType;
    onUpdate: (pageId: string, page: PageFormData) => void;
    onDestroy: (pageId: string) => void;
    error: string;
    setError: (error: string) => void;
};

function PageItem({ page, onUpdate, onDestroy, error, setError }: Props) {
    return (
        <div className="hover:bg-muted flex items-center gap-10 border p-3 transition">
            <p className="text-sm">{timerFormat(page.createdAt)}</p>

            <div className="flex-1">
                <h3 className="text-sm font-medium">{page.name}</h3>
                <ActionStatus status={page.status} />
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Options
                        onUpdate={(pageUpdated) =>
                            onUpdate(page.id, pageUpdated)
                        }
                        onDestroy={() => onDestroy(page.id)}
                        page={page}
                        error={error}
                        setError={setError}
                    />
                </div>
            </div>
        </div>
    );
}

export default PageItem;
