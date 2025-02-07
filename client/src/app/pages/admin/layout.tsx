"use client"

import React from 'react';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import AdminHeader from '@/app/components/Header/AdminHeader';



export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <main className="flex flex-row items-start min-h-screen bg-saitWhite">
            <nav className="flex items-start w-64 md:w-60 lg:w-64 xl:w-72 h-full bg-slate-800">
                <Sidebar />
            </nav>
            <div className="flex flex-col bg-saitWhite w-full h-full">
                <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
                    <AdminHeader />
                </header>
                <main className="flex-1 relative">
                    {children}
                </main>
            </div>
        </main>
    );
}
