import { ConditionItem } from "@/components/FlowCanvas/types/node/action.type";

function ConditionBaseItem({ item }: { item: ConditionItem }) {
    const { key, value } = item;
    const hasField = !!key;
    const hasValue = !!value;

    if (!hasField && !hasValue) {
        return (
            <div className="flex items-center gap-2 rounded border border-dashed border-slate-300 bg-slate-50/50 px-2 py-1.5">
                <span className="text-[11px] leading-none text-slate-400 italic">
                    Chưa thiết lập điều kiện
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-1 py-1 text-[13px] leading-6">
            <span className="font-medium text-slate-500">Nếu</span>

            {/* Key / Variable Tag */}
            <span className="inline-flex items-center rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-600 shadow-sm">
                {hasField ? key : "Rỗng"}
            </span>

            {/* Operator Text */}
            <span className="px-1 text-[10px] font-black tracking-tighter text-amber-600 uppercase">
                Bằng
            </span>

            {/* Value Tag */}
            <span className="inline-flex items-center rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[12px] font-medium text-emerald-600 shadow-sm">
                {hasValue ? value : "Rỗng"}
            </span>
        </div>
    );
}

export default ConditionBaseItem;
