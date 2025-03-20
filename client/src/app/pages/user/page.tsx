"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/app/components/PageComponents/Admin/User/UserCard";
import { getCurrentSeason } from "../../components/PageComponents/Admin/User/IntakePicker";
import { useUserData } from "@/app/_utils/userData-context";

// Student/Alumni Dashboard (Home)
export default function UserPage() {
  const { userData } = useUserData();  
  const { user_id, first_name, last_name, role, status } = userData?.user || {};
  const [isClient, setIsClient] = useState(false); // dummy state to track code is running client-side
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const currentSeason = getCurrentSeason();

  const handleLoginRedirectButton = () => {
    router.push("/user/login");
  };

  const handleHomeRedirectButton = () => {
    router.push("/");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const unauthorized = (
    <main className="bg-slate-800 flex flex-row justify-center items-center w-full h-full md:flex-row md:items-center z-50 top-0 left-0 fixed">
      <div>
        <img
          src="/sait-logo-trans.png"
          alt="Campus Connect"
          className="rounded-lg mb-6 mx-auto w-40 md:w-60"
        />                              
        <div>
          <h1 className="text-4xl text-white font-bold">403</h1>
          <h2 className="text-2xl text-white font-semibold">
            Forbidden Access
          </h2>
          <p className="text-white">You must Log In to view this page.</p>
        </div>

        <div className="flex flex-row justify-center items-center space-x-4 mt-6">
          <button
            onClick={handleLoginRedirectButton}
            className="w-32 flex flex-row justify-center items-center hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl"
          >
            <p className="text-saitWhite">Login</p>
          </button>
          <button
            onClick={handleHomeRedirectButton}
            className="w-32 flex flex-row justify-center items-center  hover:bg-saitBlue border-white border-2 rounded-2xl p-3 cursor-pointer shadow-xl"
          >
            <p className="text-saitWhite">Home</p>
          </button>
        </div>
      </div>
    </main>
  );


  const authorizedPage = (
    <main>
      <div className="m-8">
        <h1 className="text-4xl font-bold mb-6">Welcome back, {first_name}!</h1>
        <p className="text-saitGray">Here's what's happening at SAIT today. </p>
      </div>
    </main>
  );

  return !userData ? unauthorized : authorizedPage;
}