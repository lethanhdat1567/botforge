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
        className:
            "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-300",
        icon: <PlayCircle className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.pending]: {
        label: "Pending",
        className:
            "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-300",
        icon: <Clock className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.processing]: {
        label: "Processing",
        className:
            "border-violet-500/40 bg-violet-500/10 text-violet-800 dark:text-violet-300",
        icon: <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />,
    },
    [FlowRecordStatus.completed]: {
        label: "Completed",
        className:
            "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
        icon: <CheckCircle2 className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.cancelled]: {
        label: "Cancelled",
        className: "border-border bg-muted text-muted-foreground",
        icon: <XCircle className="mr-2 h-3.5 w-3.5" />,
    },
    [FlowRecordStatus.error]: {
        label: "Error",
        className:
            "border-red-500/40 bg-red-500/10 text-red-800 dark:text-red-300",
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
