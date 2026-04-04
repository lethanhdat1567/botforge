import CountUp from "@/components/CountUp";

function Analysh() {
    return (
        <div className="mx-auto mt-20 grid w-full max-w-5xl grid-cols-2 gap-x-4 gap-y-8 rounded-sm border border-border bg-background px-4 py-6 shadow-2xl sm:mt-30 sm:gap-6 sm:px-6 sm:py-8 md:px-8 lg:grid-cols-4">
            <div>
                <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    <CountUp from={0} to={100} />+
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                    Flow hội thoại tùy chỉnh
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    <CountUp from={0} to={10} />
                    K+
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                    Tin nhắn xử lý mỗi ngày
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    <CountUp from={0} to={24} />
                    /<CountUp from={0} to={7} />
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                    Tự động phản hồi
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">0₫</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                    Khởi tạo miễn phí
                </p>
            </div>
        </div>
    );
}

export default Analysh;
