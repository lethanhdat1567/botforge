import {
    PlayCircle,
    Clock,
    Loader2,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react";

export enum FlowRecordStatus {
    running = "running",
    pending = "pending",
    processing = "processing",
    completed = "completed",
    cancelled = "cancelled",
    error = "error",
}

const STATUS_META: Record<
    FlowRecordStatus,
    { label: string; className: string; icon: React.ReactNode }
> = {
    [FlowRecordStatus.running]: {
        label: "Running",
        className: "border-blue-400 bg-blue-100 text-blue-700",
        icon: <PlayCircle className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.pending]: {
        label: "Pending",
        className: "border-yellow-400 bg-yellow-100 text-yellow-700",
        icon: <Clock className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.processing]: {
        label: "Processing",
        className: "border-indigo-400 bg-indigo-100 text-indigo-700",
        icon: <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />,
    },
    [FlowRecordStatus.completed]: {
        label: "Completed",
        className: "border-green-400 bg-green-100 text-green-700",
        icon: <CheckCircle2 className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.cancelled]: {
        label: "Cancelled",
        className: "border-gray-400 bg-gray-100 text-gray-700",
        icon: <XCircle className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.error]: {
        label: "Error",
        className: "border-red-400 bg-red-100 text-red-700",
        icon: <AlertCircle className="mr-2 h-3.5 w-3.5" />,
    },
};

interface Props {
    status: FlowRecordStatus | string;
}

function FlowRecordStatusBadge({ status }: Props) {
    const currentStatus =
        (status as FlowRecordStatus) || FlowRecordStatus.pending;
    const meta =
        STATUS_META[currentStatus] || STATUS_META[FlowRecordStatus.error];

    return (
        <div
            className={`inline-flex items-center border px-3 py-1 text-xs font-medium tracking-tight transition-colors ${meta.className} `}
            style={{ borderRadius: "2px" }}
        >
            {meta.icon}
            <span className="leading-none">{meta.label}</span>
        </div>
    );
}

export default FlowRecordStatusBadge;
