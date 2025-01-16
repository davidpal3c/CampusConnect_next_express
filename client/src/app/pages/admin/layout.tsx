"use client"

import React, { useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Header from '@/app/components/Header/Header';
import { useUserAuth } from "@/app/_utils/auth-context";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, updateAuthUser, getIdToken } = useUserAuth();
    
    const checkSession = async () => {
        try {       
            const token = await getIdToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`, {
                method: "POST",
                headers: { 
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                credentials: "include",                         // include cookies in the request
                // body: JSON.stringify({ userInfo }),
            });

            if (response.ok) {
                const userResponse = await response.json();
                updateAuthUser(userResponse.data);

            } else {
                const errorData = await response.text();
                console.log("Session check failed:", errorData);
            }
        } catch (error) {
          console.error("Error checking session:", error);
      
        }
      }

    // useEffect(() => {
    // if (user) {
    //     checkSession();
    // } 
    // }, []);

    return (
        <main className="flex flex-row items-start min-h-screen bg-white">
            <nav className="flex items-start w-52 md:w-60 lg:w-64 xl:w-72 h-full">
                <Sidebar />
            </nav>
            <div className="flex flex-col bg-gray-100 w-full h-full">
                <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
                    <Header />
                </header>
                <main className="h-full">
                    {children}
                </main>
            </div>
        </main>
    );
}
