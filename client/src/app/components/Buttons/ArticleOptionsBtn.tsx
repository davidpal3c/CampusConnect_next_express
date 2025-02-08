"use client"

import React, {useEffect, useState} from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Tooltip } from '@mui/material';


type ArticleOptionsBtnProps = {
    title?: string;
    onClick?: any;

    icon?: any;
    // optional props for styling
    textColor?: string;
    fontWeight?: string;
    bgColor?: string;
    borderColor?: string;

    hoverTextColor?: string;
    hoverBgColor?: string;
    hoverBorderColor?: string;
};

const ArticleOptionsBtn: React.FC<ArticleOptionsBtnProps> = ({ 
    title, 
    icon,
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
    // const [ iconBtn, setIconBtn ] = useState(icon);

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
    

    const [anchorExportOpt, setAnchorExportOpt] = useState<null | HTMLElement>(null);
    const openExportOptions = Boolean(anchorExportOpt);
    
    
    const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorExportOpt(event.currentTarget);
    };

    const handleExportOptClose = () => {
        setAnchorExportOpt(null);
    };

    // open={isTooltipOpen} onClose={() => setIsTooltipOpen(false)}
    return (
        <div>
            {/* <button
                onClick={onClick}
                className="bg-white border-2 border-saitGray text-green-700 font-semibold h-9 flex items-center py-2 px-4 rounded-lg hover:text-orange-500 hover:bg-saitRed hover:border-saitPurple hover:shadow-2xl transition-colors duration-300"
            > */}
            <Tooltip title="Options" arrow>
                <button
                    onClick={handleClickOptions}
                    className={buttonStyle}
                >
                    {title || icon }
                </button>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorExportOpt}
                open={openExportOptions}
                onClose={handleExportOptClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                // sx={{ '& .MuiMenuItem-root': { fontFamily: 'Sans-serif', fontSize: '1rem' } }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#f7f7f7",
                        borderRadius: "10px",
                        border: "1px solid #005795",
                        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.4)",
                        marginTop: "0.4rem",
                        marginLeft: "0.4rem",
                        width: "14rem",
                    }
                }}
            >
                <MenuItem sx={menuStyles.menuItem}>Articles Data Analytics</MenuItem>
                <MenuItem sx={menuStyles.menuItem}>Export to Excel</MenuItem>
                <MenuItem sx={menuStyles.menuItem}>Export to PDF</MenuItem>
            </Menu>
        </div>
    );
};

export default ArticleOptionsBtn;


const menuStyles = {
    menuItem: {
        ":hover": {
            backgroundColor: "#999999",
            color: "#f7f7f7",
            cursor: "pointer",
            transition: "background-color 0.3s ease-out, color 0.3s ease-out",
        },
        color: "#666666"
    }
}