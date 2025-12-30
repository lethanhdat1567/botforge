import styles from "./HowItWork.module.css";
import { images } from "@/assets/images";
import { cn } from "@/lib/utils";
import Image from "next/image";

function HowItWork() {
    return (
        <div className="bg-[#0e0d0d] pt-20">
            <div className="app-container text-center">
                <h2 className="mb-4 text-4xl font-bold">How It Work</h2>
                <p className="mb-10 text-xl text-neutral-400">
                    Top AI companies are now recruiting with JobHub
                </p>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <Image
                            src={images.fallback}
                            alt="Botforge | How It Work"
                            className="aspect-square h-100 w-full rounded-sm object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                className={cn(
                                    styles.item,
                                    "flex items-center gap-4 py-4 pl-6",
                                )}
                                key={index}
                            >
                                <Image
                                    className="aspect-square h-16 w-16 rounded-sm object-cover"
                                    alt="Botforge"
                                    src={images.fallback}
                                />
                                <div className="text-left">
                                    <h3 className="mb-2 text-xl font-medium">
                                        Khởi tạo dự án
                                    </h3>
                                    <p className="text-md text-neutral-400">
                                        Khởi tạo dự án của bạn bằng cách đăng ký
                                        thông qua facebook dev
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWork;
