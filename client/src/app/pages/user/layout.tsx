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
    <main className="flex flex-row items-start min-h-screen bg-white">
      <nav className="flex items-center w-52 md:w-60 lg:w-64 xl:w-72 h-full bg-saitBlue">
        <StudentSidebar />
      </nav>
      <div className="flex flex-col bg-gray-100 w-full h-full">
        <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
          <UserHeader />
        </header>
        <main className="h-full">
          {children}
        </main>
      </div>
    </main>
  );
}
