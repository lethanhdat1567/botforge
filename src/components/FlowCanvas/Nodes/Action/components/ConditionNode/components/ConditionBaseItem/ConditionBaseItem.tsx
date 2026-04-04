import { ConditionItem } from "@/components/FlowCanvas/types/node/action.type";

type Props = {
    item: ConditionItem;
    /** 0 = "Nếu", các hàng sau = "Và" (khớp sheet) */
    ordinal?: number;
};

function ConditionBaseItem({ item, ordinal = 0 }: Props) {
    const { key, value } = item;
    const hasField = !!key;
    const hasValue =
        value !== undefined && value !== null && String(value).length > 0;

    if (!hasField && !hasValue) {
        return (
            <span className="text-xs text-neutral-600 italic">
                Chưa thiết lập điều kiện
            </span>
        );
    }

    const logicLabel = ordinal === 0 ? "Nếu" : "Và";

    return (
        <div className="flex flex-wrap items-center gap-2 py-0.5 text-sm leading-6 text-neutral-950">
            <span className="min-w-8 text-xs font-bold tracking-wide text-neutral-800 uppercase">
                {logicLabel}
            </span>

            <span className="inline-flex items-center rounded-md bg-neutral-200/90 px-2.5 py-1 font-mono text-xs font-semibold text-neutral-950">
                {hasField ? key : "Rỗng"}
            </span>

            <span className="text-xs font-bold tracking-tight text-neutral-700 uppercase">
                Bằng
            </span>

            <span className="inline-flex items-center rounded-md bg-neutral-200/90 px-2.5 py-1 text-sm font-semibold text-neutral-950">
                {hasValue ? String(value) : "Rỗng"}
            </span>
        </div>
    );
}

export default ConditionBaseItem;
