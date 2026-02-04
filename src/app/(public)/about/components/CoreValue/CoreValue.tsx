import CoreValueItem from "@/app/(public)/about/components/CoreValue/CoreValueItem";
import { CORE_VALUES } from "@/app/(public)/about/components/CoreValue/data";

function CoreValue() {
    return (
        <div className="mt-30">
            <h2 className="text-center text-5xl font-medium">
                Giá trị cốt lõi
            </h2>
            <p className="mx-auto mt-5 w-xl text-center">
                Botforge được xây dựng xoay quanh sự đơn giản, hiệu quả và khả
                năng mở rộng — những giá trị giúp bạn tự động hóa mà không đánh
                đổi sự kiểm soát.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
                {CORE_VALUES.map((item, index) => (
                    <CoreValueItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoreValue;
