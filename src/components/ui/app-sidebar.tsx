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
                    title: "Mẫu của tôi",
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
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        BotForge
                                    </span>
                                    <span className="truncate text-xs">
                                        ChatbotAI
                                    </span>
                                </div>
                            </a>
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
