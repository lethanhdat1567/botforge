"use client";

import envConfig from "@/config/envConfig";
import { facebookAuthService } from "@/services/facebookAuthService";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { RefreshCw, Facebook, LogOut } from "lucide-react";
import { toast } from "sonner";

type Props = {
    fetchPages: () => void;
    hasData: boolean;
};

function FacebookLoginBtn({ fetchPages, hasData }: Props) {
    const handleLogout = async () => {
        try {
            await facebookAuthService.logout();
            fetchPages();
            toast.success("Logout successfully");
        } catch (error) {
            console.log("Logout failed", error);
        }
    };

    return (
        <FacebookLogin
            appId={envConfig.FACEBOOK_APP_ID}
            initParams={{ cookie: false }}
            scope="public_profile,email,pages_show_list,pages_messaging,pages_manage_metadata,pages_read_engagement"
            onSuccess={async (response) => {
                const payload = {
                    fbAccessToken: response.accessToken,
                    facebookProviderId: response.userID,
                };
                try {
                    await facebookAuthService.createAccount(payload);
                    fetchPages();
                } catch (error) {
                    console.log(error);
                }
            }}
            render={({ onClick }) =>
                hasData ? (
                    <div className="border-border/40 bg-muted/20 mb-6 flex items-center justify-between rounded-lg border px-4 py-2">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                            <span className="text-muted-foreground text-[12px] font-medium">
                                Facebook đã kết nối
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onClick}
                                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all"
                            >
                                <RefreshCw className="h-3 w-3" />
                                Đổi tài khoản
                            </button>

                            {/* Đường kẻ phân cách nhỏ */}
                            <div className="bg-border/60 h-3 w-[1px]" />

                            <button
                                onClick={handleLogout}
                                className="text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all"
                            >
                                <LogOut className="h-3 w-3" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={onClick}
                        className="flex items-center gap-2 rounded-md bg-[#1877F2] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1877F2]/90"
                    >
                        <Facebook className="h-4 w-4 fill-current" />
                        Đăng nhập Facebook
                    </button>
                )
            }
        />
    );
}

export default FacebookLoginBtn;
