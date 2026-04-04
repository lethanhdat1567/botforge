import ClientWrapper from "@/app/(public)/marketplace/ClientWrapper";

function MarketPlace() {
    return (
        <div className="mx-auto mt-32 min-h-screen w-full max-w-7xl px-4 pb-10 sm:mt-40 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    Thư viện luồng hội thoại
                </h1>
                <p className="text-md text-muted-foreground mx-auto mt-5 w-full max-w-xl text-center">
                    Khám phá bộ sưu tập các kịch bản chatbot được tối ưu sẵn. Sử
                    dụng ngay, tùy chỉnh linh hoạt và xây dựng dấu ấn riêng của
                    bạn.
                </p>
            </div>
            <ClientWrapper />
        </div>
    );
}

export default MarketPlace;
