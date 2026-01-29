import api from "@/config/axios";

export const profileService = {
    getProfile: async () => {
        const response = await api.get("/profile");
        return response.data;
    },

    updateProfile: async (data: {
        displayName?: string;
        avatar?: File | null;
    }) => {
        const formData = new FormData();

        if (data.displayName) {
            formData.append("displayName", data.displayName);
        }

        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }

        const response = await api.patch("/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    changePassword: async (data: {
        oldPassword: string;
        newPassword: string;
    }) => {
        const response = await api.patch("/profile/password", data);
        return response.data;
    },
};
