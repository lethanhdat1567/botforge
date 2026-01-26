import { FlowType } from "@/app/(private)/data/templates/type";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { flowService } from "@/services/flowService";
import { useEffect, useState } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

function SelectFlow({ value, onChange }: Props) {
    const [flows, setFlows] = useState<FlowType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const http = async () => {
            const res = await flowService.getFlows({});
            setFlows(res.data);
            setLoading(false);
        };

        http();
    }, []);

    if (loading)
        return (
            <div>
                <Spinner />
            </div>
        );

    const isValidValue = flows.some((f) => f.id === value);

    return (
        <Select
            value={isValidValue ? value : undefined}
            onValueChange={onChange}
        >
            <SelectTrigger className="w-full rounded-none">
                <SelectValue placeholder="Flow" />
            </SelectTrigger>
            <SelectContent>
                {flows.map((flow) => (
                    <SelectItem key={flow.id} value={flow.id}>
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default SelectFlow;
