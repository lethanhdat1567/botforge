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
        <div className="flex h-svh min-h-[50dvh] w-full min-w-0 flex-col items-center justify-center space-y-6 px-4">
            {emptyImage}
            <div className="w-full max-w-lg space-y-3 text-center">
                <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default EmptyFlow;
