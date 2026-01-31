import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TriangleAlert } from "lucide-react";

type Props = {
    errors: {
        field: string;
        message: string;
    }[];
};

function AlertBagde({ errors }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="bg-background absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
                    <TriangleAlert fill="red" color="background" size={16} />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="space-y-2">
                {errors.map((error, index) => (
                    <p key={index}>- {error.message}</p>
                ))}
            </TooltipContent>
        </Tooltip>
    );
}

export default AlertBagde;
