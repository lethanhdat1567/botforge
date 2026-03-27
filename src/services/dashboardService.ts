import { http } from "@/http/fetch";

export interface DashboardStats {
    summary: {
        flowsCount: number;
        recordsCount: number;
        sharesCount: number;
        executionsCount: number;
    };
    chartData: Array<{
        day: string;
        executions: number;
    }>;
}

export interface AdminDashboardStats {
    summary: {
        usersCount: number;
        sharedFlowsCount: number;
        postsCount: number;
    };
    chartData: Array<{
        day: string;
        users: number;
        sharedFlows: number;
        posts: number;
    }>;
}

interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export const dashboardService = {
    /**
     * Lấy thông tin thống kê Dashboard của User
     * BE: DashboardController.getUserStats -> DashboardService.getUserStats
     */
    getUserStats: async (from?: string, to?: string) => {
        const res = await http.get<ApiResponse<DashboardStats>>("/api/dashboard/user", {
            params: { from, to }
        });
        return res.data;
    },

    /**
     * Lấy thông tin thống kê Dashboard của Admin
     * BE: DashboardController.getAdminStats -> DashboardService.getAdminStats
     */
    getAdminStats: async (from?: string, to?: string) => {
        const res = await http.get<ApiResponse<AdminDashboardStats>>("/api/dashboard/admin", {
            params: { from, to }
        });
        return res.data;
    },
};
