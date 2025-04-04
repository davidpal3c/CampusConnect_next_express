"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // Update user data
    const updateUserData = (newData) => {
        setUserData(newData);
    }

    // Fetch user data when the provider is mounted
    useEffect(() => {
        reFetchUserData();
    }, []);

    // Fetch user data from API
    const reFetchUserData = async () => {
        setLoadingUser(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await handleApiResponse(response);
            setUserData(data); // Set user data (null if error occurs)
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
        } finally {
            setLoadingUser(false);
        }
    };

    return (
        <UserDataContext.Provider value={{ userData, setUserData, reFetchUserData, loadingUser, updateUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

// Custom hook for using the UserDataContext
export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }
    return context;
};

// Function to handle API response and errors
const handleApiResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        toast.error(`Error: ${data.message || "Failed to fetch user data"}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        return null;
    }

    return data;
};
