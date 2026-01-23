import { AddPage } from "@/app/(private)/data/pages/components/AddPage/AddPage";
import PageContent from "@/app/(private)/data/pages/components/PageContent/PageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PLATFORMS = [
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "zalo", label: "Zalo" },
];

function Pages() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="mb-6 text-2xl font-bold">Pages</h1>
                <AddPage />
            </div>

            <Tabs defaultValue="facebook" className="w-full">
                {/* List Tabs */}
                <TabsList className="rounded-none">
                    {PLATFORMS.map((p) => (
                        <TabsTrigger
                            key={p.key}
                            value={p.key}
                            className="rounded-none"
                        >
                            {p.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Content */}
                {PLATFORMS.map((p) => (
                    <TabsContent key={p.key} value={p.key}>
                        <PageContent platform={p.key as any} key={p.key} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default Pages;
