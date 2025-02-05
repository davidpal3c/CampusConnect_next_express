"use client"; 

import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect } from "react";

export default function Notifications() {

  const { user } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="p-4 h-screen">
      <div className="bg-saitWhite h-screen">Notifications</div>
      {/* { user ? (
        <div>
          <div className="bg-saitWhite h-screen">{user?.displayName}</div>
        </div>
      ) : (
        <p className="test-black">No user</p>
      ) } */}
    </div>
  );
}
