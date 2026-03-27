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
import PrivateLogo from "@/components/PrivateLogo";

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
                    title: "Mẫu Cộng đồng",
                    url: "/admin/flow-shares",
                },
                {
                    title: "Danh mục bài viết",
                    url: "/admin/blog-category",
                },
                {
                    title: "Bài viết",
                    url: "/admin/blogs",
                },
            ],
        },
        {
            title: "Hỗ trợ",
            items: [
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
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <PrivateLogo />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
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
