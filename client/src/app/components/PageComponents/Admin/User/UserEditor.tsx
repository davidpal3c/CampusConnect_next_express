"use client";

// React
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ActionButton from "@/app/components/Buttons/ActionButton";

// Libraries
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import Button from '@mui/material/Button';

// Components
import IntakePicker, {getCurrentSeason} from "./IntakePicker";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


type CreateUserProps = { 
    closeOnClick: () => void;
    // task?: string;
};

const UserEditor: React.FC<CreateUserProps> = ({ closeOnClick }) => {
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

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        watch,
        control 
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
                    intake_year: intakeYear,
                    intake: intake,
                    status: status,
                });
                break;
            case "Alumni":
                Object.assign(userData, {
                    graduation_year: data.graduation_year,
                    credentials: data.credentials,
                    current_position: data.current_position,
                    company: data.company,
                });
                break;
            default:
                console.warn("Unknown role:", data.role);
        }
    
        console.log("Formatted User Data (Flat Structure):", userData);

        // try {

        //     // // If User is a Student, Check if program_id is valid, save department_id
        //     // if (data.role === "Student") {
        //     //     const programResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/programs/${data.program_id}`, {
        //     //         method: "GET",
        //     //         headers: { "content-type": "application/json" },
        //     //         credentials: "include",
        //     //     });
        //     //     if (!programResponse.ok) {
        //     //         toast.error("Invalid Program ID. Please enter a valid program.");
        //     //         console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/programs/${data.program_id}`);
        //     //         return;
        //     //     }
        //     //     console.log("Program ID is valid.");
        //     //     const programData = await programResponse.json();

        //     //     Object.assign(userData, {
        //     //         department_id: programData.department_id,
        //     //     });

        //     // }

        //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
        //         method: "POST",
        //         headers: { "content-type": "application/json" },
        //         credentials: "include",
        //         body: JSON.stringify(userData),
        //     });

        //     const responseData = await response.json();
        //     if (!response.ok) {
        //         toast.error(responseData.message || "An error occurred creating the user.");
        //         return;
        //     }

        //     toast.success(responseData.message);
        //     closeOnClick();
        // } catch (error) {
        //     console.log("Error: ", error);  
        //     toast.error(`Unknown error occurred: ${error}`);
        // }
    };

    const handleIntakeChange = (intakeYear: number, intake: string, status: string) => {
        setIntakeYear(intakeYear);
        setIntake(intake);
        setStatus(status);
    };


    const fetchProgramsData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/academic/options`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Failed to fetch programs data");
            }
            const programsData = await response.json();
            console.log("Study register Data: ", programsData);

            setProgramsOptions(programsData.map((program: any) => {
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
        }
    }

    useEffect(() => {
        if (watchedRole === "Student" || programsOptions.length > 0 || !programsOptions) {
            fetchProgramsData();
        }
    }, [watchedRole]);

    useEffect(() => {
        console.log("Programs Options: ", programsOptions);
    }
    , [programsOptions]);

    return (
        <main className="h-full w-full">
            <header className="flex justify-between items-center bg-white p-5 rounded-lg mb-6 shadow-md">
                <h1 className="font-semibold">Create User</h1> 
                <Tooltip title="Close Editor" arrow>
                    <button onClick={closeOnClick}>
                        <CloseIcon />
                    </button>
                </Tooltip>
            </header>

            <section className="relative flex flex-col items-start bg-white p-4 rounded-lg mb-6 shadow-md">
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-wrap w-full gap-6">
                    {/* First Name */}
                    <InputField label="First Name *" id="first_name" register={register} errors={errors} required maxLength={50} pattern={/^[A-Za-z ]+$/} />
                    <InputField label="Middle Name" id="middle_name" register={register} errors={errors} maxLength={50} pattern={/^[A-Za-z ]+$/}/>
                    <InputField label="Last Name *" id="last_name" register={register} errors={errors} required maxLength={50} pattern={/^[A-Za-z ]+$/}/>

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
                        <InputField label="SAIT ID *" id="user_id" register={register} errors={errors} required maxLength={9} minLength={9} pattern={/^[0-9]*$/} />

                    </div>

                    {/* Role-Specific Fields */}
                    {watchedRole === "Admin" && (
                        <div className="flex-1 min-w-[200px] sm:w-full md:w-1/3">
                            <label className="text-sm font-light text-saitBlack" htmlFor="permissions">Permissions *</label>
                            <select 
                                className="font-light w-full p-2 mb-3 border border-gray-300 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
                                id="permissions" 
                                {...register("permissions", { required: 'Permissions is required' })}
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
                        <div>
                            <div className="flex-1 w-full mb-6">  
                                <label className="text-sm font-light text-saitBlack">
                                    Select Program *
                                </label>     
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
                                                onChange={(_, data) => field.onChange(data?.id)}
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
                                                value={programsOptions.find(option => option.id === field.value) || null}
                                            />
                                        )}
                                    />
                                )}
                                {errors.program_id && <p className="text-red-500 text-sm">{String(errors.program_id.message)}</p>}
                            </div>
                        
                            <div className="flex flex-col sm:flex-row gap-4">
                                <IntakePicker onIntakeChange={handleIntakeChange}/>         
                            </div>
                        </div>
                    )}

                    {watchedRole === "Alumni" && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            <InputField label="Graduation Year *" id="graduation_year" register={register} errors={errors} required />        
                            <InputField label="Credentials *" id="credentials" register={register} errors={errors} required />       
                            <InputField label="Current Position" id="current_position" register={register} errors={errors}/>    
                            <InputField label="Company" id="company" register={register} errors={errors}/>             
 
                        </div>
                    )}


                    <Button className="block w-full" variant="contained" color="success" type="submit">
                        Submit
                    </Button>
                </form>
            </section>
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
                pattern: pattern ? { value: pattern, message: `Invalid ${label}` } : undefined
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
