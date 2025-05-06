"use client";

import React, { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useUserData } from "@/app/_utils/userData-context";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/User/userTypes"
 
import { TopBarButton } from "./TopBarButtons";
import Loader from "../Loader/Loader";
import TopBarNavigator from "./TopBarNavigator";

import { Menu, MenuItem } from "@mui/material";

export default function TopNavBar() {
    const router = useRouter();
    const { userData, loadingUser } = useUserData() as { userData: { user: User }; loadingUser: boolean };
    const user = userData?.user as User;  
    const { authUserLoading, signOutAll } = useUserAuth();
    const image_url = user?.image_url || "/avatar-generic.jpg";
    const user_id = user?.user_id;    

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    async function handleSignOut() {
        setAnchorEl(null);
        try {
            await signOutAll();
            router.push("/user/login");
        } catch (err) {
            console.error("Sign Out error:", err);
        }
    }

    return (
        <div>
            {loadingUser || authUserLoading ? (
                <Loader isLoading={loadingUser || authUserLoading} />
            ) : (
                <div>
                    <div className="bg-side-red-gradient text-white shadow-xl relative z-10">
                        <div className="container flex justify-between items-center p-4">
                            {/* Logo / Title */}
                            <div className="flex flex-row items-center space-x-2">
                                <img
                                    src="/sait-logo-white.png"
                                    alt="Campus Connect"
                                    className="w-12 h-12"
                                />
                                <h1 className="text-2xl font-bold">CampusConnect</h1>
                            </div>

                            {/* Links (Desktop View) */}
                            <nav className="hidden md:flex space-x-6">
                                <TopBarButton href="/user/">Dashboard</TopBarButton>
                                <TopBarButton href="/user/events/">Events</TopBarButton>
                                <TopBarButton href="/user/groups/">Groups</TopBarButton>
                                <TopBarButton href="/user/articles/">Articles</TopBarButton>
                            </nav>

                            {/* Profile Icon / Mobile Menu */}
                            <div className="flex items-end space-x-4">
                                <button className="p-1 bg-white text-black rounded-full" onClick={handleMenu}>
                                    <img
                                        src={image_url}
                                        alt="User Profile Image"
                                        className="w-12 h-12 rounded-full"
                                    />
                                </button>

                                {/* Profile Menu (Works on Both Mobile & Desktop) */}
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>Account</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <TopBarNavigator userId={user_id} />
                </div>
            )}
        </div>
    );
}
