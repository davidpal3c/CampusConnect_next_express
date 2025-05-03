"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/components/Loader/Loader";
import ActionButton from "@/app/components/Buttons/ActionButton";
import {
    ArrowBackIosRounded as BackIcon,
    AlternateEmail as EmailIcon,
    Grid3x3 as IdIcon,
    School as SchoolIcon,
    AccessTime as TimeIcon,
    WorkspacePremium as AdminIcon,
    Grade as GradeIcon,
    Work as WorkIcon,
    Edit as EditIcon
} from "@mui/icons-material";
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { Tooltip, IconButton, Chip } from '@mui/material';

type User = {
    first_name?: string;
    last_name?: string;
    role?: string;
    email?: string;
    image_url?: string;
    user_id?: string;
    created_at?: string;
    Student?: {
        Program?: {
        name?: string;
        Department?: {
            name?: string;
            department_id?: string;
        };
        program_id?: string;
        };
        intake?: string;
        intake_year?: number;
        status?: string;
        student_type?: string;
    };
    Admin?: {
        permissions?: string;
    };
    Alumni?: {
        AlumniStudy?: Array<{
        Program?: {
            name?: string;
            program_id?: string;
        };
        Department?: {
            name?: string;
            department_id?: string;
        };
        graduation_year?: number;
        }>;
        company?: string;
        current_position?: string;
    };
}

export default function UserDetailsView() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (id && typeof id === "string") {
        fetchUserData(id);
        }
    }, [id]);

    const fetchUserData = async (userId: string) => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        
        const userData = await response.json();
            setUser(userData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading || !user) return <Loader isLoading={isLoading} />;

    const {
        first_name,
        last_name,
        role,
        email,
        image_url,
        user_id,
        created_at,
        Student,
        Admin,
        Alumni
    } = user;

    // imageHandler
    const getProfileImageUrl = () => {
        if (!image_url && image_url !== '') return "/avatar-generic.jpg";
        
        if (image_url.includes('googleusercontent.com')) { 
            return image_url.split('=')[0] + '=s400-c';                 // Remove any size parameters and set to 400px
        }
        
        return image_url;
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
        {/* Header with back button and edit action */}
        <div className="flex justify-between items-center mb-8">
            <Tooltip title="Back to Users" arrow>
            <IconButton 
                onClick={() => router.push("/admin/users")} 
                className="hover:bg-slate-100"
            >
                <BackIcon />
            </IconButton>
            </Tooltip>
            
            <div className="flex flex-row space-x-2">
                <ActionButton 
                    title="User Analytics" 
                    onClick={() => console.log("User Data Analytics")}
                    icon={<QueryStatsRoundedIcon />}
                    borderColor="border-saitPurple" 
                    textColor="text-saitGray" 
                    hoverBgColor="bg-saitPurple" 
                    hoverTextColor="text-saitWhite" 
                    textSize="text-sm"
                />
                <ActionButton 
                    title="Edit User" 
                    onClick={() => console.log("Edit User")}
                    icon={<EditIcon />}
                    borderColor="border-saitBlue" 
                    textColor="text-saitGray" 
                    hoverBgColor="bg-saitBlue" 
                    hoverTextColor="text-saitWhite" 
                    textSize="text-sm"
                />
            </div>
            
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-slate-700 via-saitDarkPurple to-saitBlue p-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{first_name} {last_name}</h1>
                    <div className="mt-2 flex items-center justify-start space-x-2">
                        <div 
                            className={`inline-flex items-center justify-center font-semibold mt-2 text-sm px-3 py-1 rounded-full
                                    ${
                                        role === 'Admin' ? 'bg-red-100 text-saitDarkRed' :
                                        role === 'Student' ? 'bg-blue-100 text-saitBlue' :
                                        'bg-purple-100 text-saitDarkPurple'
                                    }
                                `}
                            >
                            <p className="font-semibold">{role}</p>
                        </div>
                    </div>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden">
                <Image 
                    src={getProfileImageUrl()}
                    alt={`${first_name} ${last_name}`} 
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                    priority
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;                                                          // Prevent infinite loop
                        target.src = "/avatar-generic.jpg";
                    }}
                />
                </div>
            </div>
            </div>

            {/* Rest of your component remains the same */}
            {/* Profile Details */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                <DetailItem icon={<IdIcon />} label="User ID" value={user_id} />
                <DetailItem icon={<EmailIcon />} label="Email" value={email} isEmail />
                <DetailItem icon={<TimeIcon />} label="Joined" value={created_at ? formatDate(created_at) : "Unknown"} />
            </div>

            {/* Role-Specific Info */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    {role === 'Admin' ? 'Admin Details' : 
                    role === 'Student' ? 'Academic Information' : 
                    'Professional Information'}
                </h2>

                {role === 'Admin' && (
                    <DetailItem 
                        icon={<AdminIcon />} 
                        label="Permissions" 
                        value={Admin?.permissions || "Standard"} 
                    />
                )}

                {role === 'Student' && (
                    <>
                        <DetailItem 
                            icon={<SchoolIcon />} 
                            label="Program" 
                            value={Student?.Program?.name} 
                        />
                        <DetailItem 
                            icon={<LocationCityRoundedIcon />} 
                            label="Department" 
                            value={Student?.Program?.Department?.name} 
                        />
                        <DetailItem 
                            icon={<SchoolIcon />} 
                            label="Status" 
                            value={`${Student?.status} (${Student?.student_type})`} 
                        />
                        <DetailItem 
                            icon={<SchoolIcon />} 
                            label="Intake" 
                            value={`${Student?.intake} ${Student?.intake_year}`} 
                        />
                    </>
                )}

                {role === 'Alumni' && (
                <>
                    {Alumni?.AlumniStudy?.map((study, index) => (
                    <div key={index} className="space-y-2">
                        <DetailItem 
                            icon={<GradeIcon />} 
                            label="Studied" 
                            value={study.Program?.name} 
                        />
                        <DetailItem 
                            icon={<GradeIcon />} 
                            label="Graduated" 
                            value={study.graduation_year?.toString()} 
                        />
                    </div>
                    ))}
                    <DetailItem 
                        icon={<WorkIcon />} 
                        label="Current Position" 
                        value={Alumni?.current_position} 
                    />
                    <DetailItem 
                        icon={<WorkIcon />} 
                        label="Company" 
                        value={Alumni?.company} 
                    />
                </>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    }

function DetailItem({ icon, label, value, isEmail = false }: { 
    icon: React.ReactNode, 
    label: string, 
    value?: string | null, 
    isEmail?: boolean 
}) {
    if (!value) return null;

    return (
        <div className="flex items-start space-x-3">
        <div className="text-saitBlue pt-1">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            {isEmail ? (
            <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
                {value}
            </a>
            ) : (
            <p className="font-medium text-gray-800">{value}</p>
            )}
        </div>
        </div>
    );
}