import React from "react";
import FlowbiteSidebar from "./MobileNavbar";
import Home from "./DesktopNavbar";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

const NavBar = () => {
  useEffect(()=>{
    initFlowbite();
  },[]);
  
  return (
    <div className="w-full">
    <div className="hidden md:block"> 
        <Home />
      </div>
      <div className="block md:hidden">
        <FlowbiteSidebar />
      </div>
    </div>
  );
};

export default NavBar;
