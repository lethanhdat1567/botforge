import { ArrowDown } from "lucide-react";

type Props = {
    history: {
        stepId: string;
        enteredAt: string;
    }[];
};

export default function StepTimeline({ history }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {history.map((item, index) => (
                <div key={item.stepId + index}>
                    {/* Step item */}
                    <div className="flex items-start gap-3">
                        {/* Dot */}
                        <div className="bg-primary mt-1 h-3 w-3 shrink-0 rounded-full" />

                        {/* Content */}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                {item.stepId}
                            </span>
                            <span className="text-muted-foreground text-xs">
                                {new Date(item.enteredAt).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Arrow (not last item) */}
                    {index !== history.length - 1 && (
                        <div className="my-2 ml-[6px]">
                            <ArrowDown className="text-muted-foreground h-4 w-4" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
