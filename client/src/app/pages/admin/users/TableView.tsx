"use client";

// React & Next
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import Loader from "@/app/components/Loader/Loader";
import { ViewButton, DeleteButton } from "@/app/components/Buttons/Buttons";
import { DeleteDialog } from "@/app/components/Dialogs/Dialogs";

// MUI Components
import { DataGrid } from "@mui/x-data-grid";
import { TextField, InputAdornment } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Icons
import SearchIcon from "@mui/icons-material/Search";

export default function TableView() {
    // State Management
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userId, setUserId] = useState(null);

    // Fetch user data from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const userData = await response.json();
            setUsers(userData);
            setFilteredUsers(userData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setIsLoading(false);
        }
    };

    // Delete function for users
    const deleteUser = async (userId) => {
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
            fetchUsers(); // Refresh user list
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

    // Define table columns
    const columns = [
        { field: "imageUrl", headerName: "Photo", width: 80, renderCell: (params) => {
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
        { field: "first_name", headerName: "First Name", width: 150 },
        { field: "last_name", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 130, renderCell: (params) => {
            const role = params.row.role;
            let className = "bg-saitBlack"; 
      
            if (role === "Admin") className = "bg-saitRed";
            else if (role === "Student") className = "bg-saitBlue";
            else if (role === "Alumni") className = "bg-saitPurple";
      
            return <span className={`${className} font-bold text-saitWhite p-1 rounded-md`}>{role}</span>;
        }},
        { field: "created_at", headerName: "Created At", width: 180, renderCell: (params) => new Date(params.row.created_at).toLocaleString() },
        { field: "actions", headerName: "Actions", type: "actions", minWidth: 120, flex: 1, renderCell: (params) => {
            const userId = params.row.user_id;
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <ViewButton href={`/admin/users/${userId}`} />
                    <DeleteButton onClick={() => handleOnDelete(userId)} />
                </div>
            );
        }}
    ];

    if (isLoading) return <Loader isLoading={true} />;

    return (
        <div className="bg-saitWhite h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold text-saitBlack mb-4">User List</h1>

            {/* Search Bar */}
            <TextField
                variant="outlined"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-96"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

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