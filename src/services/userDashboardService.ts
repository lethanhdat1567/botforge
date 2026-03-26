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

interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export const userDashboardService = {
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
};
