import GuidesClient from "@/app/(public)/guides/GuideClient";
import { guideService } from "@/services/guideService";

async function GuidesPage() {
    const res = await guideService.list();
    const guides = res.data.items;

    return <GuidesClient initialGuides={guides} />;
}

export default GuidesPage;
