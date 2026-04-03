import ClientWrapper from "@/app/(public)/marketplace/ClientWrapper";

function MarketPlace() {
    return (
        <div className="mx-auto mt-40 min-h-screen w-7xl bg-muted pb-10">
            <div className="mx-auto w-3xl">
                <h1 className="text-center text-4xl font-bold">
                    The Foundation for your Design System
                </h1>
                <p className="text-md text-muted-foreground mx-auto mt-5 w-xl text-center">
                    A set of beautifully designed components that you can
                    customize, extend, and build on. Start here then make it
                    your own. Open Source. Open Code.
                </p>
            </div>
            <ClientWrapper />
        </div>
    );
}

export default MarketPlace;
