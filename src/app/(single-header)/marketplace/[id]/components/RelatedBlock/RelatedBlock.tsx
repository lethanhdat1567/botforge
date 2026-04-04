import FlowShareCard from "@/app/(public)/marketplace/components/FlowShareCard/FlowShareCard";
import flowShareService from "@/services/flowSharedService";

async function RelatedBlock({ flowSharedId }: { flowSharedId: string }) {
    const relatedFlowShares = await flowShareService.getRelated(flowSharedId);

    return (
        <div>
            <h2 className="text-foreground mt-10 text-center text-3xl font-semibold">
                Những sản phẩm liên quan
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedFlowShares.map((flowShare) => (
                    <FlowShareCard key={flowShare.id} data={flowShare} />
                ))}
            </div>
        </div>
    );
}

export default RelatedBlock;
