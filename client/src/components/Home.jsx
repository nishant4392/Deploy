import React, { useState } from "react";

const Home = () => {
  const [change, setChange] = useState(false);
  return (
    <div className="border-2 border-blue-500 flex items-center w-full h-20 overflow-hidden">
      <div className="border-2 border-blue-500 flex items-center w-72 h-full justify-center">
        <button
          onClick={() => {
            setChange(!change);
            console.log(change);
          }}
        >
          click here
        </button>
      </div>
      <div className="relative border-2 border-blue-500 flex items-center w-full h-full justify-center">
        <div
          className={`absolute ${
            change ? "bottom-52" : "bottom-2"
          } text-red-500 text-lg w-full h-14 flex justify-evenly items-center  transition-all duration-500`}
        >
          <div className="relative flex justify-center items-center">Parent 1</div>
          <div
            className={`relative ${
              change ? "top-44 left-20 text-sm" : "top-0 left-0"
            } flex justify-center items-center transition-all duration-500`}
          >
            {change?" - ":" + "}Parent 2
          </div>
          <div className="relative flex justify-center items-center">Parent 3</div>
          <div className="relative flex justify-center items-center">Parent 4</div>
        </div>
        <div
          className={`absolute ${
            change ? "top-6 left-0" : "top-24 left-24"
          } text-blue-500 border-red-500 flex items-center w-full h-12 transition-all duration-500 p-0 text-lg justify-evenly`}
        >
          <div className="relative flex items-center m-0">Child 2-1</div>
          <div className="relative flex items-center m-0">Child 2-2</div>
          <div className="relative flex items-center m-0">Child 2-3</div>
          <div className="relative flex items-center m-0">Child 2-4</div>
          <div className="relative flex items-center m-0">Child 2-5</div>
          <div className="relative flex items-center m-0">Child 2-6</div>
          <div className="relative flex items-center m-0">Child 2-7</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className={`absolute ${change?"bottom-52":"bottom-2"} border-2 border-green-500 w-full h-14 flex justify-center items-center gap-20 transition-all duration-500`}>
<div className="relative border-2 border-blue-500 flex justify-center items-center">
  first
</div>
<div className={`relative ${change?"top-44 left-20 text-sm":"top-0 left-0"} border-2 border-blue-500 flex justify-center items-center transition-all duration-500`}>
  firstx
</div>
<div className="relative border-2 border-blue-500 flex justify-center items-center">
  first
</div>
<div className="relative border-2 border-blue-500 flex justify-center items-center">
  first
</div>
</div>
<div
className={`absolute ${
  change ? "top-6 left-0" : "top-24 left-24"
} border-2 border-red-500 flex items-center w-full h-12 justify-center transition-all duration-500 gap-20 p-0`}
>
<div className="relative border-2 border-blue-500 flex items-center m-0 ">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
<div className="relative border-2 border-blue-500 flex items-center m-0">
  item1
</div>
</div> */
}
