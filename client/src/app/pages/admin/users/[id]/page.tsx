"use client";

// React & Next
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// Components
import Loader from "@/app/components/Loader/Loader";
import { UpdateDialog } from "@/app/components/Dialogs/Dialogs";

// Icons
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GradeIcon from '@mui/icons-material/Grade';
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';

import { Tooltip } from '@mui/material';

export default function UserDetails() {

    // State Management
    const [user, setUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const router = useRouter();

    // Get the user ID from the URL
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (id) {
        fetchUserData(id);
        }
    }, [id]);


    // Loader
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user && user !== null) {
            setIsLoading(false);
        }
        }, [user]);


    // Fetch user data from the API
    const fetchUserData = async (userId: string) => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });
        const userData = await response.json();
        setUser(userData);

        console.log(userData);
        } catch (error) {
        console.error("Error fetching user data:", error);
        }
    };
  
  // Display the date in a more readable format
    const formatDate = (date: string) => new Date(date).toDateString();

    if (!user) return <Loader isLoading={isLoading} />;

    const {
        first_name,
        last_name,
        role,
        email,
        imageUrl,
        user_id,
        created_at,
        Student,
        Admin,
        Alumni,
    } = user;

    // Destructure role-specific fields based on the user role
    const { Program } = Student || {};
    const { Department } = Program || {};
    const { graduation_year, credentials, current_position, company } = Alumni || {};
    const { permissions } = Admin || {};


    // Dialog Handlers

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false); 
    };
    
    const handleSubmit = async (user) => {
        setOpenDialog(false);
        console.log(user);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center ">
                <Tooltip title="Back to Users" arrow>
                    <button onClick={() => router.push("/admin/users")} className="flex items-center mb-6">
                        <ArrowBackIosRoundedIcon className="mr-4"/>
                    </button>
                </Tooltip>
            </div>
        
            <div className="bg-saitWhite h-screen flex flex-col items-center justify-center">    
                <div className="flex flex-row mb-28">
                    <div className="mr-12">
                        {imageUrl ? (
                            <img src={imageUrl.replace(/=s\d+-c$/, "=s400-c")} alt="User Photo" className="w-96 ml-3 mr-2 rounded-full border border-slate-500" />
                        ) : (
                            <img src="/face.png" alt="User Photo" className="w-96 ml-3 mr-2 rounded-full border border-slate-500" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold text-saitBlack">{first_name + " " + last_name}</h1>
                        <p className="text-lg font-semibold text-saitLighterBlue">{role}</p>

                        <div className="space-y-6 my-16">
                            <div className="flex flex-row space-x-4 items-center">
                                <AlternateEmailIcon className="text-saitBlack text-4xl" />
                                <p className="text-lg text-saitBlack underline">{email}</p>
                            </div>
                            <div className="flex flex-row space-x-4 items-center">
                                <Grid3x3Icon className="text-saitBlack text-4xl" />
                                <p className="text-lg text-saitBlack">{user_id}</p>
                            </div>

                            {/** Role Specific Fields */}

                            {role == "Admin" && (
                                <div className="flex flex-row space-x-4 items-center">
                                    <WorkspacePremiumIcon className="text-saitBlack text-4xl" />
                                    <p className="text-lg text-saitBlack">
                                        Permissions: {permissions}
                                    </p>
                                </div>
                            )}

                            {role == "Student" && (
                                <div className="flex flex-row space-x-4 items-center">
                                    <SchoolIcon className="text-saitBlack text-4xl" />
                                    <p className="text-lg text-saitBlack">
                                        {Program?.name} - {Department?.name}
                                    </p>
                                </div>
                            )}

                            {role == "Alumni" && (
                                <div className="space-y-6">
                                    <div className="flex flex-row space-x-4 items-center">
                                        <GradeIcon className="text-saitBlack text-4xl" />
                                        <p className="text-lg text-saitBlack">
                                            Graduated: {graduation_year}
                                        </p>
                                    </div>

                                    <div className="flex flex-row space-x-4 items-center">
                                        <SchoolIcon className="text-saitBlack text-4xl" />
                                        <p className="text-lg text-saitBlack">
                                            {credentials}
                                        </p>
                                    </div>

                                    <div className="flex flex-row space-x-4 items-center">
                                        <WorkIcon className="text-saitBlack text-4xl" />
                                        <p className="text-lg text-saitBlack">
                                            Works at: {company} as {current_position}
                                        </p>
                                    </div>

                                </div>            
                            )}
                            <div className="flex flex-row space-x-4 items-center">
                                <AccessTimeIcon className="text-saitBlack text-4xl" />
                                <p className="text-lg text-saitBlack">Joined Campus Connect: {formatDate(created_at)}</p>
                            </div>
                        </div>
                        
                        <Button variant="outlined" className="font-semibold" onClick={handleOpen}>Edit {role}</Button>

                        <UpdateDialog  open={openDialog} handleClose={handleClose} handleSubmit={handleSubmit} initialData={user} title= {`Update ${role} User`}/>
                    </div>
                </div> 
            </div>

        </div>
  );
}