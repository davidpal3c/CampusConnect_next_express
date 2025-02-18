"use client";

// React & Next
import { useState, useEffect } from "react";

// Components
import { ViewButton, DeleteButton } from "@/app/components/Buttons/Buttons";
import { DeleteDialog } from "@/app/components/Dialogs/Dialogs";

// MUI Components
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export default function TableView({ users, filteredRole }) {
    // State Management
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState(null);


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

    // Filter users based on search input
    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleOnDelete = (selectedUserId) => {
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

    // TABLE COLUMNS

    // Base columns for the table (All users)
    const baseColumns = [
        { field: "actions", headerName: "Actions", type: "actions", minWidth: 120, flex: 1, renderCell: (params) => {
            const userId = params.row.user_id;
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <ViewButton href={`/admin/users/${userId}`} />
                    <DeleteButton onClick={() => handleOnDelete(userId)} />
                </div>
            );
        }},
        { field: "imageUrl", headerName: "Photo", minWidth: 80, renderCell: (params) => {
            const imageUrl = params.row.imageUrl;
            return (
                <div className="flex items-center justify-center w-full h-full">
                    {imageUrl ? (
                        <img src={imageUrl} alt="User" className="w-8 h-8 rounded-full border-saitBlack border" />
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

    const roleColumnsMap = {
        // Admin columns for the table
        "Admin": [
            ...baseColumns,
            { field: "permissions", headerName: "Permissions", width: 150 },
        ],

        // Student columns for the table
        "Student": [
            ...baseColumns,
            { field: "program_id", headerName: "Program", width: 150 },
            { field: "department_id", headerName: "Department", width: 150 },
            { field: "intake_year", headerName: "Intake Year", width: 120 },
            { field: "status", headerName: "Status", width: 100 },
        ],

        // Alumni columns for the table
        "Alumni": [
            ...baseColumns,
            { field: "graduation_year", headerName: "Graduation Year", width: 120 },
            { field: "credentials", headerName: "Credentials", width: 150 },
            { field: "current_position", headerName: "Position", width: 150 },
            { field: "company", headerName: "Company", width: 150 },
        ],

    };

    type UserRole = "Admin" | "Student" | "Alumni";

    const columns = roleColumnsMap[filteredRole as UserRole] || baseColumns;

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