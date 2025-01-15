import React, { useState } from "react";


export function FilterInput({ title, icon }) {
    return (
        <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
            <input 
                type="text" 
                placeholder={title} 
                className="flex-1 text-saitGray text-sm bg-transparent focus:outline-none" 
            />
            {icon}
        </div>
    );
}

export function FilterDropdown({ title, options }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="flex flex-row items-center bg-white border-2 rounded-lg p-1">
            <select
                value={selectedOption}
                onChange={handleChange}
                className="flex-1 text-saitGray text-sm bg-transparent border-none focus:outline-none"
            >
                <option value="" disabled>{title}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
