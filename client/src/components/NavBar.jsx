import React, { useState } from "react";
import MobileNavbar from "../TailwindComponents/MobileNavbar";
import DesktopNavbar from "../TailwindComponents/DesktopNavbar";
import { useEffect } from "react";

const NavBar = () => {

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default NavBar;
