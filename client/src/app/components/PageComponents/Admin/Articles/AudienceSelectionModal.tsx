"use client";
import React, { useEffect, useState } from 'react';

import ActionButton from '@/app/components/Buttons/ActionButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BeenhereRoundedIcon from '@mui/icons-material/BeenhereRounded';
import ScrollableList from '@/app/components/PageComponents/Admin/Articles/ScrollableList';
import ScrollableListForObjects, { Item } from '@/app/components/PageComponents/Admin/Articles/ScrollableListForObjects';

import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from "@mui/material";
import { Tooltip } from '@mui/material';



type AudienceSelectionModalProps = {
    openAudienceSelectionModal: any,
    setOpenAudienceSelectionModal: any,
    saveAudienceCriteria: any,  
    currentAudienceCriteria?: any,
    setShowAccordion: any,  
};

export default function AudienceSelectionModal({ 
    openAudienceSelectionModal, setOpenAudienceSelectionModal, 
    saveAudienceCriteria, currentAudienceCriteria, setShowAccordion }: AudienceSelectionModalProps) {

    const [isSaved, setIsSaved] = useState(false);

    const [selectedPrograms, setSelectedPrograms] = useState<Item[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<Item[]>([]);
    const [selectedIntakeSeasons, setSelectedIntakeSeasons] = useState<string[]>([]);
    const [selectedIntakeYears, setSelectedIntakeYears] = useState<string[]>([]);       // convert fetched numbers to string (to match the 'All' option)
    
    const [isLoading, setIsLoading] = useState(false);
    const [availableAudience, setAvailableAudience] = useState<any>({});

    const [programsData, setProgramsData] = useState<Item[]>([]);
    const [departmentsData, setDepartmentsData] = useState<Item[]>([]);
    const [intakeSeasons, setIntakeSeasons] = useState<string[]>([]);
    const [intakeYears, setIntakeYears] = useState<string[]>([]);
    // const { programs = [], departments = [], intakeSeasons = [], intakeYears = [] } = availableAudience;


    const fetchAvailableAudience = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audience/`, {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                },
                credentials: "include",   
            });

            const audienceData = await response.json();

            if(!response.ok) {
                const errorData = audienceData;
                toast.error(errorData.message || "An Error occurred fetching audience.");
                return;
            }

            setAvailableAudience(audienceData);
            
            setProgramsData(audienceData.data.programs);
            setDepartmentsData(audienceData.data.departments);
            setIntakeSeasons(audienceData.data.intakeSeasons);
            setIntakeYears(audienceData.data.intakeYears);

            console.log(audienceData.message);
        } catch (error: any) {
            console.error("Error fetching Audience Selection: ", error);
            toast.error("Error fetching Audience Selection", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAudienceSelectionClose = () => {
        if (!isSaved) {
            saveAudienceCriteria({});
            setOpenAudienceSelectionModal(false);
        } 
        setOpenAudienceSelectionModal(false)
    };

    const handleSave = async () => {
        const audienceCriteria = {
          programs: selectedPrograms,
          departments: selectedDepartments,
          intakeSeasons: selectedIntakeSeasons.includes('All') ? ['All'] : selectedIntakeSeasons,
          intakeYear: selectedIntakeYears.includes('All') ? ['All'] : selectedIntakeYears,
        };

        saveAudienceCriteria({...audienceCriteria});              //ensure reactivity: pass a new object reference to trigger re-render
        
        setIsSaved(true);
        handleAudienceSelectionClose();
        setShowAccordion(true);
    };

    // Handle selection for Programs
    const handleProgramSelection = (programs: Item[]) => {
        setSelectedPrograms(programs); 
    };
  
  // Handle selection for Departments
    const handleDepartmentSelection = (departments: Item[]) => {
        setSelectedDepartments(departments); 
    };

    // Handle selection for Intake Season
    const handleIntakeSeasonSelection = (seasons: string[]) => {
        setSelectedIntakeSeasons(seasons);
    };

    // Handle selection for Intake Year
    const handleIntakeYearSelection = (years: string[]) => {
        setSelectedIntakeYears(years);
    };

    useEffect(() => {
        fetchAvailableAudience();
    }, []);

    useEffect(() => {
        console.log("Current Audience Criteria (modal): ", currentAudienceCriteria);
    }, [currentAudienceCriteria]);




    return (
        <div>
            <Modal
                open={openAudienceSelectionModal}
                onClose={handleAudienceSelectionClose}
                aria-labelledby="audience-selection-modal"
                aria-describedby="audience-selection-modal-description"
                BackdropProps={{
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
                }}
            >
                <Box sx={modalStyle}>
                    <div className="flex flex-col items-center justify-center w-auto">
                        <div className="flex flex-row items-center justify-between p-4 mt-1 w-full">
                            <div></div>
                            <div>
                                <h1 className="text-xl font-bold">Select Audience</h1>
                            </div>
                            <div className="">
                                <Tooltip title="Close">
                                    <IconButton onClick={handleAudienceSelectionClose}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>

                        <div className="w-full">
                            {isLoading ? (
                                <p>Loading Audience...</p>
                            ) : programsData?.length > 0 || departmentsData?.length > 0 || intakeSeasons?.length > 0 || intakeYears?.length > 0 ? (
                                <div className='flex flex-row items-center justify-center px-6 my-2 w-full gap-4'>
                                    
                                    {/* Departments List */}
                                    <div className="flex-1">
                                        <label className="block text-md font-semibold mb-2">Departments</label>
                                        <ScrollableListForObjects
                                            items={departmentsData?.map((d) => ({ department_id: d.department_id, name: d.name })) || []}
                                            selectedItems={selectedDepartments}
                                            onSelect={handleDepartmentSelection}
                                            idObjKey="department_id"
                                        />
                                    </div>
                                    
                                    {/* Programs List */}
                                    <div className="flex-1">
                                        <label className="block text-md font-semibold mb-2">Programs</label>
                                        <ScrollableListForObjects
                                            items={programsData?.map((p) => ({ program_id: p.program_id, name: p.name })) || []}
                                            selectedItems={selectedPrograms}
                                            onSelect={handleProgramSelection}
                                            idObjKey="program_id"
                                        />
                                    </div>

                                    {/* Intake Season List */}
                                    <div className="w-1/6">
                                        <label className="block text-md font-semibold mb-2">Intake Season</label>
                                        <ScrollableList
                                            items={intakeSeasons?.map((season) => season) || []}
                                            selectedItems={selectedIntakeSeasons}
                                            onSelect={handleIntakeSeasonSelection}
                                            includeAllOption={true}
                                        />
                                    </div>

                                    {/* Intake Year List */}
                                    <div className="w-1/6">
                                        <label className="block text-md font-semibold mb-2">Intake Season</label>
                                        <ScrollableList
                                            items={intakeYears?.map((y) => y.toString()) || []}
                                            selectedItems={selectedIntakeYears}
                                            onSelect={handleIntakeYearSelection}
                                            includeAllOption={true}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p>No Audience Data Available</p>
                            )}
                        </div>

                        <div className="my-5">
                            <ActionButton onClick={handleSave} type="button" title="Save Selection" icon={<BeenhereRoundedIcon sx={{ fontSize: 20 }} />}
                                bgColor="bg-saitWhite" textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
                            />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        'xs': 550,
        'sm': 750,
        'md': 820,
        'lg': 950,
        'xl': 1300,
    },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
    // backgroundColor: "#ffffff",
};


const customButton = "group text-saitDarkRed border border-saitDarkRed bg-saitWhite font-normal h-9 flex flex-row items-center justify-center h-9 py-2 px-4 rounded-full hover:bg-saitDarkRed hover:text-white hover:shadow-2xl active:scale-75 transition delay-150 transition-colors transition-transform duration-300 ease-in-out";



// {
//     "programs": [
//         {"name": "Software Development", "program_id": "SADT-009"},
//         {"name": "Business Administration Diploma", "program_id": "SADT-012"}
//     ],
//     "intakeYear": ["2023", "2024", "2025"],
//     "departments": [
//         {"name": "School of Advanced Digital Technology", "department_id": "SADT630"}, 
//         {"name": "School of Business", "department_id": "SADT420"}
//     ], 
//     "intakeSeasons": ["Fall", "Winter", "Summer"]
// }


    // return (
    //     <div>
    //         <Modal
    //             open={openAudienceSelectionModal}
    //             onClose={handleAudienceSelectionClose}
    //             aria-labelledby="audience-selection-modal"
    //             aria-describedby="audience-selection-modal-description"
    //             BackdropProps={{
    //                 sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
    //             }}
    //         >
    //             <Box sx={modalStyle}>
    //                 <div className="flex flex-col items-center justify-center w-auto ">
    //                     <div className="flex flex-row items-center justify-between p-4 mt-1 w-full">
    //                         <div></div>
    //                         <div>
    //                             <h1 className="text-xl font-bold">Select Audience</h1>
    //                         </div>
    //                         <div className="">
    //                             <Tooltip title="Close">
    //                                 <IconButton onClick={handleAudienceSelectionClose}>
    //                                     <CloseRoundedIcon />
    //                                 </IconButton>
    //                             </Tooltip>
    //                         </div>
    //                     </div>

    //                     {/* Scrollable Lists for Selection */}
    //                     <div className="flex flex-row items-center justify-center px-6 my-2 w-full border border-green-400 gap-4">

    //                         <div className="flex-1">
    //                             <label className="block text-sm font-medium mb-2">Programs</label>
    //                             <div className="border border-gray-300 rounded-lg p-2 h-48 overflow-y-auto">
    //                             <ul>
    //                                 <li>
    //                                 <label className="flex items-center">
    //                                     <input
    //                                     type="checkbox"
    //                                     checked={selectedPrograms.includes('All')}
    //                                     onChange={() => {
    //                                         if (selectedPrograms.includes('All')) {
    //                                         setSelectedPrograms([]);
    //                                         } else {
    //                                         setSelectedPrograms(['All', ...programs.map((p) => p.name)]);
    //                                         }
    //                                     }}
    //                                     />
    //                                     <span className="ml-2">All</span>
    //                                 </label>
    //                                 </li>
    //                                 {programs.map((program) => (
    //                                 <li key={program.program_id}>
    //                                     <label className="flex items-center">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={selectedPrograms.includes(program.name)}
    //                                         onChange={() => {
    //                                         if (selectedPrograms.includes(program.name)) {
    //                                             setSelectedPrograms(selectedPrograms.filter((p) => p !== program.name));
    //                                         } else {
    //                                             setSelectedPrograms([...selectedPrograms, program.name]);
    //                                         }
    //                                         }}
    //                                     />
    //                                     <span className="ml-2">{program.name}</span>
    //                                     </label>
    //                                 </li>
    //                                 ))}
    //                             </ul>
    //                             </div>
    //                         </div>

    //                         {/* Departments List */}
    //                         <div className="flex-1">
    //                             <label className="block text-sm font-medium mb-2">Departments</label>
    //                             <div className="border border-gray-300 rounded-lg p-2 h-48 overflow-y-auto">
    //                             <ul>
    //                                 <li>
    //                                 <label className="flex items-center">
    //                                     <input
    //                                     type="checkbox"
    //                                     checked={selectedDepartments.includes('All')}
    //                                     onChange={() => {
    //                                         if (selectedDepartments.includes('All')) {
    //                                         setSelectedDepartments([]);
    //                                         } else {
    //                                         setSelectedDepartments(['All', ...departments.map((d) => d.name)]);
    //                                         }
    //                                     }}
    //                                     />
    //                                     <span className="ml-2">All</span>
    //                                 </label>
    //                                 </li>
    //                                 {departments.map((department) => (
    //                                 <li key={department.department_id}>
    //                                     <label className="flex items-center">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={selectedDepartments.includes(department.name)}
    //                                         onChange={() => {
    //                                         if (selectedDepartments.includes(department.name)) {
    //                                             setSelectedDepartments(selectedDepartments.filter((d) => d !== department.name));
    //                                         } else {
    //                                             setSelectedDepartments([...selectedDepartments, department.name]);
    //                                         }
    //                                         }}
    //                                     />
    //                                     <span className="ml-2">{department.name}</span>
    //                                     </label>
    //                                 </li>
    //                                 ))}
    //                             </ul>
    //                             </div>
    //                         </div>

    //                         {/* Intake Season List */}
    //                         <div className="flex-1">
    //                             <label className="block text-sm font-medium mb-2">Intake Season</label>
    //                             <div className="border border-gray-300 rounded-lg p-2 h-48 overflow-y-auto">
    //                             <ul>
    //                                 <li>
    //                                 <label className="flex items-center">
    //                                     <input
    //                                     type="checkbox"
    //                                     checked={selectedIntakeSeason === 'All'}
    //                                     onChange={() => {
    //                                         setSelectedIntakeSeason(selectedIntakeSeason === 'All' ? '' : 'All');
    //                                     }}
    //                                     />
    //                                     <span className="ml-2">All</span>
    //                                 </label>
    //                                 </li>
    //                                 {['Fall', 'Winter', 'Spring', 'Summer'].map((season) => (
    //                                 <li key={season}>
    //                                     <label className="flex items-center">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={selectedIntakeSeason === season}
    //                                         onChange={() => {
    //                                         setSelectedIntakeSeason(season);
    //                                         }}
    //                                     />
    //                                     <span className="ml-2">{season}</span>
    //                                     </label>
    //                                 </li>
    //                                 ))}
    //                             </ul>
    //                             </div>
    //                         </div>

    //                         {/* Intake Year Input */}
    //                         <div className="flex-1">
    //                             <label className="block text-sm font-medium mb-2">Intake Year</label>
    //                             <div className="border border-gray-300 rounded-lg p-2 h-48 overflow-y-auto">
    //                             <ul>
    //                                 <li>
    //                                 <label className="flex items-center">
    //                                     <input
    //                                     type="checkbox"
    //                                     checked={selectedIntakeYears === 'All'}
    //                                     onChange={() => {
    //                                         setSelectedIntakeYears(selectedIntakeYears === 'All' ? '' : 'All');
    //                                     }}
    //                                     />
    //                                     <span className="ml-2">All</span>
    //                                 </label>
    //                                 </li>
    //                                 <li>
    //                                 <input
    //                                     type="number"
    //                                     value={selectedIntakeYears === 'All' ? '' : selectedIntakeYears}
    //                                     onChange={(e) => setSelectedIntakeYears(parseInt(e.target.value))}
    //                                     className="border border-gray-300 rounded-lg p-2 w-full"
    //                                     placeholder="Enter Year"
    //                                 />
    //                                 </li>
    //                             </ul>
    //                             </div>
    //                         </div>
                            
    //                     </div>

    //                     <div className="my-5">
    //                         <ActionButton onClick={handleSave} type="button" title="Save Selection" icon={<SaveRoundedIcon />}
    //                             bgColor="bg-saitWhite" textColor="text-saitBlue" borderColor="border-saitBlue" hoverBgColor="bg-saitBlue" hoverTextColor="text-saitWhite"
    //                         />
    //                     </div>
    //                 </div>
    //             </Box>
    //         </Modal>
    //     </div>
    // );


