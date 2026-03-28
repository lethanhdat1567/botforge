"use client";

import * as React from "react";

import { useLiveChatThread } from "@/hooks/useLiveChatThread";

import { LiveChatCompactPanel } from "./components/LiveChatCompactPanel";
import { LiveChatFullscreenDialog } from "./components/LiveChatFullscreenDialog";

export function PublicLiveChatWidget() {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const live = useLiveChatThread({
        enabled: popoverOpen || dialogOpen,
    });

    const openExpanded = () => {
        setPopoverOpen(false);
        setDialogOpen(true);
    };

    const shrinkToWidget = () => {
        setDialogOpen(false);
        setPopoverOpen(true);
    };

    return (
        <>
            <LiveChatCompactPanel
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
                onExpand={openExpanded}
                contact={live.contact}
                messages={live.messages}
                viewer={live.viewer}
                onSend={live.sendMessage}
                sending={live.sending}
                loading={live.loading}
                error={live.error}
            />
            <LiveChatFullscreenDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onShrink={shrinkToWidget}
                contact={live.contact}
                messages={live.messages}
                viewer={live.viewer}
                onSend={live.sendMessage}
                sending={live.sending}
                loading={live.loading}
                error={live.error}
            />
        </>
    );
}
