"use client";   

// React
import { useState, useEffect, useRef } from "react";

// Components
import PageHeader from "@/app/components/PageHeader/PageHeader";
import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";
import UserListView from "@/app/components/PageComponents/Admin/User/ListView";
import Loader from "@/app/components/Loader/Loader";
import TableView from "@/app/components/PageComponents/Admin/User/TableView";
import UserEditor from "@/app/components/PageComponents/Admin/User/UserEditor";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { getUsersData, getStudentsByStatus } from "@/app/api/admin/users";

// Icons 
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';

// libraries
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// types
import { UserRole } from "@/app/types/userTypes";


export default function UsersDashboard() {

    // State Management
    const [users, setUsers] = useState<any []>([]);
    const [roleToFilter, setRoleToFilter] = useState<UserRole | ''>('');
    const [roleFieldCache, setRoleFieldCache] = useState<Record<string, any>>({});
    // const previousRoleRef = useRef<UserRole>('');
    // const fetchedRolesRef = useRef<Set<UserRole>>(new Set());

    const [originalUsers, setOriginalUsers] = useState<any []>([]);
    const [usersView, setUsersView] = useState("List");
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const userEditorRef = useRef(null);
    const [fieldsByRole, setFieldsByRole] = useState([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // panel state
    const [panelTask, setPanelTask] = useState<string>("register");

    // Loader
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
       fetchUserData();
    }, []);

    // useEffect(() => {
    //     if (users.length > 0) {
    //       setIsLoading(false);
    //     }
    //   }, [users]);

        
    // Fetch data from the API
    const fetchUserData = async () => {
        try {
            const userData = await getUsersData();

            if (userData.error) {
                toast.error(userData.error || 'An error occurred fetching users. from call');
                console.log('Error fetching users: ', userData.error);
                return;
            }

            setUsers(userData);
            setOriginalUsers(userData); 
            
        } catch (error) {
            console.error(error);
            toast.error("Unknown error occurred fetching users! : " + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
        } finally {
            setIsLoading(false);
        }
    };

    
    // Search and filter functions
    const handleSearch = (searchValue: string) => {
        if (searchValue === "") {
            setUsers(originalUsers); 
            return
        } else {
            const filteredUsers = originalUsers.filter((user: any) => {
                const matchesFilter = !roleToFilter || roleToFilter === 'All' ||
                    user.role.toLowerCase().includes(roleToFilter.toLowerCase()) || 
                    (roleToFilter === 'Prospective Student' && user.role.toLowerCase().includes('student'));    

                if (!matchesFilter) return false;

                const stringFields = [
                    user.user_id,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.role,
                    user.program_id,
                    user.program_name,
                    user.department_name,
                    user.intake,
                    user.status,
                    user.current_position,
                    user.company,
                    user.student_type
                ].filter(Boolean);   // filter out any null or undefined values

                const otherFields = [
                    user.intake_year?.toString(),
                    user.graduation_year?.toString(),
                    new Date(user.created_at).toLocaleDateString()
                ].filter(Boolean); 

                const combinedFields: string[] = [...stringFields, ...otherFields];

                return combinedFields.some((field: any) => 
                    field.toLowerCase().includes(searchValue.toLowerCase()));

            });
            
            setUsers(filteredUsers);
        }
    };

    // useEffect(() => {

    // }, []);


    // Handle Users View 
    const handleUsersView = (view: string) => {
        console.log("View: ", view);
        setUsersView(view);
    }

    // Create User Panel
    const handlePanel = (action: string) => {
        setPanelTask(action);
        setIsPanelVisible(!isPanelVisible);
    };

    const handleCloseUserPanel = () => {
        setIsPanelVisible(false);
    };


    const filterByRole = async (role: any) => {
        if (role === "" || role === "All" ) {
            setUsers(originalUsers);
            setRoleToFilter(role);
            return;
        } 

        let filteredUsers; 

        if (role === "Prospective Student") {

            try {
                const prospectiveStudentData = await getStudentsByStatus({ status: 'Prospective' });

                if (prospectiveStudentData.error) {
                    toast.error(prospectiveStudentData.error || "An Error occurred fetching students by status.");
                    return;
                }

                setUsers(prospectiveStudentData);
                setRoleToFilter(role);
                return;

            } catch (error) {
                toast.error("An Error occurred fetching students by status.");
                return;
            }

        } else {  
            filteredUsers = originalUsers.filter(user => user.role.toLowerCase().includes(role.toLowerCase()));
        }

        // const filteredUsers = role === 'Prospective Student' 
        // ? originalUsers.filter(user => user.role.toLowerCase().includes('student'))
        // : originalUsers.filter(user => user.role.toLowerCase().includes(role.toLowerCase()));

        setUsers(filteredUsers);
        setRoleToFilter(role);

        if (role !== 'All' && role !== '' && role !== 'Prospective Student') {
            await fetchFieldsByRole(role);
        }

    }



    // fetch fields by role
    const fetchFieldsByRole = async (role: UserRole) => {
        if (!role || role === 'All') return;
        if (roleFieldCache[role]) {

            // console.log(">>>Using cached fields for role: ", role);
            return roleFieldCache[role];
        }
            
        const roleData = await fetchRoleData(role);
        setRoleFieldCache(prev => ({...prev, [role]: roleData }));

        return roleData;
    }

    const fetchRoleData = async (role: UserRole) => {
        try {       
            // console.log(">>>Fetching fields by role: ", role);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/roles/${role}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();
            console.log('Fetched roles data: ', data)

            if (!response.ok) {
                const errorData = data.error
                toast.error(errorData || "An Error occurred fetching fields by role.");
                return;
            }

            // update cache (client side - temporary)
            setRoleFieldCache(prev => ({
                ...prev,
                [role]: data
            }));

            setFieldsByRole(data); 

        } catch (error) {
            console.error(error);
            toast.error("Unknown error occurred fetching fields by role! : " + error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        }
    };


    useEffect(() => {
        if (roleToFilter) {
            fetchFieldsByRole(roleToFilter);
        }

        // if (roleToFilter && roleToFilter !== previousRoleRef.current) {
        //     fetchFieldsByRole(roleToFilter);
        //     previousRoleRef.current = roleToFilter;
        // }
    }, [roleToFilter]);

    return (
        <div className="bg-saitWhite h-screen">
            {isLoading ? (
                <Loader isLoading={isLoading} />
            ) : (
                <div className="w-full h-full">               
                    <PageHeader 
                        filter={
                            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 md:space-y-3 xs:space-y-3">
                                <h1 className="text-2xl font-bold">Users</h1>
                                {/* Left side container for filters */}
                                <div className="flex flex-1 items-center justify-center gap-4 px-4">
                                    <div className="flex flex-row w-[4.3rem] h-10 items-center justify-evenly bg-white border-2 rounded-lg p-1">
                                        <Tooltip title="List View" arrow>
                                            <button onClick={() => handleUsersView("List")}>
                                                <ViewModuleRoundedIcon sx={usersView === "List" ? { color: '#2b64ae', fontSize: 26 } :
                                                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}}
                                                />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Table View" arrow>
                                            <button onClick={() => handleUsersView("Table")}>
                                                <ViewListRoundedIcon sx={usersView === "Table" ? { color: '#2b64ae', fontSize: 26 } :
                                                    { color: '#bababa', fontSize: 26, ":hover": { color: '#2b64ae' }}}
                                                />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <FilterInput 
                                        title="Search"
                                        icon={<SearchOutlinedIcon className="text-saitGray" fontSize="small" />} 
                                        handleChange={handleSearch}
                                    />
                                    <FilterDropdown 
                                        title="Filter By Role"
                                        options={["All", "Admin", "Student", "Alumni", "Prospective Student"]}
                                        handleSelect={filterByRole}
                                    />
                                </div>

                                <div className="flex items-center justify-evenly gap-4 md:w-full">
                                    <Tooltip title="Import Users from Excel" arrow>
                                        <div>
                                            <ActionButton title="Import" icon={<SystemUpdateAltRoundedIcon sx={{ marginLeft: 2 , marginRight: 1.2 }}/>} iconFirst={true}
                                                onClick={() => console.log("import from excel button")} borderColor="border-saitPurple" textColor="text-saitGray" 
                                                hoverBgColor="bg-saitPurple" hoverTextColor="text-saitWhite" textSize="text-sm"
                                            />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Add User" arrow>
                                        <div>
                                            <ActionButton title="Register User" icon={<AccountCircleRoundedIcon sx={{ marginLeft: 2 , marginRight: 1.2 }}/>} 
                                                onClick={() => handlePanel("register")} borderColor="border-saitBlue" textColor="text-saitGray" 
                                                hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" textSize="text-sm"
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        }                                            
                     />

                    {/* Display Users */}
 
                    {usersView === "List" ? (
                            <UserListView users={users}/>
                        ) : (
                            <TableView 
                                users={users} 
                                filteredRole={roleToFilter} 
                                fieldsByRole={fieldsByRole}
                                reFetchUsers={fetchUserData}
                            />
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
                            className="absolute top-0 right-0 h-auto w-full rounded-lg bg-saitWhite shadow-xl p-6 z-50"
                        >
                            <div className="">
                                <UserEditor closeOnClick={handleCloseUserPanel} task={panelTask}/>
                            </div>
                        </motion.div>
                        }
                    </AnimatePresence>   
                </div>
            )}
        </div>
    );
}