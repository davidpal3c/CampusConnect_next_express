"use client";

// React
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ActionButton from "@/app/components/Buttons/ActionButton";
import { getProgramsAndDepartmentsData } from "@/app/api/admin/academics";

// Libraries
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import Button from '@mui/material/Button';

// Components
import IntakePicker, {getCurrentSeason} from "./IntakePicker";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";


type CreateUserProps = { 
    closeUserEditorPanel: () => void;
    task?: string;
    reFetchUsers: () => void;
    userObject?: any;
};

const UserEditor: React.FC<CreateUserProps> = ({ closeUserEditorPanel, task, reFetchUsers, userObject }) => {
    // State Management
    const currentYear = new Date().getFullYear();

    const [intakeYear, setIntakeYear] = useState(currentYear);
    const [intake, setIntake] = useState(getCurrentSeason());
    const [status, setStatus] = useState("Active");
    const [programsOptions, setProgramsOptions] = useState<any[]>([]);

    // Roles for Select Field
    const roles = ["Admin", "Student", "Alumni"];

    // Admin Permissions
    const permissions = ["Read-Only", "Read-Write", "Full Access"];

    // loaders
    const [loadingPrograms, setLoadingPrograms] = useState(true);
    const [processingTask, setProcessingTask] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    const handleProcessingTaskOpen = () => {
        setProcessingTask(true);
        setBackdrop(true);
    }

    const handleProcessingTaskClose = () => {
        setProcessingTask(false);
        setBackdrop(false);

        reFetchUsers();
        closeUserEditorPanel();
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        watch,
        control,
        setValue 
    } = useForm({
        defaultValues: {
            user_id: "",
            email: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            role: "",
            created_at: new Date().toISOString(),
            password: "",
            image_url: "",
            permissions: "",
            program_id: "",
            department_id: "",
            intake_year: currentYear,
            intake: getCurrentSeason(),
            status: "Active",
            graduation_year: "",
            credentials: "",
            current_position: "",
            company: ""
        }
    });

    const watchedRole = watch("role");

    // SUBMIT LOGIC AND SAVE TO DB
    const submitForm = async (data: any) => {
        console.log("Entered User Data (Raw):", data);
    
        // Base user data (common fields)
        let userData: any = {
            user_id: data.user_id,
            email: data.email,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            role: data.role,
            created_at: data.created_at,
            password: data.password,
            image_url: data.image_url,
        };
    
        // Match role and add specific fields
        switch (data.role) {
            case "Admin":
                userData.permissions = data.permissions;
                break;
            case "Student":
                Object.assign(userData, {
                    program_id: data.program_id,
                    department_id: data.department_id,
                    intake_year: intakeYear,
                    intake: intake,
                    status: status,
                });
                break;
            case "Alumni":
                Object.assign(userData, {
                    graduation_year: data.graduation_year,
                    program_id: data.program_id,
                    department_id: data.department_id,
                    current_position: data.current_position,
                    company: data.company,
                });
                break;
            default:
                console.warn("Unknown role:", data.role);
        }
    
        console.log("Formatted User Data (Flat Structure):", userData);

        handleProcessingTaskOpen();

        if (task === "Create") {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(userData),
                });

                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message || "An error occurred creating the user.");
                    return;
                }

                toast.success(responseData.message);

            } catch (error) {
                console.log("Error: ", error);  
                toast.error(`Unknown error occurred: ${error}`);
                
            } finally { 
                handleProcessingTaskClose();
            }

        } else if (task === "Edit") {
            console.log('user role: ', userObject.role);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userObject.user_id}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(userData),
                });

                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message || "An error occurred updating the user.");
                    return;
                }

                toast.success(responseData.message);

            } catch (error) {
                console.log("Error: ", error);  
                toast.error(`Unknown error occurred: ${error}`);

            } finally {
                handleProcessingTaskClose();
            }

        } else {
            console.error("Invalid task type. Expected 'Create' or 'Edit'.");
        }
    };

    const handleIntakeChange = (intakeYear: number, intake: string, status: string) => {
        setIntakeYear(intakeYear);
        setIntake(intake);
        setStatus(status);
    };


    const fetchProgramsAndDepartmentsData = async () => {
        try {
            const programsAndDepartmentsData = await getProgramsAndDepartmentsData();

            if (programsAndDepartmentsData.error) {
                toast.error(programsAndDepartmentsData.error || 'An error occurred fetching users. from call');
                console.log('Error fetching users: ', programsAndDepartmentsData.error);
                return;
            }

            if (!programsAndDepartmentsData || programsAndDepartmentsData.error) {
                toast.error(programsAndDepartmentsData?.error || 'Failed to load programs data');
                return;
            }

            setProgramsOptions(programsAndDepartmentsData.map((program: any) => {
                return {
                    id: program.program_id,
                    label: program.name,
                    department_id: program.department_id,
                    department_name: program.Department.name
                };
            }));

        } catch (error) {
            console.error("Error fetching programs data:", error);
            toast.error("Failed to fetch programs data.");
        } finally {
            setLoadingPrograms(false);
        }
    }

    useEffect(() => {
        // console.log(JSON.stringify(userObject, null, 2));

        if (userObject && task === "Edit") {
            // Set basic fields
            const basicFields = {
                user_id: userObject.user_id,
                email: userObject.email,
                first_name: userObject.first_name,
                middle_name: userObject.middle_name,
                last_name: userObject.last_name,
                role: userObject.role,
                created_at: userObject.created_at,
                image_url: userObject.image_url,
            };
    
            // Set role-specific fields
            const roleSpecificFields: any = {};
            if (userObject.role === "Admin") {
                roleSpecificFields.permissions = userObject.permissions;

            } else if (userObject.role === "Student") {
                Object.assign(roleSpecificFields, {
                    program_id: userObject.program_id,
                    department_id: userObject.department_id,
                    intake_year: userObject.intake_year,
                    intake: userObject.intake,
                    status: userObject.status
                });
                setIntakeYear(userObject.intake_year);
                setIntake(userObject.intake);
                setStatus(userObject.status);

            } else if (userObject.role === "Alumni") {
                Object.assign(roleSpecificFields, {
                    program_id: userObject.program_id,
                    department_id: userObject.department_id,
                    graduation_year: userObject.graduation_year,
                    current_position: userObject.current_position,
                    company: userObject.company
                });
            }
    
            // Batch update form values
            
            setValue("role", userObject.role); // Set role first
            setTimeout(() => { // Small delay to ensure role is set
                Object.entries({ ...basicFields, ...roleSpecificFields }).forEach(([key, value]) => {
                    setValue(key as any, value as any);
                });
            }, 100);
        }

        // if (userObject && task === "Edit") {

        //     setValue("user_id", userObject.user_id);
        //     setValue("email", userObject.email);
        //     setValue("first_name", userObject.first_name);
        //     setValue("middle_name", userObject.middle_name);
        //     setValue("last_name", userObject.last_name);
        //     setValue("role", userObject.role);
        //     setValue("created_at", userObject.created_at);
        //     setValue("password", userObject.password);
        //     setValue("image_url", userObject.image_url);

        //     if (userObject.role === "Admin") {
        //         setValue("permissions", userObject.permissions);

        //     } else if (userObject.role === "Student") {
        //         setValue("program_id", userObject.program_id);
        //         setValue("department_id", userObject.department_id);
        //         setValue("intake_year", userObject.intake_year);
        //         setValue("intake", userObject.intake);
        //         setValue("status", userObject.status);

        //     } else if (userObject.role === "Alumni") {
        //         setValue("current_position", userObject.current_position);
        //         setValue("company", userObject.company);

        //         setValue("program_id", userObject.program_id);
        //         setValue("department_id", userObject.department_id);
        //         setValue("graduation_year", userObject.graduation_year);
        //     }

        // }
    }, [task, userObject, programsOptions]);

    useEffect(() => {
        if (task === "Edit" && (userObject?.role === "Student" || userObject?.role === "Alumni")) {
            fetchProgramsAndDepartmentsData();
        }
    }, []);

    useEffect(() => {
        if (programsOptions.length === 0 || !programsOptions || watchedRole === "Student" || watchedRole === "Alumni") {
            fetchProgramsAndDepartmentsData();
        }
    }, [watchedRole]);

    // useEffect(() => {
    //     console.log("Programs Options: ", programsOptions);
    // }, [programsOptions]);

    return (
        <main className="h-full w-full">
            <header className="flex justify-between items-center bg-white p-5 rounded-lg mb-6 shadow-md">
                <h1 className="font-semibold">{task === 'Create' ? 'Register User' : 'Update User'}</h1> 
                <Tooltip title="Close Editor" arrow>
                    <button onClick={closeUserEditorPanel}>
                        <CloseIcon />
                    </button>
                </Tooltip>
            </header>

            <section className="relative flex flex-col items-start bg-white p-4 rounded-lg mb-6 shadow-md">
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-wrap w-full gap-6">
                    {/* First Name */}
                    <InputField label="First Name *" id="first_name" register={register} errors={errors} required maxLength={50} pattern={{ value: /^[A-Za-z ]+$/ , message: `Invalid First Name`}} />
                    <InputField label="Middle Name" id="middle_name" register={register} errors={errors} maxLength={50} pattern={{ value: /^[A-Za-z ]+$/ , message: `Invalid First Name`}}/>
                    <InputField label="Last Name *" id="last_name" register={register} errors={errors} required maxLength={50} pattern={{ value: /^[A-Za-z ]+$/ , message: `Invalid First Name`}}/>

                    {/* Role, Email & SAIT ID */}
                    <div className="flex flex-wrap gap-6 w-full">
                        <div className="flex-1 min-w-[200px] sm:w-full md:w-1/3">
                            <label className="text-sm font-light text-saitBlack" htmlFor="role">Role *</label>
                            <select 
                                className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
                                id="role" 
                                {...register("role", { required: 'Role is required' })}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{String(errors.role.message)}</p>}
                        </div>

                        <InputField label="Email Address *" id="email" register={register} inputType="email" errors={errors} required maxLength={100} />
                        <InputField label="SAIT ID *" id="user_id" register={register} errors={errors} required maxLength={9} minLength={9} pattern={{ value: /^[0-9]*$/ , message: `Enter a valid 9 digit user ID`}} />

                    </div>

                    {/* Role-Specific Fields */}
                    {watchedRole === "Admin" && (
                        <div className="flex-1 min-w-[200px] sm:w-full md:w-1/3">
                            <label className="text-sm font-light text-saitBlack" htmlFor="permissions">Permissions *</label>
                            <select 
                                className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
                                id="permissions" 
                                {...register("permissions", { required: 'Permissions is required' })}
                                defaultValue={userObject?.permissions || ""}
                            >
                                <option value="">Select Permissions</option>
                                {permissions.map((permission, index) => (
                                    <option key={index} value={permission}>
                                        {permission}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{String(errors.role.message)}</p>}
                        </div>
                    )}

                    {watchedRole === "Student" && (
                        <div className="flex flex-wrap gap-6 w-full">
                            <div className="flex-1 w-full mb-6">  
                                <label className="text-sm font-light text-saitBlack">
                                    Select Program *
                                </label>
                                <div>
                                    {loadingPrograms && (
                                        <div className="flex justify-center items-center">
                                            <CircularProgress size={24} />
                                        </div>
                                    )}
                                </div>     
                                {programsOptions.length > 0 && (
                                    <Controller
                                        name="program_id"
                                        control={control}                                           // Add control to your useForm() destructuring
                                        rules={{ required: 'Program selection is required' }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="program-search"
                                                options={programsOptions}
                                                getOptionLabel={(option) => 
                                                    option && option.label && option.id && option.department_name
                                                        ? `${option.label} - ${option.id}, Dept: ${option.department_name}`
                                                        : ''
                                                }
                                                isOptionEqualToValue={(option, value) =>                
                                                    option?.id === value?.id || option?.id === value
                                                }
                                                sx={{ 
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                    borderRadius: '5px',                                        // Custom border radius
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3f51b5',                             // Hover border color
                                                        },
                                                    height: '42px',
                                                    marginTop: '3px',                                     
                                                    },
                                                    '& + .MuiAutocomplete-popper': {
                                                        minWidth: '100% !important',
                                                        width: 'auto !important',
                                                        '& .MuiAutocomplete-option': {
                                                            '&:hover': {
                                                            backgroundColor: 'rgba(63, 81, 181, 0.08)',         // Custom hover color
                                                            },
                                                            '&[aria-selected="true"]': {
                                                            backgroundColor: 'rgba(63, 81, 181, 0.12)',         // Selected option color
                                                            },
                                                        },
                                                    },
                                                }}
                                                onChange={(_, data) => {
                                                    field.onChange(data?.id);

                                                    if (data) {
                                                        setValue('department_id', data.department_id);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        {...params} 
                                                        placeholder="Type to search programs..."
                                                        error={!!errors.program_id}
                                                        helperText={errors.program_id?.message}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            sx: {
                                                            borderRadius: '8px',                                                  // to match the outer border radius
                                                            },
                                                        }}
                                                    />
                                                )}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.id}>
                                                        <div style={{ width: '100%' }}>
                                                            <div><strong>{option.label}</strong></div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                                                <span>ID: {option.id}</span>
                                                                <span>Department: {option.department_name}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                                filterOptions={(options, state) => {
                                                    const searchTerm = state.inputValue.toLowerCase();
                                                    return options.filter(option =>
                                                        option.label.toLowerCase().includes(searchTerm) ||
                                                        option.id.toLowerCase().includes(searchTerm) ||
                                                        option.department_name.toLowerCase().includes(searchTerm) || 
                                                        option.department_id.toLowerCase().includes(searchTerm) 
                                                    );
                                                }}
                                                value={
                                                    programsOptions.find(option => option.id === field.value) || 
                                                    (userObject?.program_id && programsOptions.length > 0 ? { 
                                                        id: userObject.program_id, 
                                                        label: programsOptions.find(p => p.id === userObject.program_id)?.label || userObject.program_id,
                                                        department_id: userObject.department_id,
                                                        department_name: programsOptions.find(p => p.id === userObject.program_id)?.department_name || userObject.department_id
                                                    } : null)
                                                }
                                                // value={
                                                //     programsOptions.find(option => option.id === field.value) || 
                                                //     (userObject?.program_id ? { 
                                                //         id: userObject.program_id, 
                                                //         label: userObject.program_id, 
                                                //         department_id: userObject.department_id,
                                                //         department_name: userObject.department_id
                                                //     } : null)
                                                // }
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        
                            <div className="flex flex-col sm:flex-row gap-4">
                                <IntakePicker onIntakeChange={handleIntakeChange}/>         
                            </div>
                        </div>
                    )}

                    {watchedRole === "Alumni" && (
                        <div className="flex flex-wrap gap-6 w-full">
                            <div className="flex-1 w-full">  
                                <label className="text-sm font-light text-saitBlack">
                                    Select Program *
                                </label>
                                <div>
                                    {loadingPrograms && (
                                        <div className="flex justify-center items-center">
                                            <CircularProgress size={24} />
                                        </div>
                                    )}
                                </div>     
                                {programsOptions.length > 0 && (
                                    <Controller
                                        name="program_id"
                                        control={control}                                           // Add control to your useForm() destructuring
                                        rules={{ required: 'Program selection is required' }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="program-search"
                                                loading={loadingPrograms}
                                                loadingText="Loading..."
                                                options={programsOptions}
                                                getOptionLabel={(option) => 
                                                    option && option.label && option.id && option.department_name
                                                        ? `${option.label} - ${option.id}, Dept: ${option.department_name}`
                                                        : ''
                                                }
                                                isOptionEqualToValue={(option, value) =>                
                                                    option?.id === value?.id || option?.id === value
                                                }
                                                sx={{ 
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-root': {
                                                    borderRadius: '5px',                                        // Custom border radius
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3f51b5',                             // Hover border color
                                                        },
                                                    height: '42px',
                                                    marginTop: '3px',                                     
                                                    },
                                                    '& + .MuiAutocomplete-popper': {
                                                        minWidth: '100% !important',
                                                        width: 'auto !important',
                                                        '& .MuiAutocomplete-option': {
                                                            '&:hover': {
                                                            backgroundColor: 'rgba(63, 81, 181, 0.08)',         // Custom hover color
                                                            },
                                                            '&[aria-selected="true"]': {
                                                            backgroundColor: 'rgba(63, 81, 181, 0.12)',         // Selected option color
                                                            },
                                                        },
                                                    },
                                                }}
                                                onChange={(_, data) => {
                                                    field.onChange(data?.id);

                                                    if (data) {
                                                        setValue('department_id', data.department_id);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        {...params} 
                                                        placeholder="Type to search programs..."
                                                        error={!!errors.program_id}
                                                        helperText={errors.program_id?.message}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            sx: {
                                                            borderRadius: '8px',                                                  // to match the outer border radius
                                                            },
                                                        }}
                                                    />
                                                )}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.id}>
                                                        <div style={{ width: '100%' }}>
                                                            <div><strong>{option.label}</strong></div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                                                <span>ID: {option.id}</span>
                                                                <span>Department: {option.department_name}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                                filterOptions={(options, state) => {
                                                    const searchTerm = state.inputValue.toLowerCase();
                                                    return options.filter(option =>
                                                        option.label.toLowerCase().includes(searchTerm) ||
                                                        option.id.toLowerCase().includes(searchTerm) ||
                                                        option.department_name.toLowerCase().includes(searchTerm) || 
                                                        option.department_id.toLowerCase().includes(searchTerm) 
                                                    );
                                                }}
                                                value={
                                                    programsOptions.find(option => option.id === field.value) || 
                                                    (userObject?.program_id && programsOptions.length > 0 ? { 
                                                        id: userObject.program_id, 
                                                        label: programsOptions.find(p => p.id === userObject.program_id)?.label || userObject.program_id,
                                                        department_id: userObject.department_id,
                                                        department_name: programsOptions.find(p => p.id === userObject.program_id)?.department_name || userObject.department_id
                                                    } : null)
                                                }
                                                // value={programsOptions.find(option => option.id === field.value) || null ||
                                                //     (userObject?.program_id && {                    // Fallback to userObject if available
                                                //         id: userObject.program_id, 
                                                //         label: userObject.program_name, 
                                                //         department_id: userObject.department_id,
                                                //         department_name: userObject.department_name
                                                //     })
                                                // }
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <InputField label="Graduation Year *" id="graduation_year" register={register} errors={errors} required 
                                    maxLength={4} minLength={4}  pattern={{ value: /^(19[7-9][1-9]|20[0-9][0-9])$/, message: `Year must be between 1971 and ${currentYear}`}}/>        
                                <InputField label="Current Position" id="current_position" register={register} errors={errors}
                                    pattern={{ value:/^[A-Za-z ]+$/ , message: `Invalid Position. Only letters and spaces are allowed`}} maxLength={80} minLength={3} 
                                />    
                                <InputField label="Company" id="company" register={register} errors={errors}
                                    pattern={{ value:/^[A-Za-z ]+$/ , message: `Invalid Position. Only letters and spaces are allowed`}} maxLength={100} minLength={3}
                                />             
                            </div>
                        </div>
                    )}

                    <div className="flex flex-row items-center justify-between w-full space-x-5">
                        {/* <div className="flex flex-row items-center justify-between w-1/3 space-x-5"> */}
                        {task === 'Edit' && (
                            <div>
                                <ActionButton title="Delete" onClick={() => closeUserEditorPanel()} icon={<DeleteRoundedIcon sx={{ fontSize: 20, marginRight: 1 }}/>} iconFirst={true}    
                                    textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>  
                            </div>
                        )}
                        <div className="flex flex-row space-x-4">
                            <ActionButton title="Cancel" onClick={() => closeUserEditorPanel()}
                                textColor="text-saitDarkRed" borderColor="border-saitDarkRed" hoverBgColor="bg-saitDarkRed" hoverTextColor="text-saitWhite"/>  
                                                <Tooltip title={task === 'Create' ? 'Create User' : 'Update User'} arrow>
                            <div>
                                <ActionButton title="Submit" onClick={handleSubmit((data: any) => submitForm(data))}    
                                    textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite" />
                            </div>
                        </Tooltip>
                        </div>
                    </div>
                </form>
            </section>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>  
        </main>
    );
};

export default UserEditor;


// INPUT COMPONENT
const InputField = ({ label, id, inputType = "text", register, errors, required = false, maxLength = 255, pattern = null, minLength = null }: any) => (
    <div className="flex-1 min-w-[200px] sm:w-full md:w-1/3">
        <label className="text-sm font-light text-saitBlack" htmlFor={id}>{label}</label>
        <input
            className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
            type={inputType}
            id={id}
            {...register(id, { 
                required: required ? `${label} is required` : false, 
                maxLength: { value: maxLength, message: `${label} should not exceed ${maxLength} characters` },
                pattern: pattern ? { value: pattern.value, message: pattern.message } : undefined
            })}
            maxLength={maxLength}
            onInput={(e: any) => {
                if (e.target.value.length > maxLength) {
                  e.target.value = e.target.value.slice(0, maxLength); 
                }
            }}
            minLength={minLength !== null ? minLength : undefined}
        />
        {errors[id] && <p className="text-red-500 text-sm">{errors[id].message}</p>}
    </div>
);
