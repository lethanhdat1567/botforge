import CreateComment from "@/app/(private)/community/templates/[id]/components/Comment/components/CreateComment/CreateComment";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    sharedTemplateId: string;
    onRefresh: () => void;
    parentId?: string | null;
};

function CreateReply({ sharedTemplateId, onRefresh, parentId }: Props) {
    const [isReply, setIsReply] = useState(false);

    return isReply ? (
        <div>
            <CreateComment
                sharedTemplateId={sharedTemplateId}
                onCancel={() => setIsReply(false)}
                onSubmit={() => setIsReply(false)}
                onRefresh={onRefresh}
                parentId={parentId}
            />
        </div>
    ) : (
        <div className="flex items-center justify-start">
            <Button onClick={() => setIsReply(true)}>Reply</Button>
        </div>
    );
}

export default CreateReply;
