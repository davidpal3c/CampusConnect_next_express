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

import { Menu, MenuItem } from "@mui/material";

export default function TopNavBar() {

    const { authUserLoading, signOutAll } = useUserAuth();
    const { userData } = useUserData();
    const [userId, setUserId] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const router = useRouter();

    const [articleTypes, setArticleTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const populateUserData = () => {
        if (userData) {
            setUserId(userData.user_id);
            setImageUrl(userData.image_url);
        }
    }

    const fetchArticlesData = async () => {
        if (userData && !authUserLoading) {  
            try {
                const articleTypes = await fetchArticleTypes();
                if (articleTypes) setArticleTypes(articleTypes);
    
                console.log("articleTypes", articleTypes);
            } catch (error) {
                console.error("Error fetching article types:", error);
            } finally {
                setIsLoading(false); 
            }
        }
    };

    useEffect(() => {
        if (userData && !authUserLoading) {
            fetchArticlesData();
            populateUserData();
    
            // console.log("User:", userData);
            // console.log("User ID:", userId);
            // console.log("User Image:", imageUrl);
        } else if (!authUserLoading && !userData) {
            setIsLoading(false);
        }

    }, [userData, authUserLoading]);


    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

   const handleSignOut = async() => {
        setAnchorEl(null);
        try {
            await signOutAll();
            router.push("/user/login");
        } catch (err) {
            console.log("Sign Out error:", err);
        }
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
