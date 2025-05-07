"use client";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { UserDataProvider } from "@/app/_utils/userData-context";
import TopBar from "@/app/components/TopBar/TopBar";
import Loader from "@/app/components/Loader/Loader";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State for sidebar and button visibility
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const [isTopBarLoaded, setIsTopBarLoaded] = useState(false);
  const [isChildrenLoaded, setIsChildrenLoaded] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Handle Sidebar Toggle
  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setShouldShowButton(isMobile);
  }, []);

  // Function to confirm when TopBar has rendered
  useEffect(() => {
    setIsTopBarLoaded(true);
  }, []);

  // Function to confirm when children have rendered
  useEffect(() => {
    if (children) {
      setIsChildrenLoaded(true);
    }
  }, [children]);

  // Show loader until both components have loaded
  const isLoading = !isTopBarLoaded || !isChildrenLoaded;

  return (
    <UserDataProvider>
      {!isLoading ? (
        <main className="flex min-h-screen bg-white">
          <div className="flex flex-col bg-saitWhite w-full h-screen">
            <header>
              <TopBar />
            </header>
            <section className="flex-grow overflow-auto relative bg-saitWhite">
              {children}
            </section>
          </div>
        </main>
      ) : ( 
        <Loader isLoading={isLoading} />
      )}
    </UserDataProvider>
  );
}
