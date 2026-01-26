import DowloadBtn from "@/app/(private)/community/templates/components/SharedItem/components/Actions/DowloadBtn/DowloadBtn";
import LikeBtn from "@/app/(private)/community/templates/components/SharedItem/components/Actions/LikeBtn";
import SaveBtn from "@/app/(private)/community/templates/components/SharedItem/components/Actions/SaveBtn";
import { SharedType } from "@/services/flowSharedService";

type Props = {
    sharedItem: SharedType;
};

function Actions({ sharedItem }: Props) {
    return (
        <div className="flex items-center gap-1">
            <LikeBtn sharedItemId={sharedItem.id} />
            <DowloadBtn
                downloadCount={sharedItem.downloadCount}
                sharedItemId={sharedItem.id}
            />
            <SaveBtn sharedItemId={sharedItem.id} />
        </div>
    );
}

export default Actions;
