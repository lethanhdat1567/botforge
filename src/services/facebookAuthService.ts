import { http } from "@/http/fetch";
import { baseResponse } from "@/types/response";

interface IFacebookAuth {
    facebookProviderId: string;
    fbAccessToken: string;
}

export interface FacebookResponse {
    id: string;
    name: string;
    accessToken: string;
}

const FACEBOOK_AUTH_BASE = "/api/facebook-auth";

export const facebookAuthService = {
    createAccount: async (payload: IFacebookAuth) => {
        const res = await http.post(`${FACEBOOK_AUTH_BASE}/login`, payload);

        return res;
    },
    getPages: async () => {
        const res: baseResponse<FacebookResponse[]> = await http.get(
            `${FACEBOOK_AUTH_BASE}/list-pages`,
        );

        return res.data;
    },

    logout: async () => {
        const res = await http.delete(`${FACEBOOK_AUTH_BASE}/logout`);

        return res;
    },
};
