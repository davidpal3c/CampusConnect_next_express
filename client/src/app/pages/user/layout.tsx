"use client";

import React, {useEffect, useState} from 'react';
import { useMediaQuery } from "react-responsive";

import StudentSidebar from "@/app/components/Sidebar/StudentSidebar";
import UserHeader from "@/app/components/Header/UserHeader";

export default function StudentLayout({
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
                {/* Sidebar - Hidden on small screens */}
                <aside className={`fixed md:relative md:block ${isOpen ? "block" : "hidden"} z-50`}>
                  <StudentSidebar />
                </aside>
    
                {/* Main Content Area */}
                <div className="flex flex-col bg-gray-100 w-full h-screen">
                    {/* Header */}
                    <header className="flex justify-between h-[3.5rem] md:h-16 p-2">
                        <UserHeader shouldShowButton={shouldShowButton} handleSidebarToggle={handleSidebarToggle}/>
                    </header>
    
                    {/* Page Content */}
                    <section className="flex-grow overflow-auto relative bg-saitWhite">
                        {children}
                    </section>
                </div>
            </main>
    // <main className="flex flex-row items-start h-screen bg-white text-saitBlack">
    //   <StudentSidebar />

    //   <div className="flex flex-col bg-gray-100 w-full h-full">
    //     <UserHeader />

    //     <main className="h-full overflow-auto">{children}</main>
    //   </div>
    // </main>
  );
}
