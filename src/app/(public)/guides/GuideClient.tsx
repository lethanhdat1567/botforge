"use client";

import { useState } from "react";
import GuideItem from "@/app/(public)/guides/components/GuideItem/GuideItem";
import SearchSection from "@/app/(public)/guides/components/SearchSection/SearchSection";
import { guideService, GuidePayload } from "@/services/guideService";

type Props = {
    initialGuides: GuidePayload[];
};

function GuidesClient({ initialGuides }: Props) {
    const [guides, setGuides] = useState(initialGuides);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (q: string) => {
        setLoading(true);
        try {
            const res = await guideService.list({ q });
            setGuides(res.data.items);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f6f6] pb-30">
            <div className="mx-auto w-5xl pt-40">
                <h1 className="text-center text-6xl font-bold">
                    Hướng dẫn xây dựng chatbot
                </h1>

                <p className="text-md mx-auto mt-4 w-xl text-center">
                    Từ thiết lập chatbot đầu tiên đến tối ưu flow và theo dõi
                    hiệu quả — tất cả đều có hướng dẫn chi tiết, dễ làm theo.
                </p>

                <SearchSection onSearching={handleSearch} />

                {loading && (
                    <p className="mt-6 text-center text-sm text-neutral-500">
                        Đang tìm kiếm...
                    </p>
                )}

                <div className="mt-12 grid grid-cols-2 gap-5">
                    {guides.map((guide) => (
                        <GuideItem key={guide.id} guide={guide} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GuidesClient;
