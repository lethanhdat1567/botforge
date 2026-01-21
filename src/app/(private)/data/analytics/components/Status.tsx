type StatusType = "running" | "pending" | "cancelled" | "completed";

const STATUS_META: Record<StatusType, { label: string; className: string }> = {
    running: {
        label: "Running",
        className: "border-blue-500 bg-blue-100 text-blue-700",
    },
    pending: {
        label: "Pending",
        className: "border-yellow-500 bg-yellow-100 text-yellow-700",
    },
    cancelled: {
        label: "Cancelled",
        className: "border-red-500 bg-red-100 text-red-700",
    },
    completed: {
        label: "Completed",
        className: "border-green-500 bg-green-100 text-green-700",
    },
};

function Status({ status }: { status: StatusType }) {
    const meta = STATUS_META[status];

    return (
        <div
            className={`inline-flex border px-2 py-1 text-xs font-medium ${meta.className}`}
        >
            {meta.label}
        </div>
    );
}

export default Status;
