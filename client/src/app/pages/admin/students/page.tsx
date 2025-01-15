"use client";   

import PageHeader from "@/app/components/PageHeader/PageHeader";
import {FilterDropdown, FilterInput} from "@/app/components/Buttons/FilterButton/FilterButton";

// Icons for filters
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';

export default function Students() {
    return (
        <div className="bg-saitWhite h-screen">
            <PageHeader title="Students" 
                filter={
                    <div className="flex space-x-2">
                        <FilterInput 
                            title="Name" 
                            icon={<SearchOutlinedIcon className="text-saitGray" fontSize="small" />} 
                        />
                        <FilterInput 
                            title="Student ID" 
                            icon={<TagOutlinedIcon className="text-saitGray" fontSize="small" />} 
                        />
                    </div>
                }
                subfilter={
                    <div className="flex space-x-2">
                        <FilterDropdown 
                            title="Status" 
                            options={["Current", "Alumni", "Upcoming"]}
                            
                        />
                    </div>
                } />
        </div>
        
    );
}