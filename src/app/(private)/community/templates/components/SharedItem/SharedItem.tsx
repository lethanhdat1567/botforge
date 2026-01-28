import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions from "@/app/(private)/community/templates/components/SharedItem/components/Actions/Actions";
import { SharedType } from "@/services/flowSharedService";
import { resolveMediaSrc } from "@/lib/image";
import { htmlToText } from "@/lib/format";
import Link from "next/link";

type Props = {
    sharedItem: SharedType;
};

function SharedItem({ sharedItem }: Props) {
    return (
        <div className="group bg-background overflow-hidden border transition-all duration-300 ease-out hover:shadow-md">
            {/* Thumbnail */}
            <Link href={`/community/templates/${sharedItem.id}` as any}>
                <div className="bg-muted relative h-52 w-full overflow-hidden">
                    <Image
                        src={resolveMediaSrc(sharedItem.thumbnail) as string}
                        alt="fallback"
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col gap-4 p-4">
                {/* Title + Desc */}
                <div className="space-y-1">
                    <Link href={`/community/templates/${sharedItem.id}` as any}>
                        <h3 className="line-clamp-1 text-base font-semibold">
                            {sharedItem.name}
                        </h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                        {htmlToText(sharedItem.description)}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src={
                                    resolveMediaSrc(
                                        sharedItem.user.avatar,
                                    ) as string
                                }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                            {sharedItem.user.displayName}
                        </span>
                    </div>

                    {/* Actions */}
                    <Actions sharedItem={sharedItem} />
                </div>
            </div>
        </div>
    );
}

export default SharedItem;
