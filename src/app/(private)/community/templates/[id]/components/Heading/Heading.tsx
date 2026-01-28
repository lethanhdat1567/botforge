import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";

type Props = {
    title: string;
    user: {
        id: string;
        avatar: string;
        displayName: string;
        email: string;
        username: string;
    };
};

function Heading({ title, user }: Props) {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="text-md flex items-center gap-2 font-medium">
                <Avatar className="h-7 w-7">
                    <AvatarImage src={resolveMediaSrc(user.avatar) as string} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {user.displayName}
            </div>
        </div>
    );
}

export default Heading;
