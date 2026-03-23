/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button } from "@/components/ui/button";
import { FacebookResponse } from "@/services/facebookAuthService";
import { Unplug } from "lucide-react";
import Image from "next/image";

type Props = {
    page: FacebookResponse;
    currentConnectedPageUid?: string;
    onConnect: (page: FacebookResponse) => void;
    onDisconnect: () => void;
};

function PageItem({
    page,
    currentConnectedPageUid,
    onConnect,
    onDisconnect,
}: Props) {
    const avatarSrc = `https://graph.facebook.com/${page.id}/picture?type=large`;

    return (
        <div className="group flex items-center justify-between border-b border-slate-50 py-2 last:border-0">
            <div className="flex items-center gap-3">
                <Image
                    alt={page.name}
                    src={avatarSrc}
                    className="h-10 w-10 rounded-full border border-slate-100 object-cover"
                    width={100}
                    height={100}
                    unoptimized
                />
                <h3 className="text-sm font-medium text-slate-700 transition-colors group-hover:text-blue-600">
                    {page.name}
                </h3>
            </div>
            {currentConnectedPageUid !== page.id && (
                <Button
                    size={"sm"}
                    onClick={() => {
                        onConnect(page);
                    }}
                >
                    Kết nối <Unplug className="h-4 w-4" />
                </Button>
            )}
            {currentConnectedPageUid === page.id && (
                <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={onDisconnect}
                >
                    Hủy kết nối <Unplug className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

export default PageItem;
