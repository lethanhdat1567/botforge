import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Download, MessageSquare } from "lucide-react";
import { FlowShare } from "@/services/flowSharedService";
import { dateFormat } from "@/lib/timer";
import LikeBtn from "@/app/(single-header)/marketplace/[id]/components/HeadingBlock/components/LikeBtn/LikeBtn";
import DownloadBtn from "@/app/(single-header)/marketplace/[id]/components/HeadingBlock/components/DownloadBtn/DownloadBtn";
import SaveBtn from "@/app/(single-header)/marketplace/[id]/components/HeadingBlock/components/SaveBtn/SaveBtn";
import { resolveMediaSrc } from "@/lib/image";

function HeadingBlock({ data }: { data: FlowShare }) {
    return (
        <div className="w-6xl">
            <div className="mb-3 flex items-center gap-2">
                <Avatar className="border-border h-8 w-8 border">
                    <AvatarImage
                        src={resolveMediaSrc(data.user?.avatar) as string}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <h3 className="text-foreground text-md leading-none font-medium">
                        {data.user?.displayName}
                    </h3>
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-foreground text-5xl font-bold tracking-tight">
                    {data.name}
                </h1>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                    {data.description}
                </p>
            </div>
            <div className="mt-4 flex flex-col gap-3">
                <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <CalendarDays className="h-4 w-4 opacity-60" />
                    <span className="tracking-wide">
                        Ngày đăng: {dateFormat(data.createdAt)}
                    </span>
                </div>
                <div className="text-muted-foreground mt-3 flex items-center gap-6 text-sm font-medium">
                    <LikeBtn
                        count={data._count.flowShareLikes}
                        flowShareId={data.id}
                    />
                    <div className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>
                            {data._count.flowShareDowloads} lượt tải xuống
                        </span>
                    </div>
                    <div className="hover:text-foreground flex items-center gap-1.5 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                            {data._count.flowShareComments} lượt bình luận
                        </span>
                    </div>
                </div>
            </div>
            {/* 4. Action Buttons */}
            <div className="mt-3 flex max-w-lg items-center gap-3">
                <SaveBtn flowSharedId={data.id} />
                <DownloadBtn flowShareId={data.id} />
            </div>
            {/* 5. Phân loại */}
            <div className="mt-6 flex items-center gap-2 pt-1">
                <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    Thể loại:
                </span>
                <div className="flex flex-wrap gap-2">
                    {data?.flowShareCategory?.map((category, i) => (
                        <Badge
                            key={i}
                            variant="secondary"
                            className="rounded-md font-semibold"
                        >
                            {category.name}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeadingBlock;
