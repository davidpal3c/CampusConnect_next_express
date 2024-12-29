"use client"

import Sidebar from '@/app/components/Sidebar/Sidebar';
import Header from '@/app/components/Header/Header';
import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useUserAuth();

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
