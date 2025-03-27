"use client";

import React, {useState, useEffect} from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useUserData } from "@/app/_utils/userData-context";
import { useRouter } from "next/navigation";

import { TopBarButton, TopBarDropdown, TopBarDropdownOption } from "./TopBarButtons";
import Loader from "../Loader/Loader";
import { fetchArticleTypes } from "@/app/pages/user/articles/articles";
import TopBarNavigator from "./TopBarNavigator";
import { ArticleTypeInterface } from "@/app/pages/user/props";
import { toast } from "react-toastify";

import { Menu, MenuItem } from "@mui/material";

export default function TopNavBar() {


    const { user, loadingUser } = useUser();
    const { image_url, user_id } = user?.user || {};


    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    if (!loadingUser) {
        const userKeys = Object.keys(user || {});
    }
    

    return (
        <div>
            {isLoading ? (
                <Loader isLoading={authUserLoading || isLoading} />
            ) : (
                <div>
                    <div className="bg-side-red-gradient text-white shadow-xl relative z-10">
                        <div className="container justify-between flex items-center p-4">
                            {/* Logo / Title */}
                            <div className="flex flex-row items-center space-x-2">
                                <img
                                    src="/sait-logo-white.png"
                                    alt="Campus Connect"
                                    className="w-12 h-12 "
                                />
                                <h1 className="text-2xl font-bold">CampusConnect</h1>
                            </div>

                {/* Links (Desktop View) */}
                <nav className="hidden md:flex space-x-6">
                    <TopBarButton href={"/user/"}>Dashboard</TopBarButton>
                    <TopBarButton href={"/user/events/"}>Events</TopBarButton>
                    <TopBarButton href={"/user/groups/"}>Groups</TopBarButton>
                    <TopBarButton href={"/user/articles/"}>Articles</TopBarButton>
                </nav>

                            {/* Profile Icon / Mobile Menu */}
                            <div className="flex items-end space-x-4">
                                <button className="p-1 bg-white text-black rounded-full" onClick={handleMenu}>
                                    <img
                                        src={imageUrl || '/avatar-generic.jpg'} 
                                        alt="User Profile Image"
                                        className="w-12 h-12 rounded-full"
                                    />
                                </button>

                                {/* Mobile Menu (Hamburger Icon) */}
                                <div className="md:hidden">
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem>Profile</MenuItem>
                                        <MenuItem>Account</MenuItem>
                                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopBarNavigator userId={userId}/>
                </div>
            )}
        </div>
    );
}
