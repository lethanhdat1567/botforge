import FlowShareCard from "@/app/(public)/marketplace/components/FlowShareCard/FlowShareCard";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";

async function SavedSharedTemplatePage() {
    const flowShares = await flowSharedSaveService.getMySaved();

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Mẫu cộng đồng đã lưu</h1>
            <div className="mt-10 grid grid-cols-3 gap-4">
                {flowShares.map((flowShare: any) => (
                    <FlowShareCard key={flowShare.id} data={flowShare} />
                ))}
            </div>
        </div>
    );
}

export default SavedSharedTemplatePage;
