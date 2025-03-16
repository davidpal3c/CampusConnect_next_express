
import React, { useEffect, useState } from 'react';

import ActionButton from '@/app/components/Buttons/ActionButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BeenhereRoundedIcon from '@mui/icons-material/BeenhereRounded';
import ScrollableList from '@/app/components/PageComponents/Admin/Articles/ScrollableList';

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

    const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedIntakeSeasons, setSelectedIntakeSeasons] = useState<string[]>([]);
    const [selectedIntakeYears, setSelectedIntakeYears] = useState<string[]>([]);       // convert fetched numbers to string (to match the 'All' option)
    const [audienceSelection, setAudienceSelection] = useState<any>({});
    
    const [availableAudience, setAvailableAudience] = useState<any>({});
    const { programs, departments, intakeSeasons, intakeYears } = availableAudience;



    const handleAudienceSelectionClose = () => {
        if (!isSaved) {
            saveAudienceCriteria({});
            setOpenAudienceSelectionModal(false);
        } 
        setOpenAudienceSelectionModal(false)
    };

    const handleSave = async () => {
        const audienceCriteria = {
          programs: selectedPrograms.includes('All') ? ['All'] : selectedPrograms,
          departments: selectedDepartments.includes('All') ? ['All'] : selectedDepartments,
          intakeSeasons: selectedIntakeSeasons.includes('All') ? ['All'] : selectedIntakeSeasons,
          intakeYear: selectedIntakeYears.includes('All') ? ['All'] : selectedIntakeYears,
        };

        await saveAudienceCriteria(audienceCriteria);
        
        setIsSaved(true);
        handleAudienceSelectionClose();
        setShowAccordion(true);
    };

    // Handle selection for Programs
    const handleProgramSelection = (program: string) => {
        if (program === 'All') {
        setSelectedPrograms(selectedPrograms.includes('All') ? [] : ['All', ...programs.map((p) => p.name)]);
        } else {
        const updatedPrograms = selectedPrograms.includes(program)
            ? selectedPrograms.filter((p) => p !== program)
            : [...selectedPrograms.filter((p) => p !== 'All'), program];
        setSelectedPrograms(updatedPrograms.length === 0 ? [] : updatedPrograms);
        }
    };
    
    // Handle selection for Departments
    const handleDepartmentSelection = (department: string) => {
        if (department === 'All') {
        setSelectedDepartments(selectedDepartments.includes('All') ? [] : ['All', ...departments.map((d) => d.name)]);
        } else {
        const updatedDepartments = selectedDepartments.includes(department)
            ? selectedDepartments.filter((d) => d !== department)
            : [...selectedDepartments.filter((d) => d !== 'All'), department];
        setSelectedDepartments(updatedDepartments.length === 0 ? [] : updatedDepartments);
        }
    };

    // Handle selection for Intake Season
    const handleIntakeSeasonSelection = (season: string) => {
        if (season === 'All') {
            // Toggle "All" selection
            setSelectedIntakeSeasons(selectedIntakeSeasons.includes('All') ? [] : ['All', ...intakeSeasons]);
        } else {
            // Toggle specific season selection
       const updateSeasons = selectedIntakeSeasons.includes(season)
            ? selectedIntakeSeasons.filter((s) => s !== season)                      // deselect 
            : [...selectedIntakeSeasons.filter((s) => s !== 'All'), season];         // select
        setSelectedIntakeSeasons(updateSeasons.length === 0 ? [] : updateSeasons);
        }
    };

    // Handle selection for Intake Year
    const handleIntakeYearSelection = (year: number | 'All') => {
        if (year === 'All') {
            // toggle all. --> Convert fetched numbers to string (to match the 'All' option)
            setSelectedIntakeYears(selectedIntakeYears.includes('All') ? [] : ['All', ...intakeYears.map((y) => y.toString())]);    
        } else {
            const updatedYears = selectedIntakeYears.includes(year.toString()) 
            ? selectedIntakeYears.filter((y) => y !== year.toString()) 
            : [...selectedIntakeYears.filter((y) => y !== 'All'), year.toString()];

            setSelectedIntakeYears(updatedYears.length === 0 ? [] : updatedYears);
        }
    };

    const fetchAvailableAudience = async () => {
        try {
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
            console.log(audienceData.message);
        } catch (error: any) {
            console.error("Error fetching Audience Selection: ", error);
            toast.error("Error fetching Audience Selection", error);
        }
    }

    // const [programs] = useState([
    //     { program_id: '1', name: 'Program 1' },
    //     { program_id: '2', name: 'Program 2' },
    //     { program_id: '3', name: 'Program 3' },
    //     { program_id: '4', name: 'Program 4' },
    //     { program_id: '5', name: 'Program 5' },
    //     { program_id: '6', name: 'Program 6' },
    //     { program_id: '7', name: 'Program 7' },
    //     { program_id: '8', name: 'Program 8' },
    //     { program_id: '9', name: 'Program 9' },
    //     { program_id: '10', name: 'Program 10' },   
    //     { program_id: '11', name: 'Program 11' },
    //     { program_id: '12', name: 'Program 12' },
    // ]);

    // const [departments] = useState([
    //     { department_id: '1', name: 'Department 1' },
    //     { department_id: '2', name: 'Department 2' },
    //     { department_id: '3', name: 'Department 3' },
    // ]);


    // const [intakeSeasons] = useState(['Fall', 'Winter', 'Spring', 'Summer']);
    // const [intakeYears] = useState([2021, 2022, 2023, 2024, 2025]); 


    // useEffect(() => {
    //     console.log("Selected Programs: ", selectedPrograms);
    //     console.log("Selected Departments: ", selectedDepartments);
    //     console.log("Selected Intake Seasons: ", selectedIntakeSeasons);
    //     console.log("Selected Intake Years: ", selectedIntakeYears);
    // }, [selectedDepartments, selectedPrograms, selectedIntakeSeasons, selectedIntakeYears]);

    useEffect(() => {
        console.log("Current Audience Criteria (modal): ", currentAudienceCriteria);
    }, [currentAudienceCriteria]);

    useEffect(() => {
        fetchAvailableAudience();
        console.log("Available Audience: ", availableAudience);
    }, [availableAudience]);


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


                        <div className="flex flex-row items-center justify-center px-6 my-2 w-full border border-green-400 gap-4">

                            {/* Programs List */}
                            <div className="flex-1">
                                <label className="block text-md font-semibold mb-2">Programs</label>
                                <ScrollableList
                                    items={programs?.map((program) => program.name) || []}
                                    selectedItems={selectedPrograms}
                                    onSelect={handleProgramSelection}
                                />
                            </div>

                            {/* Departments List */}
                            <div className="flex-1">
                                <label className="block text-md font-semibold mb-2">Departments</label>
                                <ScrollableList
                                items={departments?.map((d) => d.name) || []}
                                selectedItems={selectedDepartments}
                                onSelect={handleDepartmentSelection}
                                />
                            </div>

                            {/* Intake Season List */}
                            <div className="flex-1">
                                <label className="block text-md font-semibold mb-2">Intake Season</label>
                                <ScrollableList
                                items={intakeSeasons?.map((season) => season) || []}
                                selectedItems={selectedIntakeSeasons}
                                onSelect={handleIntakeSeasonSelection}
                                includeAllOption={true}
                                />
                            </div>

                            {/* Intake Year List */}
                            <div className="flex-1">
                                <label className="block text-md font-semibold mb-2">Intake Season</label>
                                <ScrollableList
                                items={intakeYears?.map((y) => y.intake_year.toString()) || []}
                                selectedItems={selectedIntakeYears}
                                onSelect={handleIntakeYearSelection}
                                includeAllOption={true}
                                />
                            </div>
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


