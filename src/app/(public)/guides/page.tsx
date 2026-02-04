import GuideItem from "@/app/(public)/guides/components/GuideItem/GuideItem";
import SearchSection from "@/app/(public)/guides/components/SearchSection/SearchSection";

function GuidesPage() {
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
                <SearchSection />
                <div className="mt-12 grid grid-cols-2 gap-5">
                    <GuideItem />
                    <GuideItem />
                    <GuideItem />
                    <GuideItem />
                    <GuideItem />
                    <GuideItem />
                </div>
            </div>
        </div>
    );
}

export default GuidesPage;
