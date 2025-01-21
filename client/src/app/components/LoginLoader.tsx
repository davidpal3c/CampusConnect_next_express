'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useUserAuth } from "@/app/_utils/auth-context";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';


interface LoaderPageProps {
    route: string; 
    result: any;
    backdrop?: boolean | Dispatch<SetStateAction<boolean>>;
}

export default function LoaderPage({ route, result, backdrop }: LoaderPageProps) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    // const [dbUser, setDbUser] = useState(false);
    const { user, signOutFirebase, getIdToken } = useUserAuth();    

    const closeLoaderBackdrop = () => {
        if (typeof backdrop === "function") {
            backdrop(false);
        }
    }

    const processSignIn = async () => {
        try {
            console.log("User: ", result.user);
            // const userInfo = {
            //     email: result.user.email
            // }

            
            let token = await getIdToken(true);
            sessionStorage.setItem('authToken', token);

            token = sessionStorage.getItem('authToken');

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
            
            // setDbUser(userResponse);
            // console.log("DB User: ", dbUser);

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