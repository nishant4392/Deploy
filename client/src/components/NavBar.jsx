import React from "react";
import FlowbiteSidebar from "./MobileNavbar";
import Home from "./DesktopNavbar";

const NavBar = () => {
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
