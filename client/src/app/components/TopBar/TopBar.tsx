"use client";

import React, { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useUserData } from "@/app/_utils/userData-context";
import { UserData } from "@/app/types/userTypes";
import { useRouter } from "next/navigation";

import { TopBarButton } from "./TopBarButtons";
import Loader from "../Loader/Loader";
import TopBarNavigator from "./TopBarNavigator";

import { Menu, MenuItem } from "@mui/material";
import HamburgerIcon from "../Icons/HamburgerIcon";
import Link from "next/link";

export default function TopNavBar() {
  const router = useRouter();
  const { userData, loadingUser }: { userData: any; loadingUser: any } =
    useUserData();
  const { authUserLoading, signOutAll } = useUserAuth();
  const image_url = userData?.user.image_url || "/avatar-generic.jpg";
  const user_id = userData?.user.user_id;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [hamburgerAnchorEl, setHamburgerAnchorEl] =
    useState<null | HTMLElement>(null);
  const handleHamburgerMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setHamburgerAnchorEl(event.currentTarget);
  const handleHamburgerClose = () => setHamburgerAnchorEl(null);

  async function handleSignOut() {
    setHamburgerAnchorEl(null);
    setAnchorEl(null);
    try {
      await signOutAll();
      router.push("/user/login");
    } catch (err) {
      console.error("Sign Out error:", err);
    }
  }

  return (
    <div>
      {loadingUser || authUserLoading ? (
        <Loader isLoading={loadingUser || authUserLoading} />
      ) : (
        <div>
          <div className="bg-side-red-gradient text-white shadow-xl relative z-10">
            <div className="flex p-4 justify-between">
              {/* Logo / Title */}
              <div className="flex flex-row items-center space-x-2">
                <img
                  src="/sait-logo-white.png"
                  alt="Campus Connect"
                  className="w-12 h-12"
                />
                <h1 className="text-2xl font-bold">CampusConnect</h1>
              </div>
              <div className="flex flex-row">
                {/* Links (Desktop View) */}
                <nav className="hidden md:flex space-x-6 px-4">
                  <TopBarButton href="/user/">Dashboard</TopBarButton>
                  <TopBarButton href="/user/events/">Events</TopBarButton>
                  <TopBarButton href="/user/groups/">Groups</TopBarButton>
                  <TopBarButton href="/user/articles/">Articles</TopBarButton>
                </nav>

                {/* Hamburger Button */}
                <button
                  className="md:hidden flex items-center cursor-pointer"
                  onClick={handleHamburgerMenu}
                >
                  <HamburgerIcon className="size-8 mr-4 text-saitWhite stroke-saitWhite " />
                </button>

                <Menu
                  anchorEl={hamburgerAnchorEl}
                  open={Boolean(hamburgerAnchorEl)}
                  onClose={handleHamburgerClose}
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
                    },
                  }}
                >
                  <MenuItem
                    component={Link}
                    href="/user/"
                    sx={menuStyles.menuItem}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/user/events/"
                    sx={menuStyles.menuItem}
                  >
                    Events
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/user/groups/"
                    sx={menuStyles.menuItem}
                  >
                    Groups
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/user/articles/"
                    sx={menuStyles.menuItem}
                  >
                    Articles
                  </MenuItem>
                </Menu>

                {/* Profile Icon / Mobile Menu */}
                <div className="flex items-end space-x-4">
                  <button
                    className="p-1 bg-white text-black rounded-full"
                    onClick={handleMenu}
                  >
                    <img
                      src={image_url}
                      alt="User Profile Image"
                      className="w-12 h-12 rounded-full"
                    />
                  </button>

                  {/* Profile Menu (Works on Both Mobile & Desktop) */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
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
                      },
                    }}
                  >
                    <MenuItem sx={menuStyles.menuItem}>Profile</MenuItem>
                    <MenuItem sx={menuStyles.menuItem}>Account</MenuItem>
                    <MenuItem sx={menuStyles.menuItem} onClick={handleSignOut}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <TopBarNavigator userId={user_id} />
        </div>
      )}
    </div>
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
    color: "#06222b",
  },
};
