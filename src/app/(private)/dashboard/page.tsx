"use client";

import LogoutBtn from "@/components/LogoutBtn";
import api from "@/config/axios";
import { useEffect } from "react";

function Dashboard() {
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await api.get("/profile");
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, []);

    return (
        <div>
            Dashboard Page
            <LogoutBtn />
        </div>
    );
}

export default Dashboard;
