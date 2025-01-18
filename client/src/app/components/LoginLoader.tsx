'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useUserAuth } from "@/app/_utils/auth-context";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { useAdminUser } from '@/app/_utils/adminUser-context';

interface LoaderPageProps {
    route: string; 
    result: any;
    backdrop?: boolean | Dispatch<SetStateAction<boolean>>;
}

export default function LoaderPage({ route, result, backdrop }: LoaderPageProps) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const { user, updateAuthUser, signOutFirebase, getIdToken } = useUserAuth();    
    const { adminUser, updateAdminUser } = useAdminUser();

    const closeLoaderBackdrop = () => {
        if (typeof backdrop === "function") {
            console.log("Closing loader...");
            backdrop(false);
        }
    }

    const processSignIn = async () => {
        try {
            if (!user) {
                throw new Error("No user available, unable to retrieve token.");
            }

            let token = user.currentToken;
            if (!token) {
                console.log("No token in user object, attempting to fetch new token...");
                token = await getIdToken(true);
            }

            if (!token) {
                throw new Error("Unable to retrieve authentication token. Please try again.");
            }

            console.log("Token retrieved successfully:", token);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { 
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                credentials: "include",
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Login failed:", errorData);  
                toast.error(errorData.message || "An unknown error occurred");

                await signOutFirebase();
                closeLoaderBackdrop();
                return;
            }            

            const userResponse = await response.json();
            console.log("User response: ", userResponse);

            
            updateAuthUser({ 
                role: userResponse.data.role,
                currentToken: token 
            });
            updateAdminUser(userResponse.data);
            
            toast.success(userResponse.message);
            router.push(route);

        } catch (error: any) {
            console.error("Sign In process error:", error);        
            toast.error(error.message || "Oops Something went wrong!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            await signOutFirebase();
            closeLoaderBackdrop();
        }
    } 

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const timer = setTimeout(() => {
                processSignIn();
            }, 2000); 

            return () => clearTimeout(timer);
        }
    }, [isMounted]);

    // Debug logging
    useEffect(() => {
        console.log("User state updated:", user);    
    }, [user]);

    useEffect(() => {
        console.log("Admin user state updated:", adminUser);    
    }, [adminUser]);

    return (
        <div className="bg-slate-800 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
            <div className="flex flex-col justify-center items-center">
                <p className="text-slate-100 mb-4">Loading Admin Page... Please wait...</p>    
                <CircularProgress sx={{ color: "white"}}/>               
            </div>
        </div>
    );
}


