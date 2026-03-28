"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { isNavPathActive } from "@/lib/utils";

type NavItem = {
    title: string;
    icon: LucideIcon;
    url?: string;
    items?: {
        title: string;
        url: string;
    }[];
};

function NavMainItem({ item, pathname }: { item: NavItem; pathname: string }) {
    const subItems =
        item.items?.filter(
            (sub): sub is { title: string; url: string } => Boolean(sub?.url)
        ) ?? [];
    const hasChildren = subItems.length > 0;
    const hasActiveChild = subItems.some((sub) =>
        isNavPathActive(pathname, sub.url)
    );
    const parentLinkActive =
        !!item.url && isNavPathActive(pathname, item.url);
    const parentActive = parentLinkActive || hasActiveChild;

    const [open, setOpen] = React.useState(hasActiveChild);
    React.useEffect(() => {
        if (hasActiveChild) setOpen(true);
    }, [hasActiveChild]);

    return (
        <Collapsible
            asChild
            {...(hasChildren ? { open, onOpenChange: setOpen } : {})}
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild className="cursor-pointer">
                    <SidebarMenuButton tooltip={item.title} isActive={parentActive}>
                        {item.url ? (
                            <Link
                                href={item.url}
                                className="flex w-full items-center gap-2"
                                onClick={(e) => {
                                    if (hasChildren) {
                                        e.stopPropagation();
                                    }
                                }}
                            >
                                <item.icon size={16} />
                                <span>{item.title}</span>
                            </Link>
                        ) : (
                            <>
                                <item.icon />
                                <span>{item.title}</span>
                            </>
                        )}
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                {hasChildren && (
                    <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                    </CollapsibleTrigger>
                )}

                {hasChildren && (
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.url}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={isNavPathActive(
                                            pathname,
                                            subItem.url
                                        )}
                                    >
                                        <Link href={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                )}
            </SidebarMenuItem>
        </Collapsible>
    );
}

export function NavMain({ items }: { items: NavItem[] }) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <NavMainItem
                        key={item.title}
                        item={item}
                        pathname={pathname}
                    />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
