import CoreValueItem from "@/app/(public)/about/components/CoreValue/CoreValueItem";
import { CORE_VALUES } from "@/app/(public)/about/components/CoreValue/data";
import AnimatedContent from "@/components/AnimatedContent";

function CoreValue() {
    return (
        <AnimatedContent className="mt-20 sm:mt-30">
            <h2 className="text-center text-3xl font-medium sm:text-4xl md:text-5xl">
                Giá trị cốt lõi
            </h2>
            <p className="mx-auto mt-5 w-full max-w-xl px-2 text-center text-muted-foreground sm:px-0">
                Botforge được xây dựng xoay quanh sự đơn giản, hiệu quả và khả
                năng mở rộng — những giá trị giúp bạn tự động hóa mà không đánh
                đổi sự kiểm soát.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CORE_VALUES.map((item, index) => (
                    <CoreValueItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </AnimatedContent>
    );
}

export default CoreValue;
