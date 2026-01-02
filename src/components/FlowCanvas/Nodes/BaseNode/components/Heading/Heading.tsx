"use client";

type Props = {
    nodeTypeData: { color: string; icon: any };
    name: string;
};

function Heading({ nodeTypeData, name }: Props) {
    const Icon = nodeTypeData.icon;

    return (
        <div className="flex items-center gap-1">
            <span
                className={`bg-background flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border`}
                style={{ borderColor: nodeTypeData.color }}
            >
                <Icon
                    size={14}
                    color={nodeTypeData.color}
                    fill={nodeTypeData.color}
                />
            </span>
            <input className="focus:border-foreground flex-1 border border-transparent outline-none" />
        </div>
    );
}

export default Heading;
