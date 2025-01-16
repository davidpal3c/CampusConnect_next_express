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
            backdrop(false);
        }
    }

    const processSignIn = async () => {
        try {
            // console.log("User: ", result.user);
            // const userInfo = {
            //     email: result.user.email
            // }

            const token = await getIdToken();            
            
            if (!token) {
                throw new Error("Token not available. Please try again.");
            }

            //backend api call
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { 
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                credentials: "include",                         // include cookies in the request
                // body: JSON.stringify({ userInfo }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Login failed:", errorData);  
                toast.error(errorData.message || "An unknown error occurred");

                signOutFirebase();
                closeLoaderBackdrop();
                // router.push("/admin/login");
                return
            }            

            //TODO: load userContext from response
            const userResponse = await response.json();
            console.log("User response: ", userResponse);

            const newUserData =  { role: userResponse.data.role };

            // // Update user contexts 
            updateAuthUser(newUserData);
            updateAdminUser(userResponse.data);
            
            console.log("UPDATED AUTH USER: ", user);
            console.log("UPDATED ADMIN USER: ", adminUser);

            toast.success(userResponse.message);
            router.push(route);

        } catch (error: any) {
            console.log("Sign In error: ", error);        
            toast.error(error.message || "Oops Something went wrong!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            // router.push("/auth/admin/login");
        }
    } 

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const timer = setTimeout(() => {
                processSignIn();
            }, 5000);

            return () => clearTimeout(timer);                   // Cleanup the timer on component unmount
        }
    }, [isMounted, router, route]);

    useEffect(() => {
        console.log("Updated user on reload: ", user);    
    }, [user]);

    useEffect(() => {
        console.log("Updated adminUser on reload: ", adminUser);    
    }, [adminUser]);


    return (
        <div className="bg-slate-800 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
            <div className="flex flex-col justify-center items-center">
                {!isMounted && <p className="text-slate-100">Loading...</p>}
                <p className="text-slate-100 mb-4">Loading Admin Page... Please wait...</p>    
                <CircularProgress sx={{ color: "white"}}/>               
            </div>
        </div>
    );
}