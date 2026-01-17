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
