import PlatformContent from "@/app/(private)/data/templates/components/PlatformContent/PlatformContent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PLATFORMS = [
    { key: "unconnected", label: "Unconnected" },
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instagram" },
    { key: "zalo", label: "Zalo" },
];

function TemplatesPage() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="mb-6 text-2xl font-bold">Templates</h1>
                <Link href={"/bot/flows" as any}>
                    <Button>
                        Quản lý thư mục template <ArrowRight />
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="facebook" className="w-full">
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
