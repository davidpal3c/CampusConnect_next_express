"use client"

import React, {useEffect, useState} from 'react';

type ActionButtonProps = {
    title?: string;
    icon?: any;
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
    iconFirst?: boolean;

    // optional props for styling
    textSize?: string;  
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
    icon,
    onClick, 
    type,
    disabled,
    iconFirst,

    textSize,
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
        textSize: textSize || 'text-md',
    };

    const hoverStyles = {
        textColor: hoverTextColor || 'text-saitWhite',
        borderColor: hoverBorderColor || 'border-saitPurple',
        backgroundColor: hoverBgColor || 'bg-saitPurple',
    }

    const finalClassName = `group ${buttonStyles.color} border ${buttonStyles.borderColor} ${buttonStyles.backgroundColor}
    font-normal h-9 flex ${buttonStyles.fontWeight} items-center justify-between py-2 px-4 rounded-full ${buttonStyles.textSize}
    hover:${hoverStyles.textColor} hover:${hoverStyles.borderColor} hover:${hoverStyles.backgroundColor} 
    hover:shadow-2xl active:scale-75 transition delay-150 transition-colors transition-transform duration-300 ease-in-out`;

    useEffect(() => {
        setButtonStyle(finalClassName);
    }, [])
    
    return (
        <div>
            {/* <button
                onClick={onClick}
                className="bg-white border-2 border-saitGray text-green-700 font-semibold h-9 flex items-center py-2 px-4 rounded-lg hover:text-orange-500 hover:bg-saitRed hover:border-saitPurple hover:shadow-2xl transition-colors duration-300"
            > */}

            {type === "button" ? (              // preventing form submission
                <button
                    onClick={onClick}
                    className={buttonStyle}
                    type={type}
                    disabled={disabled}
                >
                    {iconFirst ? (
                        <div>
                            {icon && React.cloneElement(icon, { className: `text-md ml-1 mr-[-0.3rem] group-hover:${hoverStyles.textColor} transition ease-in delay-75 transition-colors duration-300` })}
                            {title}
                        </div>
                        
                    ) : (
                        <div>
                            {title}
                            {icon && React.cloneElement(icon, { className: `text-md ml-1 mr-[-0.3rem] group-hover:${hoverStyles.textColor} transition ease-in delay-75 transition-colors duration-300` })}
                        </div>                        
                    )}
                </button>
            ) : (               // type === "option"
                <button
                onClick={onClick}
                className={buttonStyle}
                disabled={disabled}
                >
                    {iconFirst ? (
                        <div className="flex items-center justify-evenly">
                            {icon && React.cloneElement(icon, { className: `text-md -ml-1 group-hover:${hoverStyles.textColor} transition ease-in delay-75 transition-colors duration-300` })}
                            {title}
                        </div>
                        
                    ) : (
                        <div className="flex items-center">
                            {title}
                            {icon && React.cloneElement(icon, { className: `text-md mr-[-0.3rem] ml-1 group-hover:${hoverStyles.textColor} transition ease-in delay-75 transition-colors duration-300` })}
                        </div>                        
                    )}
                </button>
            )}
        </div>
    );
};

export default ActionButton;
