"use client";

import Link from "next/link";
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

type NavItem = {
    title: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => {
                    const hasChildren = !!item.items?.length;

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={index === 1}
                        >
                            <SidebarMenuItem>
                                {/* ===== CHA: luôn là trigger ===== */}
                                <CollapsibleTrigger
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <SidebarMenuButton tooltip={item.title}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                {/* ===== ARROW: hễ có items là hiện ===== */}
                                {hasChildren && (
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight />
                                            <span className="sr-only">
                                                Toggle
                                            </span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                )}

                                {/* ===== CON: link thật ===== */}
                                {hasChildren && (
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items!.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.url}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            href={{
                                                                pathname:
                                                                    subItem.url,
                                                            }}
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
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
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
