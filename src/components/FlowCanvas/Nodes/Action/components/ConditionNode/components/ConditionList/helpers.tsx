export function formatConditionOperator(
    operator: "equals" | "not_equals" | "contains" | "regex",
): string {
    switch (operator) {
        case "equals":
            return "bằng";

        case "not_equals":
            return "không bằng";

        case "contains":
            return "chứa";

        case "regex":
            return "khớp biểu thức";

        default:
            return operator;
    }
}

export function renderConditionText(item: any) {
    const hasField = !!item.field;
    const hasValue = !!item.value;

    if (!hasField && !hasValue) {
        return (
            <span className="text-muted-foreground font-semibold">
                Điều kiện đang rỗng
            </span>
        );
    }

    return (
        <>
            Nếu{" "}
            {hasField ? (
                item.field
            ) : (
                <span className="font-semibold">Rỗng</span>
            )}{" "}
            {formatConditionOperator(item.operator)}{" "}
            {hasValue ? (
                item.value
            ) : (
                <span className="font-semibold">Rỗng</span>
            )}
        </>
    );
}
