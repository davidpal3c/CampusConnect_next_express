import { useUserAuth } from "@/app/_utils/auth-context";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/navigation";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Header() {

    const { user, signOutFirebase } = useUserAuth();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleSignOut() {
        setAnchorEl(null);

        try {
            await signOutFirebase();
        } catch (err) {
            console.log("Sign Out error:", err);
        }
    }

    useEffect(() => {
        if (!user) {
            router.push("/admin/login");
        }
    }, []);

    return (
        <header className="flex justify-between items-center h-[3.5rem] md:h-16 p-2 -mt-2 w-full">
            <div className="flex justify-between items-center space-x-3 ">
                {/* <p>Some-btn</p> */}
                <div className="grid place-items-center rounded-lg bg-slate-300 w-8 h-8 hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
                    <SettingsIcon sx={{ color: "#4c4c4c", fontSize: 22, ":hover": { color: '#fff' } }} />
                </div>
                <div className="grid place-items-center rounded-lg bg-slate-300 w-8 h-8 hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
                    <DarkModeIcon sx={{ color: "#4c4c4c", fontSize: 22, ":hover": { color: '#fff' } }} />
                </div>

            </div>
            {user ? (
                <button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}
                    className="flex items-center mr-3">

                    <img src={user.photoURL} alt="" className="w-[2.4rem] h-[2.4rem] ml-3 mr-2 rounded-full border border-slate-500" />
                    <p className="text-sm text-gray-950">Hello<span className="ml-1 font-semibold">{user.displayName}!</span></p>
                </button>
            ) : (
                <div>Signing out...</div>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ '& .MuiMenuItem-root': { fontFamily: 'Sans-serif', fontSize: '1rem' } }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </header>
    );
}