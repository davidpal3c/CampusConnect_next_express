import { useUserAuth } from "@/app/_utils/auth-context";
import { useUserData } from "@/app/_utils/userData-context";
import { User } from "@/app/types/User/userTypes";
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import { Tooltip } from "@mui/material";


type HeaderProps = {
    handleSidebarToggle: () => void;
    shouldShowButton: boolean;
}

export default function Header({ handleSidebarToggle, shouldShowButton }: HeaderProps) {

    const { user, authUserLoading, signOutFirebase, signOutAll } = useUserAuth();
    const { userData } = useUserData() as { userData: User };
    const [avatarImg, setAvatarImg] = useState<string | null>(null);
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
            await signOutAll();
            // await signOutFirebase();
            router.push("/admin/login");
        } catch (err) {
            console.log("Sign Out error:", err);
        }
    }

    useEffect(() => {
        if (userData?.image_url || user?.photoURL) {
            setAvatarImg(userData?.image_url || user?.photoURL);
        }
    }, [user, userData]);


    return (
        <header className="flex justify-between items-center h-[3.5rem] md:h-16 p-2 -mt-2 w-full">
            <div className="flex justify-between items-center space-x-3 ">
                {/* <p>Some-btn</p> */}
                <div className="grid place-items-center rounded-full bg-slate-300 w-[2.4rem] h-[2.4rem] hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
                    <SettingsIcon sx={{ color: "#4c4c4c", fontSize: 25, ":hover": { color: '#fff' } }} />
                </div>
                <div className="grid place-items-center rounded-full bg-slate-300 w-[2.4rem] h-[2.4rem] hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
                    <DarkModeIcon sx={{ color: "#4c4c4c", fontSize: 25, ":hover": { color: '#fff' } }} />
                </div>
            </div>
            { shouldShowButton && (
                <div className="grid place-items-center rounded-lg bg-slate-300 w-8 h-8 ml-auto hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300" onClick={handleSidebarToggle}>
                    <MenuIcon sx={{ color: "#4c4c4c", fontSize: 22, ":hover": { color: '#fff' } }} />
                </div>
            )}

            {authUserLoading ? (
                <div>
                    <p className="text-sm">Loading...</p>
                </div>
            ) : user ? (
                <Tooltip title={`Hello, ${user.displayName}!`} arrow>           
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                        className="flex items-center mr-3 active:scale-75 transition-shadow duration-300 ease-in-out">

                        {/* <Image 
                            src={user?.photoURL || userData?.image_url || 'https://i.ibb.co/5g3zzK2s/avatar-generic.jpg'} 
                            alt="user-avatar-photo" 
                            width={36}
                            height={36}
                            className="ml-3 mr-2 rounded-full border border-slate-500"
                            unoptimized
                            loading="lazy"
                        /> */}
                        {avatarImg ? (
                            <Image 
                                src={avatarImg} 
                                alt="user-avatar-photo" 
                                width={36}
                                height={36}
                                className="ml-3 mr-2 rounded-full border border-slate-500"
                                unoptimized
                                loading="lazy"
                                onError={(e) => (e.currentTarget.src = 'https://i.ibb.co/5g3zzK2s/avatar-generic.jpg')}
                            />
                        ) : (
                            <Image 
                                src='https://i.ibb.co/5g3zzK2s/avatar-generic.jpg'
                                alt="user-avatar-photo" 
                                width={36}
                                height={36}
                                className="ml-3 mr-2 rounded-full border border-slate-500"
                                unoptimized
                                loading="lazy"
                            />
                        )}
                    </button>
                    
                </Tooltip>
            ) : (
                <div>
                    <p className="text-sm">Signing Out...</p>
                </div>
            )}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
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
                        marginRight: "1.3rem",
                        width: "10rem",
                    }
                }}
            >
                <MenuItem sx={menuStyles.menuItem} onClick={handleClose}>Profile</MenuItem>
                <MenuItem sx={menuStyles.menuItem} onClick={handleClose}>My account</MenuItem>
                <MenuItem sx={menuStyles.menuItem} onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </header>
    );
}

const menuStyles = {
    menuItem: {
        ":hover": {
            // backgroundColor: "#feba74",
            backgroundColor: "#999999",
            color: "#f7f7f7",
            cursor: "pointer",
            transition: "background-color 0.3s ease-out, color 0.3s ease-out",
        },
        color: "#06222b"
    }
}