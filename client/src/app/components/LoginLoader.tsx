'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useUserAuth } from "@/app/_utils/auth-context";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { useAdminUser } from '@/app/_utils/adminUser-context';

interface LoaderPageProps {
    result: any;
    backdrop?: boolean | Dispatch<SetStateAction<boolean>>;
}

export default function LoaderPage({ result, backdrop }: LoaderPageProps) {
    const [isMounted, setIsMounted] = useState(false);

    const { user, processUserSignIn } = useUserAuth();    
    const { adminUser } = useAdminUser();

    const closeLoaderBackdrop = () => {
        if (typeof backdrop === "function") {
            backdrop(false);
        }
    }

    const processSignIn = async () => {
        try {
            processUserSignIn(result, closeLoaderBackdrop);     
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

 