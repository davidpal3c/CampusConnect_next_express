"use client"

import React, {useState} from 'react';
import { useMediaQuery } from "react-responsive";
import Sidebar from '@/app/components/Sidebar/Sidebar';
import Header from '@/app/components/Header/Header';


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
        <main className="flex min-h-screen bg-white">
            {/* Sidebar - Hidden on small screens */}
            <aside className={`fixed md:relative md:block ${isOpen ? "block" : "hidden"} z-50`}>
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col bg-gray-100 w-full h-screen">
                {/* Header */}
                <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
                    <Header shouldShowButton={shouldShowButton} handleSidebarToggle={handleSidebarToggle}/>
                </header>

                {/* Page Content */}
                <section className="flex-grow overflow-auto">
                    {children}
                </section>
            </div>
        </main>

    );
}
