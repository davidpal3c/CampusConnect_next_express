"use client";

import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUserData = (userData) => { 
        setUserData(userData);
        // console.log("User admin updated in context: ", userData);        
    };

    return (
        <UserDataContext.Provider value={{ userData, updateUserData }}>
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

