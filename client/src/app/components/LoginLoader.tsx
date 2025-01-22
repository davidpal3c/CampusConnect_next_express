'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useUserAuth } from "@/app/_utils/auth-context";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { useUserData } from '@/app/_utils/userData-context';

interface LoaderPageProps {
    result: any;
    backdrop?: boolean | Dispatch<SetStateAction<boolean>>;
    routeType: string;
}

export default function LoaderPage({ result, backdrop, routeType }: LoaderPageProps) {
    const [isMounted, setIsMounted] = useState(false);

    const { user, processAdminSignIn, processUserSignIn } = useUserAuth();    
    const { userData } = useUserData();

    const closeLoaderBackdrop = () => {
        if (typeof backdrop === "function") {
            backdrop(false);
        }
    }

    const processSignIn = async () => {
        try {
            switch(routeType) {
                case "admin":
                    processAdminSignIn(result, closeLoaderBackdrop);     
                    break;
                case "user":
                    console.log("User sign in result:");
                    processUserSignIn(result, closeLoaderBackdrop);                     
                    break;
                default:
            }
            
        } catch (error: any) {
            console.error("Sign In process error:", error);        
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

    // user contexts debug logging 
    useEffect(() => {
        console.log("User-Authentication state updated:", user);    
    }, [user]);

    useEffect(() => {
        console.log("UserData state updated:", userData);    
    }, [userData]);

    return (
        <div className="bg-slate-800 flex justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">            
            <div className="flex flex-col justify-center items-center">
                {routeType === "admin" ? (
                    <p className="text-slate-100 mb-4">Loading Admin Page... Please wait...</p> 
                ) : (
                    <p className="text-slate-100 mb-4">Loading... Please wait...</p> 
                )}  
                <CircularProgress sx={{ color: "white"}}/>               
            </div>
        </div>
    );
}

 