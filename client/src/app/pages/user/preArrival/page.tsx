"use client"
import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect } from "react";

export default function PreArrival() {

  const { user } = useUserAuth();

  useEffect(() => {
    console.log(user);
    console.log(user?.displayName);
  }, [user]);

  return (
    <div>
      <div className="p-4 h-screen">Pre-Arrival</div>
      { user ? (
        <div>
          <div className="bg-saitWhite">{user?.displayName}</div>
        </div>
      ) : (
        <p className="test-black">...loading</p>
      ) }
    </div>
  );
}
