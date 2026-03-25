"use client";

import {
    Bookmark,
    Calendar,
    Download,
    Heart,
    MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveMediaSrc } from "@/lib/image";
import { dateFormat } from "@/lib/timer";
import { FlowShare } from "@/services/flowSharedService";
import SaveBtn from "@/app/(public)/marketplace/components/FlowShareCard/SaveBtn";
import Link from "next/link";

export function FlowShareCard({ data }: { data: FlowShare }) {
    return (
        <Card className="group bg-card flex h-full flex-col gap-0 border-none py-0 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="bg-muted group relative aspect-video w-full overflow-hidden rounded-t-xl">
                <Link
                    href={`/marketplace/${data.id}`}
                    className="block h-full w-full"
                >
                    <Image
                        fill
                        src={resolveMediaSrc(data.thumbnail)}
                        alt={data.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                <div className="absolute top-2 right-2 z-20 -translate-y-2.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <SaveBtn
                        flowSharedId={data.id}
                        isSavedData={data.isSaved}
                    />
                </div>
            </div>
            <CardContent className="flex-1 p-4 pb-2">
                <div className="text-muted-foreground mt-1 mb-2.5 flex items-center justify-between text-[10px] font-medium tracking-wider uppercase">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {dateFormat(data.createdAt)}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Heart
                                className={cn(
                                    "h-3 w-3",
                                    data._count.flowShareLikes > 0,
                                )}
                                fill={data.isLiked ? "red" : "white"}
                                color={
                                    data.isLiked
                                        ? "red"
                                        : "var(--muted-foreground)"
                                }
                            />
                            <span>{data._count.flowShareLikes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>{data._count.flowShareDowloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{data._count.flowShareComments}</span>
                        </div>
                    </div>
                </div>

                <h3 className="group-hover:text-primary mb-1 line-clamp-1 text-base font-bold tracking-tight transition-colors">
                    {data.name}
                </h3>

                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                    {data.description ||
                        "Tối ưu quy trình với kịch bản Botforge chuyên nghiệp."}
                </p>

                <div className="mt-3">
                    {data.flowShareCategory?.map((category) => (
                        <Badge
                            key={category.id}
                            variant={"secondary"}
                            className="mr-2"
                        >
                            {category.name}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="mt-4 px-4 pb-4">
                <Link href={`/marketplace/${data.id}`} className="w-full">
                    <Button variant={"default"} className="w-full">
                        Xem chi tiết
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default FlowShareCard;
