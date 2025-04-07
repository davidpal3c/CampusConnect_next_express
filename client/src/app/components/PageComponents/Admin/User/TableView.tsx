"use client";

// React & Next
import { useState, useEffect } from "react";
import Image from "next/image";
// Components
import { ViewButton, DeleteButton } from "@/app/components/Buttons/Buttons";
import { DeleteDialog } from "@/app/components/Dialogs/Dialogs";

import { useRouter } from "next/navigation";
// MUI Components
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip, IconButton } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

// types
import { UserRole } from '@/app/types/user';



export default function TableView({ users, filteredRole, fieldsByRole }: { users: any[]; filteredRole: UserRole; fieldsByRole: any }) {
    
    const [combinedUsers, setCombinedUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState(null);

    
    const router = useRouter();

    const handleViewUser= (userId: string) => {
        router.push(`/admin/users/${userId}`);
    };


    // Delete function for users
    const deleteUser = async (userId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.statusText}`);
            }
    
            console.log(`User ${userId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleOnDelete = (selectedUserId: string) => {
        setUserId(selectedUserId);
        setOpenDialog(true);
    };
    
    const handleClose = () => {
        setOpenDialog(false); 
    };
    
    const handleConfirm = async () => {
        if (userId) {
            deleteUser(userId);
        }
        setOpenDialog(false);
    };

    useEffect(() => {
        console.log("Filtered Users:", filteredUsers);
    }, [filteredUsers]);


    useEffect(() => {
        console.log('fields by role :', fieldsByRole);
    })


    useEffect(() => {
        if (filteredRole === 'All' || filteredRole === '') {
            setCombinedUsers(users);
            // setFilteredUsers(users);
            return;
        }

        if (!Array.isArray(fieldsByRole)) return;
        
        // console.log('fieldsByRole data:', fieldsByRole);
        // console.log('users data:', users);

        const combined = users.map(user => {

            let roleData = fieldsByRole.find((item: any) => item.user_id === user.user_id);
            console.log('roleData: ', roleData);
            
            if (filteredRole === 'Student' && roleData || filteredRole === 'Prospective Student' && roleData) {
                return {
                    ...user,
                    program_id: roleData.program_id,
                    program_name: roleData.Program?.name,
                    department_name: roleData.Program?.Department.name,
                    intake: roleData.intake,
                    intake_year: roleData.intake_year,
                    status: roleData.status,
                };
            }

            if (filteredRole === 'Admin' && roleData) {
                // const permissions = roleData.permissions.map((permission: any) => permission.name).join(', ');

                if (roleData) {
                    return {
                        ...user,
                        ...roleData,
                    };
                }
            }

            if (filteredRole === 'Alumni' && roleData) {
                const alumniStudies = roleData.AlumniStudy || [];
                const latestStudy = alumniStudies.find((study: any) => study.graduation_year === Math.max(...alumniStudies.map((s: any) => s.graduation_year))) || null;
                // const latestStudy = alumniStudies[alumniStudies.length - 1] || null;
                
                // summary of all studies 
                // const studiesSummary = alumniStudies.map(study => ({
                //     program: study.Program?.name.forEach(( (program: any) => program.name ) ),
                //     department: study.Department?.name,
                //     graduation_year: study.graduation_year
                // }));

                
                // Join multiple studies into strings for display
                // const programs = studiesSummary.map(s => s.program).filter(Boolean).join(', ');
                // const departments = studiesSummary.map(s => s.department).filter(Boolean).join(', ');
                // const graduationYears = studiesSummary.map(s => s.graduation_year).filter(Boolean).join(', ');
                
                // TODO: Set studies info to variable to pass to the dropdown component

                return {
                    ...user,
                    current_position: roleData.current_position,
                    company: roleData.company,

                    graduation_year: latestStudy ? latestStudy.graduation_year : null,
                    program_id: latestStudy ? latestStudy.program_id : null,
                    program_name: latestStudy ? latestStudy.Program?.name : null,
                    department_name: latestStudy ? latestStudy.Department?.name : null,

                    alumni_studies: roleData.AlumniStudy,
                    // alumni_studies: alumniStudies, 
                    // // Create display-friendly fields
                    // program_names: programs,
                    // department_names: departments,
                    // graduation_years: graduationYears,
                };
            }

            return user; 
        });
    
        setCombinedUsers(combined);

        console.log('Combined Users:', combined);
    }, [users, fieldsByRole, filteredRole]);
    

    
    const getColumnsByRole = () => {
        switch (filteredRole) {
            case 'Student':
                return [
                    { field: "program_id", headerName: "Program ID", width: 150 },
                    { field: "program_name", headerName: "Program", width: 150 },
                    { field: "department_name", headerName: "Department", width: 150 },
                    { field: "intake", headerName: "Intake", width: 100 },
                    { field: "intake_year", headerName: "Intake Year", width: 120 },
                    { field: "status", headerName: "Status", width: 100 }
                ];

            case 'Prospective Student':
                return [
                    { field: "program_id", headerName: "Program ID", width: 150 },
                    { field: "program_name", headerName: "Program", width: 150 },
                    { field: "department_name", headerName: "Department", width: 150 },
                    { field: "intake", headerName: "Intake", width: 100 },
                    { field: "intake_year", headerName: "Intake Year", width: 120 },
                    { field: "status", headerName: "Status", width: 100 }
                ];

            case 'Alumni':
                return [
                    { field: "current_position", headerName: "Position", width: 150 },
                    { field: "company", headerName: "Company", width: 150 },
                    { field: "graduation_year", headerName: "Graduation Year", width: 120 },        // flattened latest 
                    { field: "program_name", headerName: "Program", width: 150 },                   // flattened latest 
                                    
                    // render dropdown component for AlumniStudy fields 
                    // { field: "graduation_year", headerName: "Graduation Year", width: 120, 
                    //   valueGetter: (params) => fieldsByRole[0]?.AlumniStudy?.[0]?.graduation_year },
                    // { field: "program_id", headerName: "Program", width: 150, 
                    //   valueGetter: (params) => fieldsByRole[0]?.AlumniStudy?.[0]?.Program?.name }, 
                ];
            case 'Admin':
                return [
                    { field: "permissions", headerName: "Permissions", width: 150 }
                ];
                
            default:
                return [];
        }
    };


    // Base columns for the table (All users)
    const baseColumns = [
        { field: "actions", headerName: "Actions", type: "actions", minWidth: 120, flex: 1, renderCell: (params) => {
            const userId = params.row.user_id;
            return (
                <div className="flex items-center justify-center w-full h-full space-x-1">
                    <Tooltip title="Delete Article" arrow>
                        <IconButton onClick={() => handleOnDelete(userId)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                    color: '#932728',                                     // Button hover color
                                    '& .MuiSvgIcon-root': {
                                color: '#932728',                                       // Icon hover color
                                    },
                                },
                                }}
                        >
                            <DeleteRoundedIcon sx={{ fontSize: 23, color: '#666666' }}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Article" arrow>
                        <IconButton onClick={() => console.log(`Edit User ${userId}`)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                  color: '#5c2876', 
                                  '& .MuiSvgIcon-root': {
                                    color: '#5c2876', 
                                  },
                                },
                              }}    
                        >
                            <EditRoundedIcon sx={{ fontSize: 23, color: '#666666' }} />   
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Article" arrow>
                        <IconButton onClick={() => handleViewUser(userId)}
                            sx={{
                                color: '#666666',
                                '&:hover': {
                                    color: '#2b64ae', 
                                    '& .MuiSvgIcon-root': {
                                    color: '#2b64ae', 
                                    },
                                },
                            }}    
                        >
                            <VisibilityIcon sx={{ fontSize: 23, color: '#666666' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }},
        { field: "imageUrl", headerName: "Photo", minWidth: 80, renderCell: (params) => {
            const imageUrl = params.row.image_url;
            return (
                <div className="flex items-center justify-center w-full h-full">
                    {imageUrl ? (
                        // <img src={imageUrl} alt="User" className="w-8 h-8 rounded-full border-saitBlack border" />
                        <Image src={imageUrl} alt="User" width={32} height={32} className="rounded-full border-saitBlack border" />
                    ) : (
                        <AccountCircleIcon className="text-gray-500 w-8 h-8" />
                    )}
                </div>
            );
        } },
        { field: "user_id", headerName: "SAIT ID", minWidth: 100 },
        { field: "first_name", headerName: "First Name", minWidth: 150 },
        { field: "last_name", headerName: "Last Name", minWidth: 150 },
        { field: "email", headerName: "Email", minWidth: 200 },
        { field: "role", headerName: "Role", minWidth: 90, renderCell: (params) => {
            const role = params.row.role;
            let className = "bg-saitBlack"; 
      
            if (role === "Admin") className = "bg-saitRed";
            else if (role === "Student") className = "bg-saitBlue";
            else if (role === "Alumni") className = "bg-saitPurple";
      
            return <span className={`${className} font-bold text-saitWhite p-1 rounded-md`}>{role}</span>;
        }},
        { field: "created_at", headerName: "Created At", minWidth: 100, renderCell: (params) => 
            new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(new Date(params.row.created_at))
        },
    ];
    
    const columns = [...baseColumns, ...getColumnsByRole()];
    // const columns = roleColumnsMap[filteredRole as UserRole] || baseColumns;


    // Filter users based on search input
    useEffect(() => {
        const filtered = combinedUsers.filter((user: any) =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, combinedUsers]);

    
    return (
        <div className="bg-saitWhite h-screen flex flex-col items-center p-4 -mt-4">
            {/* User Table */}
            <div className="w-full max-w-6xl">
                <DataGrid
                    rows={filteredUsers}
                    rowId="user_id"
                    columns={columns}
                    getRowId={(row) => row.user_id}
                    checkboxSelection
                />
            </div>

            {/* Delete Dialog */}
            <DeleteDialog
                open={openDialog}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                message="Are you sure you want to delete this user?"
            />
        </div>
    );

}