import React, { useState } from "react";

const DesktopNavbar = () => {
  const [change, setChange] = useState(false);

  return (
    <div className="border-2 border-blue-500 flex items-center w-full h-16 overflow-hidden">
      <div className="border-2 border-blue-500 flex items-center w-72 h-full justify-center">
        <button>click here</button>
      </div>
      <div className="relative border-2 border-blue-500 flex items-center w-full h-full justify-center">
        <div
          className={`absolute ${
            change ? "left-full" : "left-0"
          } text-red-500 w-full h-14 flex justify-evenly items-center  transition-all duration-500`}
        >
          <div className="relative flex justify-center cursor-pointer items-center">
            Parent 1
          </div>
          <div
            className={`relative ${
              change ? "-left-full bottom-4 text-sm" : "left-0 bottom-0"
            } flex justify-center items-center transition-all duration-500 cursor-pointer`}
            onClick={() => {
              setChange(!change);
              console.log(change);
            }}
          >
            {change ? " - " : " + "}Parent 2
          </div>
          <div className="relative flex justify-center items-center cursor-pointer">
            Parent 3
          </div>
          <div className="relative flex justify-center items-center cursor-pointer">
            Parent 4
          </div>
        </div>
        <div
          className={`absolute ${
            change ? "top-6 left-0" : "top-24 left-24"
          } text-blue-500 border-red-500 flex items-center w-full h-12 transition-all duration-500 p-0 justify-evenly`}
        >
          <div className="relative flex items-center m-0 cursor-pointer">
            Child 2-1
          </div>
          <div className="relative flex items-center m-0 cursor-pointer">
            Child 2-2
          </div>
          <div className="relative flex items-center m-0 cursor-pointer">
            Child 2-3
          </div>
          <div className="relative flex items-center m-0 cursor-pointer">
            Child 2-4
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
