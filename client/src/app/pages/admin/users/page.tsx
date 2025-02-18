"use client";   

// React
import { useState, useEffect, useRef } from "react";

// Components
import PageHeader from "@/app/components/PageHeader/PageHeader";
import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import UserListView from "@/app/components/PageComponents/Admin/User/ListView";
import Loader from "@/app/components/Loader/Loader";
import TableView from "../../../components/PageComponents/Admin/User/TableView";
import UserEditor from "@/app/components/PageComponents/Admin/User/UserEditor";

// Icons 
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TableChartIcon from '@mui/icons-material/TableChart';
import AddIcon from '@mui/icons-material/Add';

// libraries
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';


export default function Users() {

    // State Management
    const [users, setUsers] = useState([]);
    const [roleToFilter, setRoleToFilter] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);
    const [usersView, setUsersView] = useState("List");
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const userEditorRef = useRef(null);
    
    useEffect(() => {
       fetchUserData();
    }, []);


    // Loader
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (users.length > 0) {
          setIsLoading(false);
        }
      }, [users]);

    
    // Fetch data from the API
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) {
                const errorData = data;
                toast.error(errorData.message || "An Error occurred fetching users.");
                return;
            }

            setUsers(data);
            setOriginalUsers(data); 
        } catch (error) {
            console.error(error);
            toast.error("Unknown error occurred fetching users! : " + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }
    };
    

    // Search and filter functions
    const searchByName = (searchValue: string) => {
        if (searchValue === "") {
            setUsers(originalUsers); 
        } else {
            const filteredUsers = originalUsers.filter((user) => {
                const name = `${user.first_name} ${user.last_name}`;
                return (
                    user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    name.toLowerCase().includes(searchValue.toLowerCase())
                );
            });
            
            setUsers(filteredUsers);
            
        }
    };

    const filterByRole = (role: string) => {
        if (role === "") {
            setUsers(originalUsers);
        } else {
            const filteredUsers = originalUsers.filter((user) =>
                user.role.toLowerCase().includes(role.toLowerCase())
            );
            setUsers(filteredUsers);
            setRoleToFilter(role);
        }
    }


    // Handle Users View 
    const handleUsersView = (view: string) => {
        setUsersView(view);

    }

    // Create User Panel
    const handlePanel = () => {
        setIsPanelVisible(!isPanelVisible);
    };
    
    return (
        <div className="bg-saitWhite h-screen">
            {isLoading ? (
                <Loader isLoading={true} />
            ) : (
                <div>               
                    <PageHeader title="Users" 
                        filter={
                            <div className="grid grid-cols-[1fr_auto] lg:grid-cols-2 w-full gap-4">
                                {/* Left side container for filters */}
                                <div className="flex items-center space-x-2">
                                    <FilterInput 
                                        title="Name" 
                                        icon={<SearchOutlinedIcon className="text-saitGray" fontSize="small" />} 
                                        handleChange={searchByName}
                                    />
                                    <FilterDropdown 
                                        title="Role" 
                                        options={["Admin", "Student", "Alumni", "Prospective Student"]}
                                        handleSelect={filterByRole}
                                    />
                                    <div className="flex flex-row w-20 items-center justify-evenly bg-white border-2 rounded-lg p-1">
                                    <Tooltip title="List View">
                                            <button onClick={() => handleUsersView("List")}>
                                                <FormatListBulletedIcon sx={usersView === "List" ? { color: '#2b64ae', fontSize: 26 } :
                                                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}}
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Table View">
                                            <button onClick={() => handleUsersView("Table")}>
                                                <TableChartIcon sx={usersView === "Table" ? { color: '#2b64ae', fontSize: 26 } :
                                                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}}
                                                />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                        
                                {/* Right side container for the Add button */}
                                <div title="Add New User" className="flex justify-end items-end">
                                    <button onClick={handlePanel} className="bg-white border-2 border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 hover:border-green-500">
                                        <AddIcon className="text-green-500 w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        }                                          
                                     
                     />

                    {/* Display Users */}
 
                    {usersView === "List" ? (
                            <UserListView users={users}/>
                        ) : (
                            <TableView users={users} filteredRole={roleToFilter}/>
                        )}

                    {/* Create New User */}

                    <AnimatePresence>
                        {isPanelVisible &&
                        <motion.div
                            ref={userEditorRef}
                            initial={{ x: "100vh" }}
                            animate={{ x: 0 }}                                                        //final state of animation
                            exit={{ x: "100vh" }}                                                      // exit animation
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute top-0 right-0 h-full w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
                        >
                            <div className="">
                                <UserEditor closeOnClick={handlePanel}/>
                            </div>
                        </motion.div>
                        }
                    </AnimatePresence>
                    
                </div>
            )}
        </div>
        
    );
}