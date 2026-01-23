"use client";

import api from "@/config/axios";
import { useEffect } from "react";

function Dashboard() {
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await api.get("/profile");
            } catch (error) {
                console.log(error);
            }
        };
        getProfile();
    }, []);

    return <div>Dashboard Page</div>;
}

export default Dashboard;
