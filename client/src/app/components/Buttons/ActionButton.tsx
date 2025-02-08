"use client"

import React, {useEffect, useState} from 'react';

type ActionButtonProps = {
    title: string;
    onClick: () => void;

    // optional props for styling
    textColor?: string;
    fontWeight?: string;
    bgColor?: string;
    borderColor?: string;

    hoverTextColor?: string;
    hoverBgColor?: string;
    hoverBorderColor?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ 
    title, 
    onClick, 

    textColor, 
    fontWeight,
    bgColor, 
    borderColor,

    hoverTextColor,
    hoverBgColor,
    hoverBorderColor,

}) => {
    
    const [buttonStyle, setButtonStyle] = useState("");

    const buttonStyles = {
        color: textColor || 'text-saitGray',
        fontWeight: fontWeight || 'font-normal',
        backgroundColor: bgColor || 'bg-white',
        borderColor: borderColor || 'border-saitGray',
    };

    const hoverStyles = {
        textColor: hoverTextColor || 'text-saitWhite',
        borderColor: hoverBorderColor || 'border-saitPurple',
        backgroundColor: hoverBgColor || 'bg-saitPurple',
    }

    const finalClassName = `${buttonStyles.color} border ${buttonStyles.borderColor} ${buttonStyles.backgroundColor}
    font-normal h-9 flex ${buttonStyles.fontWeight} items-center py-2 px-4 rounded-lg 
    hover:${hoverStyles.textColor} hover:${hoverStyles.borderColor} hover:${hoverStyles.backgroundColor} 
    hover:shadow-2xl transition ease-in delay-75 transition-colors duration-300`;

    useEffect(() => {
        setButtonStyle(finalClassName);
    }, [])
    

    return (
        <div>
            {/* <button
                onClick={onClick}
                className="bg-white border-2 border-saitGray text-green-700 font-semibold h-9 flex items-center py-2 px-4 rounded-lg hover:text-orange-500 hover:bg-saitRed hover:border-saitPurple hover:shadow-2xl transition-colors duration-300"
            > */}
            <button
                onClick={onClick}
                className={buttonStyle}
            >
                {title}
            </button>
        </div>
    );
};

export default ActionButton;
