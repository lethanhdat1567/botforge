import FlowShareCard from "@/app/(public)/marketplace/components/FlowShareCard/FlowShareCard";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";

async function SavedSharedTemplatePage() {
    const flowShares = await flowSharedSaveService.getMySaved();

    return (
        <div className="min-w-0">
            <h1 className="mb-4 text-xl font-bold sm:text-2xl">
                Mẫu cộng đồng đã lưu
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                {flowShares.map((flowShare: any) => (
                    <FlowShareCard key={flowShare.id} data={flowShare} />
                ))}
            </div>
        </div>
    );
}

export default SavedSharedTemplatePage;
