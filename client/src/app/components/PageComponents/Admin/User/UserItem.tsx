import React, { useState } from 'react';    
import EditIcon from '@mui/icons-material/Edit';

import Link from 'next/link';

import { Tooltip } from '@mui/material';

interface UserItemProps {
    userObject?: any;   
    // user_id: string;
    // name: string;
    // role?: any;
    // email: string;
    // created_at: string;
    handleEditUser: (user: any) => void;   
}

export default function UserItem({ userObject, handleEditUser }: UserItemProps) {

    const { user_id, role, email} = userObject;
    const [initialFirstName] = useState(() => {
        return userObject.first_name.charAt(0).toUpperCase();
    });

    const [initialLastName] = useState(() => {
        return userObject.last_name.charAt(0).toUpperCase();
    });

    const [created_at] = useState(userObject.created_at);

    // Convert created_at to a Date object
    const createdAtDate = new Date(created_at);

    // Color condition for user's role
    const roleClass =
        role.toLowerCase() === "admin"
            ? "text-saitRed font-semibold" // Red for Admin
            : "text-saitLightBlue font-semibold"; // Blue for Student (alumni, prospective student, current student)

    return (
        <Link href={`users/${user_id}`} passHref>
            <div className="group flex items-center justify-between bg-white shadow-md rounded-lg p-4 m-2 border border-transparent
             hover:border-saitLighterBlue hover:shadow-blue-100 hover:shadow-lg transition-all cursor-pointer duration-300 ease-in-out">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-saitLightBlue/20 text-saitLightBlue font-bold">
                        {initialFirstName}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-semibold group-hover:text-saitBlue">{`${userObject.first_name} ${initialLastName}. ${userObject.last_name}`}</h2>
                            <span className={roleClass}>
                                {userObject.role}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{userObject.email}</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Joined</p>
                        <p className="text-sm text-gray-500">{createdAtDate.toLocaleDateString("en-US")}</p>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditUser(userObject);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-gray-600 hover:text-saitBlue hover:bg-gray-100 rounded-full"
                        aria-label="Edit user"
                    >
                        <Tooltip title="Edit User" arrow>    
                            <EditIcon fontSize="small" />
                        </Tooltip>
                    </button>
                </div>
            </div>
        </Link>
    );
}