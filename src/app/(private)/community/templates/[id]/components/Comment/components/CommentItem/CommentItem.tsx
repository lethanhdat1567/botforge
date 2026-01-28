import { CommentUser } from "@/services/flowCommentService";

type Props = {
    comment: CommentUser;
};

function CommentItem({ comment }: Props) {
    return (
        <div>
            <div>Comment</div>
            <div>Reply</div>
        </div>
    );
}

export default CommentItem;
