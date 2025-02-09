import * as React from "react";
import { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";

// mui components
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function UserHeader() {
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
    <header className="flex justify-between items-center h-[3.5rem] md:h-16 p-10 w-full">
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
          sx={{
            "& .MuiMenuItem-root": {
              fontFamily: "Sans-serif",
              fontSize: "1rem",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
