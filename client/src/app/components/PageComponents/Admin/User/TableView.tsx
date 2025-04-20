"use client";

// React & Next
import { useState, useEffect } from "react";
import Image from "next/image";
// Components
import { ViewButton, DeleteButton } from "@/app/components/Buttons/Buttons";
import { DeleteDialog } from "@/app/components/Dialogs/Dialogs";
import ActionButton from "@/app/components/Buttons/ActionButton";
import UserDeleteMultipleModal from "./Modals/UserDeleteMultipleModal";

// Hooks
import { useRouter } from "next/navigation";

// MUI Components
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip, IconButton } from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

// types
import { UserRole } from '@/app/types/userTypes';



export default function TableView({ users, filteredRole, fieldsByRole, reFetchUsers }: { users: any[]; filteredRole: UserRole; fieldsByRole: any, reFetchUsers: any }) {
    
    const [combinedUsers, setCombinedUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState<string>('');


    // Article Delete Multiple Modal
    const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);
    const handleDeleteMultipleModalClose = () => setOpenDeleteMultipleModal(false);


    // multiple row selection
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const [showMultipleSelection, setShowMultipleSelection] = useState(false);
    
    const handleRowSelectionChange = (selectionModel: any) => {
        const selectedIds = Array.isArray(selectionModel) ? selectionModel : [];
        
        setSelectedRows(selectedIds);
        setShowMultipleSelection(selectedIds.length > 0);        // sets boolean 
    
        setSelectedData(users.filter((row) => 
            selectedIds.includes(row.user_id))
        );
    };

    const handleBulkDelete = async () => {
        handleMultipleDeleteModalOpen();
    }

    const handleMultipleDeleteModalOpen = () => {
        console.log('Selected Rows:', selectedRows);
        setOpenDeleteMultipleModal(true);
    }

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

    // useEffect(() => {
    //     console.log("Filtered Users:", filteredUsers);
    // }, [filteredUsers]);

    // useEffect(() => {
    //     console.log('fields by role :', fieldsByRole);
    // })


    useEffect(() => {
        if (filteredRole === 'All' || filteredRole === '') {
            setCombinedUsers(users);
            // setFilteredUsers(users);
            return;
        }

        if (!Array.isArray(fieldsByRole)) return;

        const combined = users.map(user => {

            let roleData = fieldsByRole.find((item: any) => item.user_id === user.user_id);
            
            if (filteredRole === 'Student' && roleData || filteredRole === 'Prospective Student' && roleData) {
                return {
                    ...user,
                    program_id: roleData.program_id,
                    program_name: roleData.Program?.name,
                    department_name: roleData.Program?.Department.name,
                    intake: roleData.intake,
                    intake_year: roleData.intake_year,
                    status: roleData.status,
                    student_type: roleData.student_type,
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
                
                const graduation_year = alumniStudies.map((study: any) => study.graduation_year).join(', ');

                return {
                    ...user,
                    current_position: roleData.current_position,
                    company: roleData.company,

                    graduation_year: graduation_year,
                    program_id: latestStudy ? latestStudy.program_id : null,
                    program_name: latestStudy ? latestStudy.Program?.name : null,
                    department_name: latestStudy ? latestStudy.Department?.name : null,

                    alumni_studies: roleData.AlumniStudy,
                };
            }

            return user; 
        });
    
        setCombinedUsers(combined);

        // console.log('Combined Users:', combined);
    }, [users, fieldsByRole, filteredRole]);
    

    
    const getColumnsByRole = (): GridColDef[] => {
        switch (filteredRole) {
            case 'Student':
                return [
                    { field: "student_type", headerName: "StudentType", width: 140, renderCell: (params: GridRenderCellParams) => {
                        const studentType = params.row.student_type as string;
                        const className = studentType === 'Domestic' ? "bg-saitBlue" : "bg-saitPurple";

                        return (
                            <div className={`flex items-center justify-center ${className} w-32 rounded-2xl px-2 mt-3 h-8 border border-saitPurple`}>
                                <span className="font-normal text-saitWhite">{studentType}</span>
                            </div>
                        );
                    }},
                    { field: "program_id", headerName: "Program ID", width: 108 },
                    { field: "program_name", headerName: "Program", width: 240 },
                    { field: "department_name", headerName: "Department", width: 280 },
                    { field: "intake", headerName: "Intake", width: 100 },
                    { field: "intake_year", headerName: "Intake Year", width: 100 },
                    { field: "status", headerName: "Status", width: 100 }
                ];

            case 'Prospective Student':
                return [
                    { field: "student_type", headerName: "StudentType", width: 140, renderCell: (params: GridRenderCellParams) => {
                        const studentType = params.row.student_type as string;
                        const className = studentType === 'Domestic' ? "bg-saitLightBlue" : "bg-saitLightPurple";

                        return (
                            <div className={`flex items-center justify-center ${className} w-32 rounded-2xl px-2 mt-3 h-8 border border-saitPurple`}>
                                <span className="font-normal text-saitWhite">{studentType}</span>
                            </div>
                        );
                    }},
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
                    { field: "view", headerName: "Grad. Overview", width: 120, renderCell: (params: any) => 
                        {
                            let alumniStudies = params.row?.alumni_studies || [];
                            alumniStudies = alumniStudies.sort((a: any, b: any) => b.graduation_year - a.graduation_year);
                            
                            const latestStudy = [...alumniStudies].sort((a: any, b: any) => b.graduation_year - a.graduation_year)[0] || null;

                            const tooltipContent = (
                                <div className="p-2">
                                    <div>
                                    <p className="font-semibold">Program(s):</p>
                                    {alumniStudies.map((study: any) => (
                                        <div key={`${study.Program?.program_id}-${study.graduation_year}`}>
                                            * {study.Program?.name} ({study.graduation_year})
                                            {/* <span className="text-gray-600 ml-2">- {study.Department?.name}</span> */}
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            );

                            return (
                                <div className="flex items-center justify-between">
                                    <Tooltip title={tooltipContent} arrow>
                                        {/* <div className="flex items-center justify-center rounded-2xl mt-3 h-8 w-20 border border-saitPurple cursor-pointer hover:border-saitBlue group transition-colors duration-300"> 
                                            <span className="font-normal text-saitBlack group-hover:text-saitBlue rounded-xl transition-colors duration-300">View</span>
                                        </div> */}
                                        <IconButton
                                            sx={{
                                                color: '#666666',
                                                '&:hover': {
                                                    color: '#5c2876', 
                                                    '& .MuiSvgIcon-root': {
                                                    color: '##5c2876', 
                                                    },
                                                },
                                            }}    
                                        >
                                            <VisibilityIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )
                        } 
                    },
                    { field: "graduation_year", headerName: "Graduation Year", width: 130 },        // flattened latest 
                    { field: "program_name", headerName: "Program", width: 250 },                   // flattened latest 
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
    const baseColumns: GridColDef[] = [
        { field: "actions", headerName: "Actions", type: "actions", minWidth: 125, renderCell: (params: GridRenderCellParams) => {
            const userId = params.row.user_id;
            return (
                <div className="flex items-center justify-center w-full h-full space-x-0">
                    <Tooltip title="Remove User" arrow>
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
                    <Tooltip title="Update User" arrow>
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
                    <Tooltip title="View User" arrow>
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
        { field: "imageUrl", headerName: "Photo", minWidth: 60, renderCell: (params: GridRenderCellParams) => {
            const imageUrl = params.row.image_url;
            return (
                <div className="flex items-center justify-center w-full h-full">
                    {imageUrl ? (
                        // <img src={imageUrl} alt="User" className="w-8 h-8 rounded-full border-saitBlack border" />
                        <Image src={imageUrl} alt="User" width={32} height={32} className="rounded-full border-saitBlack border" unoptimized priority/>
                    ) : (
                        <AccountCircleIcon className="text-gray-500 w-8 h-8" />
                    )}
                </div>
            );
        } },
        { field: "user_id", headerName: "SAIT ID", minWidth: 60 },
        { field: "first_name", headerName: "First Name", minWidth: 140 },
        { field: "last_name", headerName: "Last Name", minWidth: 140 },
        { field: "role", headerName: "Role", minWidth: 120, renderCell: (params: GridRenderCellParams) => {
            const role = params.row.role;
            let className = "bg-saitBlack"; 
      
            if (role === "Admin") className = "bg-saitRed";
            else if (role === "Student") className = "bg-saitBlue";
            else if (role === "Alumni") className = "bg-saitDarkPurple";
      
            return (
                <div>
                    <div className={`flex items-center justify-center ${className} w-26 rounded-2xl px-2 mt-3 h-8 border border-saitPurple`}>
                        <span className="font-normal text-saitWhite">{role}</span>
                    </div>
                </div>
            );
        }},
        { field: "email", headerName: "Email", minWidth: 200 },
        { field: "created_at", headerName: "Created At", minWidth: 100, renderCell: (params: GridRenderCellParams) => 
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
                    getRowId={(row) => row.user_id}
                    columns={columns}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 50,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    onRowSelectionModelChange={handleRowSelectionChange}         
                />
            </div>

            {/* Delete Dialog */}
            <DeleteDialog
                open={openDialog}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                message="Are you sure you want to delete this user?"
            />

            {/* Bulk selection button */}
            {showMultipleSelection && (
                <div className="flex justify-end items-end mt-4 w-full">
                    {/* <button className={getButtonClasses(deleteButton)} onClick={handleBulkDelete}
                        >Delete Selected
                    </button> */}
                    <ActionButton title="Delete Selected" textColor="text-saitDarkRed" hoverBgColor="bg-saitDarkRed" bgColor="bg-saitWhite"
                        borderColor="border-saitDarkRed" hoverTextColor="text-saitWhite" hoverBorderColor="border-saitGray"
                        onClick={handleBulkDelete}
                        icon={<DeleteRoundedIcon/>}
                    />
                </div>
            )}

            <UserDeleteMultipleModal
                usersData={selectedData}
                userIds={selectedRows}
                openDeleteModal={openDeleteMultipleModal}
                handleDeleteModalClose={handleDeleteMultipleModalClose}
                noEditor={true}
                reFetchUsers={reFetchUsers}
            />


        </div>
    );

}