

import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon'; 
import { Tooltip } from '@mui/material';


type ArticlesPageOptionsBtnProps = {
    title?: string;
    icon?: any;
    optionHandler?: any;
};

const ArticlesPageOptionsBtn: React.FC<ArticlesPageOptionsBtnProps> = ({ title, icon, optionHandler }) => {
        
    const [anchorExportOpt, setAnchorExportOpt] = useState<null | HTMLElement>(null);
    const openExportOptions = Boolean(anchorExportOpt);
    
    const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorExportOpt(event.currentTarget);
    };

    const handleExportOptClose = () => {
        setAnchorExportOpt(null);
    };

    return (
        <div>
            {/* <button
                onClick={onClick}
                className="bg-white border-2 border-saitGray text-green-700 font-semibold h-9 flex items-center py-2 px-4 rounded-lg hover:text-orange-500 hover:bg-saitRed hover:border-saitPurple hover:shadow-2xl transition-colors duration-300"
            > */}
            <Tooltip title="Options" arrow>
                <button
                    onClick={handleClickOptions}
                    className="h-9 w-9 flex justify-center items-center text-saitGray border border-saitPurple bg-white font-normal hover:text-saitWhite hover:border-saitPurple
                    hover:bg-saitPurple py-2 px-4 rounded-full hover:shadow-2xl active:scale-75 transition-transform transition-colors duration-300 ease-in-out delay-75"
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
                {optionHandler.map((option: any, index: number) => (
                    <MenuItem 
                        key={index} 
                        onClick={option.handler} 
                        sx={menuStyles.menuItem}
                    >
                        <p className="mr-3">{option.title}</p>
                        {option.icon && (
                            <ListItemIcon sx={{ minWidth: "36px" }}>
                                {option.icon}
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ArticlesPageOptionsBtn;


const menuStyles = {
    menuItem: {
        ":hover": {
            backgroundColor: "#999999",
            color: "#f7f7f7",
            cursor: "pointer",
            transition: "background-color 0.3s ease-out, color 0.3s ease-out",
        },
        color: "#666666"
    },
}