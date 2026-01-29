import Actions from "@/app/(private)/community/templates/[id]/components/Actions/Actions";
import Comment from "@/app/(private)/community/templates/[id]/components/Comment/Comment";
import Content from "@/app/(private)/community/templates/[id]/components/Content/Content";
import Heading from "@/app/(private)/community/templates/[id]/components/Heading/Heading";
import { flowSharedService, SharedType } from "@/services/flowSharedService";

type PageProps = {
    params: {
        id: string;
    };
};

async function TemplateDetailPage({ params }: PageProps) {
    const { id } = await params;

    let sharedTemplate: SharedType | null = null;

    try {
        const res = await flowSharedService.getSharedById(id);
        sharedTemplate = res.data.data;
    } catch (error) {
        console.log(error);
    }

    if (sharedTemplate === null) return;

    return (
        <div className="mt-10 overflow-auto">
            <div className="grid grid-cols-12 gap-8">
                {/* Heading */}
                <div className="col-span-8">
                    <Heading
                        title={sharedTemplate.name}
                        user={sharedTemplate.user}
                    />
                </div>
                {/* Actions */}
                <div className="col-span-4">
                    <Actions
                        sharedTemplateId={sharedTemplate.id}
                        flowId={sharedTemplate.flowId}
                    />
                </div>
            </div>
            {/* Desc */}
            <Content content={sharedTemplate.description} />
            {/* Comment */}
            <Comment sharedTemplateId={sharedTemplate.id} />
        </div>
    );
}

export default TemplateDetailPage;
