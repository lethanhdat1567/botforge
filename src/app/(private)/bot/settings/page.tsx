import ConfigToken from "@/app/(private)/bot/settings/components/ConfigToken/ConfigToken";
import TimeoutSection from "@/app/(private)/bot/settings/components/TimeoutSection/TimeoutSection";
import { Separator } from "@/components/ui/separator";

function SettingsPage() {
    return (
        <div>
            <TimeoutSection />
            <Separator />
            <ConfigToken />
        </div>
    );
}

export default SettingsPage;
