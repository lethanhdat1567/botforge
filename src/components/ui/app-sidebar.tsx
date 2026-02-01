"use client";

import * as React from "react";
import {
    Command,
    LayoutDashboard,
    Workflow,
    Database,
    Layers,
    BookOpen,
    MessageSquare,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/nav-user";
import PrivateLogo from "@/components/PrivateLogo";

const data = {
    navMain: [
        {
            title: "Tổng quan",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },

        {
            title: "Xây dựng bot",
            icon: Workflow,
            items: [
                {
                    title: "Luồng hội thoại",
                    url: "/bot/flows",
                },
                {
                    title: "Cấu hình bot",
                    url: "/bot/settings",
                },
            ],
        },

        {
            title: "Dữ liệu & báo cáo",
            icon: Database,
            items: [
                {
                    title: "Quản lý trang kết nối",
                    url: "/data/pages",
                },
                {
                    title: "Mẫu kịch bản",
                    url: "/data/templates",
                },
                {
                    title: "Thống kê hội thoại",
                    url: "/data/analytics",
                },
            ],
        },
        {
            title: "Mẫu cộng đồng",
            icon: Layers,
            items: [
                {
                    title: "Mẫu chia sẻ của tôi",
                    url: "/community/store",
                },
                {
                    title: "Kho mẫu cộng đồng",
                    url: "/community/templates",
                },
                {
                    title: "Mẫu đã lưu",
                    url: "/community/saved",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Hướng dẫn sử dụng",
            url: "#",
            icon: BookOpen,
        },
        {
            title: "Tư vấn trực tiếp",
            url: "#",
            icon: MessageSquare,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
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
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
