import * as React from "react";
import { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";

// mui components
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";



export default function UserHeader({handleSidebarToggle, shouldShowButton}: {handleSidebarToggle: () => void, shouldShowButton: boolean}) {
  const { user, authUserLoading, signOutFirebase, signOutAll } = useUserAuth();
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
      router.push("/user/login");
    } catch (err) {
      console.log("Sign Out error:", err);
    }
  }

  return (
    <header className="flex justify-between items-center h-[3.5rem] md:h-16 p-2 -mt-2 w-full bg-saitWhite">
      <div>
        <img
          src="/sait-logo.png"
          alt="sait-logo"
          className="border-2 rounded-xl border-saitLightBlue w-10 h-10"
        />
      </div>
      <div className="flex justify-between items-center space-x-3">
        <div className="grid place-items-center rounded-full bg-slate-300 w-[2.4rem] h-[2.4rem] hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
          {/* <img src="/setting.png" alt="setting-icon" className="w-6 h-6" /> */}
          <NotificationsIcon
            sx={{ color: "#4c4c4c", fontSize: 25, ":hover": { color: "#fff" } }}
          />
        </div>
        <div className="grid place-items-center rounded-full bg-slate-300 w-[2.4rem] h-[2.4rem] hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300">
          <DarkModeIcon
            sx={{ color: "#4c4c4c", fontSize: 25, ":hover": { color: "#fff" } }}
          />
        </div>

        { shouldShowButton && (
          <div className="grid place-items-center rounded-lg bg-slate-300 w-8 h-8 ml-auto hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300"
            onClick={handleSidebarToggle}
          >
            <MenuIcon sx={{ color: "#4c4c4c", fontSize: 22, ":hover": { color: '#fff' } }} />
          </div>
        )}

        <button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
          // className="flex items-center mr-3"
          className="grid place-items-center rounded-full bg-slate-300 w-[2.4rem] h-[2.4rem] hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300"
        >
          <SettingsIcon
            sx={{ color: "#4c4c4c", fontSize: 25, ":hover": { color: "#fff" } }}
          />
        </button>

        {/* <div className="grid place-items-center rounded-lg bg-slate-300 w-8 h-8 hover:bg-saitLightBlue hover:stroke-saitWhite transition-colors duration-300"> */}
        {/* <img src="/setting.png" alt="setting-icon" className="w-6 h-6" /> */}
        {/* <PersonIcon sx={{ color: "#4c4c4c", fontSize: 22, ":hover": { color: '#fff' } }} />
                </div> */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
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
      </div>
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