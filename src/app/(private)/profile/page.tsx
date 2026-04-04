import ChangePassword from "@/app/(private)/profile/components/ChangePassword/ChangePassword";
import { FormProfile } from "@/app/(private)/profile/components/FormProfile/FormProfile";
import { Separator } from "@/components/ui/separator";

function Profile() {
    return (
        <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight">
                Cài đặt tài khoản
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
                Quản lý thông tin cá nhân và cấu hình nhận thông báo qua email.
            </p>
            <div className="mt-4 w-full min-w-0 max-w-2xl">
                <FormProfile />
                <Separator className="my-4" />
                <ChangePassword />
            </div>
        </div>
    );
}

export default Profile;
