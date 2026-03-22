import { FacebookResponse } from "@/services/facebookAuthService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
    pages: FacebookResponse[];
};

function PageLists({ pages }: Props) {
    if (!pages || pages.length === 0) {
        return (
            <div className="text-muted-foreground flex h-37.5 flex-col items-center justify-center rounded-md border border-dashed text-sm">
                Chưa có trang nào được kết nối.
            </div>
        );
    }

    return (
        <div className="bg-card mt-4 rounded-md border">
            <div className="flex flex-col">
                {pages.map((page, index) => (
                    <div key={page.id}>
                        <div className="hover:bg-muted/50 group flex items-center justify-between p-4 transition-colors">
                            {/* Left: Info */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-10 w-10 border">
                                        <AvatarImage
                                            src={`https://graph.facebook.com/${page.id}/picture?type=normal`}
                                        />
                                        <AvatarFallback className="bg-muted text-xs">
                                            {page.name
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -right-1 -bottom-1 rounded-full border bg-white p-0.5 shadow-sm">
                                        <Facebook className="h-3 w-3 fill-[#1877F2] text-[#1877F2]" />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-0.5">
                                    <h3 className="cursor-pointer text-sm leading-none font-medium group-hover:underline">
                                        {page.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground font-mono text-[12px]">
                                            {page.id}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="text-muted-foreground h-4 px-1.5 text-[10px] font-normal"
                                        >
                                            Fanpage
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {index !== pages.length - 1 && <Separator />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PageLists;
