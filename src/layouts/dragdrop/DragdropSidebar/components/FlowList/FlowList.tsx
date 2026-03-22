import { FlowList as FlowListType } from "@/services/flowService";
import FlowItem from "./components/FlowItem/FlowItem";

type Props = {
    flows: FlowListType[];
    fetchFlows: () => void;
};

function FlowList({ flows, fetchFlows }: Props) {
    return (
        <div className="mt-4">
            {flows.map((flow) => (
                <FlowItem flow={flow} key={flow.id} onRefresh={fetchFlows} />
            ))}
        </div>
    );
}

export default FlowList;
