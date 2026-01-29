import ChangePassword from "@/app/(private)/profile/components/ChangePassword/ChangePassword";
import { FormProfile } from "@/app/(private)/profile/components/FormProfile/FormProfile";
import { Separator } from "@/components/ui/separator";

function Profile() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground text-sm font-medium">
                Manage your account settings and set e-mail preferences.
            </p>
            <div className="mt-4 w-[50vw]">
                <FormProfile />
                <Separator className="my-4" />
                <ChangePassword />
            </div>
        </div>
    );
}

export default Profile;
