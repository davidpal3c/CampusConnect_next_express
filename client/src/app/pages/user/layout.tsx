"use client";

import React, {useEffect, useState} from 'react';
import { useMediaQuery } from "react-responsive";

import TopBar from '@/app/components/TopBar/TopBar';

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
        <div className="flex flex-col bg-gray-200 w-full h-screen">
            <header>
                <TopBar />
            </header>
            <section className="flex-grow overflow-auto relative bg-saitWhite">
                {children}
            </section>
        </div>
    </main>
  );
}
