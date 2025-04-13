"use client";

import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const updateUserData = (userData) => { 
        setUserData(userData);
        // console.log("User admin updated in context: ", userData);        
    };

    const reFetchUserData = async () => {
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

            const user = await response.json();
            
            if (!response.ok) {
                console.error("Error fetching user: ", userData);
                // setUser(null); 
                return;
            }

            setUserData(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null); // Clear user data if an error occurs
        } finally {
            setLoadingUser(false); // Ensure loading state updates even on errors
        }
    };

    return (
        <UserDataContext.Provider value={{ userData, updateUserData, reFetchUserData, loadingUser }}>
            {children}
        </UserDataContext.Provider>
    );
};


export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useAdminUser must be used within an UserDataProvider");
    }
    return context;
};

