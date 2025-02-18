"use client";

import React from "react";

import StudentSidebar from "@/app/components/Sidebar/StudentSidebar";
import UserHeader from "@/app/components/Header/UserHeader";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row items-start h-screen bg-white text-saitBlack">
      <StudentSidebar />

      <div className="flex flex-col bg-gray-100 w-full h-full">
        <UserHeader />

        <main className="h-full overflow-auto">{children}</main>
      </div>
    </main>
  );
}
