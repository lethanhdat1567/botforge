import CountUp from "@/components/CountUp";

function Analysh() {
    return (
        <div className="mx-auto mt-30 grid w-5xl grid-cols-4 rounded-sm border border-white p-8 shadow-2xl">
            <div>
                <h3 className="text-4xl font-bold">
                    <CountUp from={0} to={100} />+
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                    Flow hội thoại tùy chỉnh
                </p>
            </div>
            <div>
                <h3 className="text-4xl font-bold">
                    <CountUp from={0} to={10} />
                    K+
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                    Tin nhắn xử lý mỗi ngày
                </p>
            </div>
            <div>
                <h3 className="text-4xl font-bold">
                    <CountUp from={0} to={24} />
                    /<CountUp from={0} to={7} />
                </h3>
                <p className="mt-3 text-sm text-neutral-700">
                    Tự động phản hồi
                </p>
            </div>
            <div>
                <h3 className="text-4xl font-bold">0₫</h3>
                <p className="mt-3 text-sm text-neutral-700">
                    Khởi tạo miễn phí
                </p>
            </div>
        </div>
    );
}

export default Analysh;
