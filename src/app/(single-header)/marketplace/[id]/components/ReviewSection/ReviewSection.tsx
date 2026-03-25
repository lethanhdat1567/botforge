import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewItem } from "@/app/(single-header)/marketplace/[id]/components/ReviewSection/components/ReviewItem";

export default function ReviewSection() {
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-foreground text-2xl font-bold tracking-tight">
                    Bình luận
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                    Chia sẻ ý kiến của bạn hoặc đặt câu hỏi về sản phẩm này. Hãy
                    giữ văn minh trong các phản hồi.
                </p>
            </div>
            <div className="bg-background mx-auto w-5xl">
                <div className="flex flex-col">
                    {/* INPUT SECTION */}
                    <div className="border-border bg-muted/20 flex items-start gap-4 p-5">
                        <Avatar className="border-border h-9 w-9 border">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>LD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="relative">
                                <Input
                                    placeholder="Viết phản hồi hoặc bình luận..."
                                    className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-foreground py-5 pr-12 text-sm focus-visible:ring-1"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-foreground hover:bg-muted absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 transition-colors"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* LIST SECTION */}
                    <div>
                        {[1, 2, 3].map((i) => (
                            <ReviewItem key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
