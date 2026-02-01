import SharedItem from "@/app/(private)/community/templates/components/SharedItem/SharedItem";
import { flowSharedSaveService } from "@/services/flowSharedSaveService";

async function SavedSharedTemplatePage() {
    const res = await flowSharedSaveService.getMySaved();

    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Mẫu cộng đồng đã lưu</h1>
            <div className="grid grid-cols-4 gap-4">
                {res.data.data.map((item: any) => (
                    <SharedItem key={item.id} sharedItem={item.flowShare} />
                ))}
            </div>
        </div>
    );
}

export default SavedSharedTemplatePage;
