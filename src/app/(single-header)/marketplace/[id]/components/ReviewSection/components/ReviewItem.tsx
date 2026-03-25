import { User, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReplyItem } from "./ReplyItem";

export const ReviewItem = () => {
    return (
        <div className="hover:bg-muted/5 flex items-start gap-4 p-5 transition-colors">
            <Avatar className="border-border/50 h-9 w-9 border">
                <AvatarImage
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=Dat`}
                />
                <AvatarFallback>
                    <User className="text-muted-foreground h-4 w-4" />
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-foreground text-sm font-bold">
                            Lê Thành Đạt
                        </span>
                        <span className="text-muted-foreground text-[11px] font-medium">
                            2 giờ trước
                        </span>
                    </div>
                </div>

                <p className="text-foreground max-w-2xl text-sm leading-relaxed">
                    Hệ thống xử lý dữ liệu rất mượt mà. Tôi đánh giá cao cách
                    các bạn tối ưu hóa giao diện người dùng theo phong cách tối
                    giản này.
                </p>

                <div className="mt-1 flex items-center gap-4">
                    <button className="text-foreground flex items-center gap-1.5 text-[12px] font-bold transition-colors hover:underline">
                        <MessageCircle className="h-3.5 w-3.5" />
                        PHẢN HỒI (2)
                    </button>
                </div>

                <div className="border-border mt-2 ml-2 space-y-3 border-l-2 pl-4">
                    <ReplyItem
                        author="Admin"
                        content="Cảm ơn Đạt đã ủng hộ! Chúng tôi sẽ tiếp tục cải thiện."
                    />
                </div>
            </div>
        </div>
    );
};
