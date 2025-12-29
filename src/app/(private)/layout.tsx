import SliceSession from "@/components/SliceSession";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            {/* <SliceSession /> */}
        </div>
    );
}

export default PrivateLayout;
