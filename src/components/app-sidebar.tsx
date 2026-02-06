"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Quản lý dự án",
            items: [
                {
                    title: "Tổng quan",
                    url: "/admin/dashboard",
                },
                {
                    title: "Người dùng",
                    url: "/admin/users",
                },
                {
                    title: "Flows",
                    url: "/admin/flows",
                },
                {
                    title: "Cộng đồng",
                    url: "/admin/community",
                },
            ],
        },
        {
            title: "Hỗ trợ",
            items: [
                {
                    title: "Blog hướng dẫn",
                    url: "/admin/support/blog",
                },
                {
                    title: "Chat trực tiếp",
                    url: "/admin/support/chat",
                },
            ],
        },
    ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    const isActive = (url: string) => {
        if (url === "/") return pathname === "/";
        return pathname.startsWith(url);
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <VersionSwitcher
                    versions={data.versions}
                    defaultVersion={data.versions[0]}
                />
                <SearchForm />
            </SidebarHeader>

            <SidebarContent>
                {data.navMain.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive(item.url)}
                                        >
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
