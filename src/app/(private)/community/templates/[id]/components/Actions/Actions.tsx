import DowloadBtn from "@/app/(private)/community/templates/[id]/components/Actions/DowloadBtn";
import LikeBtn from "@/app/(private)/community/templates/[id]/components/Actions/LikeBtn";
import SaveBtn from "@/app/(private)/community/templates/[id]/components/Actions/SaveBtn";

type Props = { sharedTemplateId: string; flowId: string };

function Actions({ sharedTemplateId, flowId }: Props) {
    return (
        <div className="space-x-2">
            <LikeBtn sharedTemplateId={sharedTemplateId} />
            <SaveBtn sharedTemplateId={sharedTemplateId} />
            <DowloadBtn sharedTemplateId={sharedTemplateId} flowId={flowId} />
        </div>
    );
}

export default Actions;
