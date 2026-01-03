import AlertBagde from "@/components/FlowCanvas/Nodes/BaseContent/components/AlertBadge";
import ContentToolbar from "@/components/FlowCanvas/Nodes/BaseContent/components/ContentToolbar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
    id: string;
    children?: React.ReactNode;
    errors?: Array<{ field: string; message: string }>;
    isContentDragging?: boolean;
};

function BaseContent({ id, children, errors, isContentDragging }: Props) {
    const {
        setNodeRef,
        listeners,
        attributes,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isError = errors && errors.length > 0;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative rounded-sm ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            {/* Content Wrapper */}
            <div
                className={`bg-muted rounded-sm border border-transparent hover:border-blue-500 ${
                    isError ? "border-red-500!" : ""
                }`}
            >
                {children}
            </div>

            {/* Alert Badge */}
            {isError && <AlertBagde errors={errors} />}

            {/* Toolbar = drag handle */}
            {!isContentDragging && (
                <ContentToolbar
                    dragListeners={listeners}
                    dragAttributes={attributes}
                />
            )}

            {/* CẦU NỐI HOVER */}
            <div className="absolute top-0 -left-10 h-full w-10" />
        </div>
    );
}

export default BaseContent;
