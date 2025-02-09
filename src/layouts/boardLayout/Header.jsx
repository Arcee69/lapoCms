import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
// import { useUser } from "../../../providers/userDetailsProvider";
import hamburger from "../../assets/icons/hamburger.svg";
import avatar from "../../assets/icons/avatar.svg";
import TokenService from "../../services/token"

export default function Header({ setOpenMobileSidebar }) {


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const userData = JSON.parse(sessionStorage.getItem('userObj'))

  // console.log(userData, "opor")

  // const { user } = userData 

  const location = useLocation()

  const navigate = useNavigate()

  return (
    <div className="w-full h-full bg-[#fff] flex justify-between items-center">
      <div className="flex gap-3">
        <img
          src={hamburger}
          alt="hamburger"
          loading="lazy"
          className="lg:hidden xs:block cursor-pointer"
          onClick={() => setOpenMobileSidebar(true)}
        />
    
      </div>
      <div className="flex gap-4 items-center mr-4 ">
  
        <img
          src={avatar}
          alt="avatar"
          loading="lazy"
          className="h-[40px] w-[40px] cursor-pointer"
          // id="header-menu"
          // aria-controls={open ? "header-menu" : undefined}
          // aria-haspopup="true"
          // aria-expanded={open ? "true" : undefined}
          // onClick={handleClick}
        />
        <div 
          className="flex flex-col cursor-pointer"
          id="header-menu"
          aria-controls={open ? "header-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <p>Admin</p>
        
        </div>
        <Menu
          id="header-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              TokenService.removeUser()
              navigate("/")
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
