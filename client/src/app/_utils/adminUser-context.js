"use client";

import React, { createContext, useContext, useState } from "react";

const AdminUserContext = createContext();

export const AdminUserProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);

    const updateAdminUser = (userData) => { 
        setAdminUser(userData);
        console.log("User admin updated in context: ", userData);        
    };

    return (
        <AdminUserContext.Provider value={{ adminUser, updateAdminUser }}>
            {children}
        </AdminUserContext.Provider>
    );
};


export const useAdminUser = () => {
    const context = useContext(AdminUserContext);
    if (!context) {
        throw new Error("useAdminUser must be used within an AdminUserProvider");
    }
    return context;
};



// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface AdminUserContextType {
//     adminUser: any;
//     setAdminUser: React.Dispatch<React.SetStateAction<any>>;
// }

// interface AdminUserProviderProps {
//     children: ReactNode;    
// }

// const AdminUserContext = createContext<AdminUserContextType | undefined>(undefined);


// export const AdminUserProvider = ({ children }: AdminUserProviderProps): JSX.Element => {
//     const [adminUser, setAdminUser] = useState<any>(null);

//     return (
//         <AdminUserContext.Provider value={{ adminUser, setAdminUser }}>
//             {children}
//         </AdminUserContext.Provider>
//     );
// };

// export const useAdminUser = () => {
//     const context = useContext(AdminUserContext);
//     if (!context) {
//         throw new Error("useAdminUser must be used within an AdminUserProvider");
//     }    
//     return context;
// };
