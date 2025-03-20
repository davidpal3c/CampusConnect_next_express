"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  
    const [loadingUser, setLoadingUser] = useState(true); 

    const fetchUser = async () => {
        setLoadingUser(true); 
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            const userData = await response.json();

            if (!response.ok) {
                console.error("Error fetching user: ", userData);
                setUser(null); // Clear user data if request fails
                return;
            }

            setUser(userData);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null); // Clear user data if an error occurs
        } finally {
            setLoadingUser(false); // Ensure loading state updates even on errors
        }
    };

    useEffect(() => {
        fetchUser(); // Fetch user data on mount
    }, []);

    return (
        <UserContext.Provider value={{ user, loadingUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
