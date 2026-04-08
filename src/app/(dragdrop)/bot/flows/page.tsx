import FlowCanvas from "@/components/FlowCanvas/Canvas/FlowCanvas";
import { Suspense } from "react";

function DragdropPage() {
    return (
        <div className="flex h-svh min-h-0 w-full min-w-0 flex-1 flex-col">
            <Suspense fallback={null}>
                <FlowCanvas />
            </Suspense>
        </div>
    );
}

export default DragdropPage;
