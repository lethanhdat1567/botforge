"use client";

import FacebookLoginBtn from "@/app/(private)/data/pages/components/FacebookLoginBtn/FacebookLoginBtn";
import PageLists from "@/app/(private)/data/pages/components/PageLists/PageLists";
import {
    facebookAuthService,
    FacebookResponse,
} from "@/services/facebookAuthService";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // Spinner chuẩn Shadcn

function Pages() {
    const [pages, setPages] = useState<FacebookResponse[]>([]);
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Thêm state loading

    const fetchPageList = async () => {
        setIsLoading(true);
        try {
            const res = await facebookAuthService.getPages();
            setPages(res || []);
            setIsFetched(true);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPageList();
    }, []);

    const hasPages = pages.length > 0;

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-foreground mb-6 text-2xl font-bold tracking-tight">
                    Trang kết nối
                </h1>
            </div>

            <FacebookLoginBtn fetchPages={fetchPageList} hasData={hasPages} />

            {/* Xử lý các trạng thái hiển thị */}
            <div className="mt-4">
                {isLoading ? (
                    /* Trạng thái LOADING */
                    <div className="border-border/50 bg-muted/5 flex h-[300px] flex-col items-center justify-center rounded-xl border">
                        <Loader2 className="text-muted-foreground/40 h-8 w-8 animate-spin" />
                        <p className="text-muted-foreground/60 mt-3 text-xs font-medium tracking-tight">
                            Đang tải danh sách trang...
                        </p>
                    </div>
                ) : hasPages ? (
                    /* Trạng thái CÓ DỮ LIỆU */
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <PageLists pages={pages} />
                    </div>
                ) : (
                    /* Trạng thái TRỐNG (Empty State) */
                    <div className="border-border/60 bg-muted/5 animate-in fade-in flex flex-col items-center justify-center rounded-xl border border-dashed py-16 duration-300">
                        <p className="text-muted-foreground mb-2 text-sm">
                            {isFetched
                                ? "Không tìm thấy trang nào."
                                : "Chưa có tài khoản Facebook nào được liên kết."}
                        </p>
                        <p className="text-muted-foreground/60 mb-6 text-[12px]">
                            Kết nối để quản lý tin nhắn và bài viết của bạn.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pages;
