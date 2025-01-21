"use client";   

// React
import { useState, useEffect } from "react";
import Link from "next/link";

// Components
import PageHeader from "@/app/components/PageHeader/PageHeader";
import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import UserItem from "@/app/components/page components/UserItem";

// Icons for filters
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

export default function Users() {

    // State Management
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`);
            const data = await response.json();
            setUsers(data);
            setOriginalUsers(data); 
        } catch (error) {
            console.error(error);
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
    

    return (
        <div className="bg-saitWhite h-screen">
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
                    {users.map((user, index) => {
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
        </div>
        
    );
}