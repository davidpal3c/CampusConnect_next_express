// Import from React 
import { useState } from "react";

// Interfaces
interface FilterInputProps {
    title: string;
    icon: React.ReactNode;
    handleChange: (value: string) => void;
  }

interface FilterDropdownProps {
  title: string;
  options: string[];
  handleSelect: (value: string) => void;
}


export function FilterInput({ title, icon, handleChange }: FilterInputProps) {

    return (
        <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
            <input 
                onChange={(event) => handleChange(event.target.value)}
                type="text" 
                placeholder={title} 
                className="flex-1 text-saitGray text-sm bg-transparent w-60 focus:outline-none" 
            />
            {icon}
        </div>
    );
}

export function FilterDropdown({ title, options, handleSelect }: FilterDropdownProps) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        handleSelect(event.target.value);
    };

    return (
        <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
            <select
                value={selectedOption}
                onChange={handleChange}
                className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none"
            >
                <option value="">{title}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
