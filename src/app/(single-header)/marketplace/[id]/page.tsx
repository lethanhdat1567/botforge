import { Separator } from "@/components/ui/separator";
import HeadingBlock from "@/app/(single-header)/marketplace/[id]/components/HeadingBlock/HeadingBlock";
import { RenderContent } from "@/components/RenderEditorTextContent/RenderEditorTextContent";
import ReviewSection from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/ReviewSection";
import RelatedBlock from "@/app/(single-header)/marketplace/[id]/components/RelatedBlock/RelatedBlock";
import flowShareService from "@/services/flowSharedService";

async function MarketPlaceDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const res = await flowShareService.getDetail(id);

    return (
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 md:p-10">
            <HeadingBlock data={res} />
            <Separator className="my-4" />
            <div>
                <RenderContent html={res.content || ""} />
            </div>
            <Separator className="my-4" />
            <ReviewSection flowSharedId={id} />
            <RelatedBlock flowSharedId={id} />
        </div>
    );
}

export default MarketPlaceDetail;
