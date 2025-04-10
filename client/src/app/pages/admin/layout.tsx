"use client"

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import Sidebar from '@/app/components/Sidebar/Sidebar';
import AdminHeader from '@/app/components/Header/AdminHeader';
import { ArticleTypesProvider } from '@/app/_utils/articleTypes-context';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // State Management for Sidebar
    const [isOpen, setIsOpen] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 })
    // Handle Sidebar Toggle    
    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setShouldShowButton(isMobile);
    }, []);

    return (
        <main className="flex min-h-screen bg-white">
            <ArticleTypesProvider>
                {/* Sidebar - Hidden on small screens */}
                <aside className={`fixed md:relative md:block ${isOpen ? "block" : "hidden"} z-50`}>
                    <Sidebar />
                </aside>

                {/* Main Content Area */}
                <div className="flex flex-col bg-saitWhite w-full h-screen overflow-hidden">
                    {/* Header */}
                    <header className="flex justify-between h-[3.5rem] md:h-16 p-2 shadow-sm sticky top-0 z-40">
                        <AdminHeader shouldShowButton={shouldShowButton} handleSidebarToggle={handleSidebarToggle}/>
                    </header>

                    {/* Page Content */}
                    <section className="flex-grow overflow-auto relative">
                        {children}
                    </section>
                </div>
            </ArticleTypesProvider>
        </main>

    );
}