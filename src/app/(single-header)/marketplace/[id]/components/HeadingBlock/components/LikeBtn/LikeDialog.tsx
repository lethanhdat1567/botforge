import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { flowSharedLikeService } from "@/services/flowSharedLikeService";
import { resolveMediaSrc } from "@/lib/image";

type LikedUser = {
    id: string;
    username: string | null;
    displayName: string;
    avatar: string;
};

type Props = {
    children: ReactNode;
    flowSharedId: string;
    count: number;
};

function LikeDialog({ children, flowSharedId, count }: Props) {
    const [users, setUsers] = useState<LikedUser[]>([]);

    const fetchUsers = async () => {
        try {
            const res = await flowSharedLikeService.getLikedUsers(flowSharedId);

            setUsers(res.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, [count]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="gap-0 overflow-hidden p-0">
                <DialogHeader className="border-border border-b p-4">
                    <DialogTitle className="text-center text-base font-bold">
                        Lượt thích ({users.length})
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[min(80vh,400px)] py-2">
                    {users.length > 0 ? (
                        <div className="flex flex-col">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors"
                                >
                                    <Avatar className="border-border h-9 w-9 border">
                                        <AvatarImage
                                            src={
                                                resolveMediaSrc(
                                                    user.avatar,
                                                ) as string
                                            }
                                            alt={user.displayName}
                                        />
                                        <AvatarFallback>
                                            <User className="text-muted-foreground h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col text-left">
                                        <span className="text-foreground text-sm leading-tight font-bold">
                                            {user.displayName}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground py-10 text-center text-sm">
                            Chưa có lượt thích nào.
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default LikeDialog;
