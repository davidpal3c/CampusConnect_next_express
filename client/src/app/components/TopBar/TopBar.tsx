"use client";

import React, {useState, useEffect} from "react";
import { Menu, MenuItem } from "@mui/material";
import { TopBarButton, TopBarDropdown, TopBarDropdownOption } from "./TopBarButtons";
import Loader from "../Loader/Loader";

import { fetchArticleTypes } from "@/app/pages/user/articles/articles";
import { useUser } from "@/app/_utils/user-context";
import TopBarNavigator from "./TopBarNavigator";
import { ArticleTypeInterface } from "@/app/pages/user/props";


export default function TopNavBar() {


    const { user, loadingUser } = useUser();
    const { image_url, user_id } = user?.user || {};
    const [articleTypes, setArticleTypes] = useState([]);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!loadingUser) {  // Only proceed once `loadingUser` is false
            const fetchData = async () => {
                try {
                    const articleTypes = await fetchArticleTypes();

                    if (articleTypes) setArticleTypes(articleTypes);

                    console.log("articleTypes", articleTypes);
                } catch (error) {
                    console.error("Error fetching article types:", error);
                } finally {
                    setLoading(false); 
                }
            };

            fetchData();
        }
    }, [loadingUser]);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    if (!loadingUser) {
        const userKeys = Object.keys(user || {});
        console.log("Available properties:", userKeys);
        console.log("User:", user.user);
    }
    

    if (loading) return <Loader isLoading={loading} />;
    return (
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
                    <TopBarDropdown 
                    children={
                        <div>
                            {articleTypes.map((type: ArticleTypeInterface) => (
                                <TopBarDropdownOption 
                                    key={type.type_id} 
                                    href={{
                                        pathname: "/user/articles",
                                        query: { type: type.name }  
                                    }}
                                >
                                    {type.name}
                                </TopBarDropdownOption>
                             ))}  
                        </div>
                    } buttonText="Articles"
                    />
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

                    {/* Mobile Menu (Hamburger Icon) */}
                    <div className="md:hidden">
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Account</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
        <TopBarNavigator userId={user_id}/>
    </div>
    );
}
