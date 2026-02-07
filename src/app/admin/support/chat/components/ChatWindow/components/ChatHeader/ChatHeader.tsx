import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";
import { adminUserService } from "@/services/adminUserService";
import { useEffect, useState } from "react";

function ChatHeader({ userId }: { userId: string }) {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await adminUserService.detail(userId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) return null;

    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <Avatar>
                <AvatarImage src={resolveMediaSrc(user.avatar) as string} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-medium">{user.displayName}</p>
            </div>
        </div>
    );
}

export default ChatHeader;
