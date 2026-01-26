function ColumnStatus({ status }: { status: "active" | "inactive" }) {
    const isActive = status === "active";

    return (
        <div
            className={`flex items-center justify-center border px-0 py-1 text-xs font-medium ${
                isActive
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-red-500 bg-red-50 text-red-700"
            }`}
        >
            {isActive ? "Active" : "Inactive"}
        </div>
    );
}

export default ColumnStatus;
