import { emptyImage } from "@/assets/icons";

interface EmptyFlowProps {
    title?: string;
    description?: string;
}

function EmptyFlow({
    title = "Bắt đầu bằng cách chọn flow",
    description = "Vui lòng chọn một flow để bắt đầu, hoặc tạo flow mới.",
}: EmptyFlowProps) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-6">
            {emptyImage}
            <div className="space-y-3 text-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-md w-lg text-neutral-500">{description}</p>
            </div>
        </div>
    );
}

export default EmptyFlow;
