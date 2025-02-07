"use client";   

// React
import { useState, useEffect } from "react";
import Link from "next/link";

// Components
import PageHeader from "@/app/components/PageHeader/PageHeader";
import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import UserItem from "@/app/components/PageComponents/UserItem";
import Loader from "@/app/components/Loader/Loader";
import TableView from "./TableView";

// Icons for filters
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

// libraries
import { toast } from "react-toastify";



export default function Users() {

    // State Management
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); 
    
    useEffect(() => {
       fetchData();
    }, []);


    // Loader
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (users.length > 0) {
          setIsLoading(false);
        }
      }, [users]);

    
    // Fetch data from the API
    const fetchData = async () => {
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
        }
    }


    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    
    return (
        <div className="bg-saitWhite h-screen">
            {isLoading ? (
                <Loader isLoading={true} />
            ) : (
                <div>               
                    <PageHeader title="Users" 
                        filter={
                            <div className="flex space-x-2">
                                <FilterInput 
                                    title="Name" 
                                    icon={<SearchOutlinedIcon className="text-saitGray" fontSize="small" />} 
                                    handleChange={searchByName}
                                />
                            </div>
                        }
                        subfilter={
                            <div className="flex space-x-2">
                                <FilterDropdown 
                                    title="Role" 
                                    options={["Admin", "Student", "Alumni", "Prospective Student"]}
                                    handleSelect={filterByRole}
                                    
                                />
                                
                        </div>
                    } />
                    <ul>
                        {currentUsers.map((user, index) => {
                            return (
                                    <UserItem 
                                        key={user.user_id}
                                        user_id={user.user_id}
                                        name={`${user.first_name} ${user.last_name}`}
                                        role={user.role}
                                        email={user.email}
                                        created_at={user.created_at}
                                    />  
                            )
                        })}
                    </ul>

                    <div className="flex justify-between items-center m-4">
                        <button 
                            onClick={handlePrevious} 
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 shadow-md rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={handleNext} 
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 shadow-md rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <TableView/>
                </div>
            )}
        </div>
        
    );
}