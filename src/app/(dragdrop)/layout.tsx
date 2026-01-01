import DragdropSidebar from "@/layouts/dragdrop/DragdropSidebar/DragdropSidebar";

function DragdropLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start">
            <DragdropSidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
}

export default DragdropLayout;
