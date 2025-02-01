"use client"

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Student/Alumni Dashboard (Home)
export default function UserHomePage() {

    const { user, authUserLoading } = useUserAuth();
    const [isClient, setIsClient] = useState(false);                                    // dummy state to track code is running client-side
    const router = useRouter();

    const handleLoginRedirectButton = () => {
        router.push("/user/login");
    };

    const handleHomeRedirectButton = () => {
        router.push("/");
    }

    useEffect(() => {
        console.log("LOGGED IN USER: ", user)                                                               // set to true only after component has mounted on the client
    }, [user]);


    useEffect(() => {
        setIsClient(true);                                                                  // set to true only after component has mounted on the client
    }, []);


    if (authUserLoading || !isClient) {
        return null;                                                // prevent rendering until the component is mounted on the client side
    }


    
    return (
        !user ? (
            <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
                <div>
                {/* <img
                    src="/sait-logo.png"
                    alt="Campus Connect"
                    className="rounded-lg mb-6 mx-auto w-40 md:w-60"
                /> */}
                    <div>
                        <h1 className="text-4xl text-white font-bold">403</h1>
                        <h2 className="text-2xl text-white font-semibold">Forbidden Access</h2>
                        <p className="text-white">You must Log In to view this page.</p>
                    </div>
        
                    <div className="flex flex-row justify-center items-center space-x-4 mt-6">
                        <button 
                            onClick={handleLoginRedirectButton} 
                            className="w-32 flex flex-row justify-center items-center hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl">
                            <p className="text-saitWhite">Login</p>
                        </button>
                        <button 
                            onClick={handleHomeRedirectButton} 
                            className="w-32 flex flex-row justify-center items-center  hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl">
                            <p className="text-saitWhite">Home</p>
                        </button>
                    </div>
                </div>      
            </main>
        ) : (
            <main className="min-h-screen bg-gray-100 text-black m-4">
                <div className="min-h-screen flex flex-row items-start bg-saitWhite">
                    <div className=" flex grow flex-col items-center">
                        <div>
                            <img src="/graduation.jpg" className="w-96"/>
                        </div>
                        <img src="/graduation.jpg" className="w-96 mt-20"/>
                        
                    </div>
                        <div className="flex grow flex-col items-center">               
                            <img src="/calendar.png" className="w-96"/>
                            <img src="/students.jpg" className="w-96 mt-10"/>               
                        </div>

                    </div>

            </main>
        )
        
    );
}