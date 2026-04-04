"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    useSidebar,
} from "@/components/ui/sidebar";
import PrivateLogo from "@/components/PrivateLogo";

const data = {
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

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const { isMobile, setOpenMobile } = useSidebar();

    const isActive = (url: string) => {
        if (url === "/") return pathname === "/";
        return pathname.startsWith(url);
    };

    const closeMobile = () => {
        if (isMobile) setOpenMobile(false);
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <PrivateLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
                                            <Link
                                                href={item.url}
                                                onClick={closeMobile}
                                            >
                                                {item.title}
                                            </Link>
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
