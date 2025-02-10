"use client"

import React, {useState} from 'react';
import { useMediaQuery } from "react-responsive";
import Sidebar from '@/app/components/Sidebar/Sidebar';
import AdminHeader from '@/app/components/Header/AdminHeader';


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // State Management for Sidebar
    const [isOpen, setIsOpen] = useState(false);
    const shouldShowButton = useMediaQuery({ maxWidth: 767 });

    // Handle Sidebar Toggle

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <main className="flex min-h-screen bg-white w-screen overflow-x-hidden">
            {/* Sidebar - Hidden on small screens */}
            <aside className={`fixed md:relative md:block ${isOpen ? "block" : "hidden"} z-50`}>
                <div className="">
                    <Sidebar />
                </div>
                
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col bg-saitWhite w-full h-full overflow-x-hidden">
                {/* Header */}
                <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
                    <AdminHeader shouldShowButton={shouldShowButton} handleSidebarToggle={handleSidebarToggle}/>
                </header>

                {/* Page Content */}
                <section className="flex-grow overflow-auto relative">
                    {children}
                </section>
            </div>
        </main>

    );
}
