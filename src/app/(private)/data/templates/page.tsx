import PlatformContent from "@/app/(private)/data/templates/components/PlatformContent/PlatformContent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PLATFORMS = [
    { key: "unconnected", label: "Chưa kết nối" },
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "zalo", label: "Zalo" },
];

function TemplatesPage() {
    return (
        <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl font-bold sm:text-2xl">
                    Danh sách mẫu kịck bản
                </h1>
                <Link href={"/bot/flows" as any} className="shrink-0">
                    <Button className="w-full rounded-none sm:w-auto">
                        Quản lý thư mục template <ArrowRight />
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="unconnected" className="w-full min-w-0">
                <div className="max-w-full overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                    <TabsList className="inline-flex w-max min-w-full rounded-none">
                    {PLATFORMS.map((p) => (
                        <TabsTrigger
                            key={p.key}
                            value={p.key}
                            className="shrink-0 rounded-none"
                        >
                            {p.label}
                        </TabsTrigger>
                    ))}
                    </TabsList>
                </div>

                {PLATFORMS.map((p) => (
                    <TabsContent key={p.key} value={p.key}>
                        <PlatformContent platform={p.key as any} key={p.key} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

export default TemplatesPage;
