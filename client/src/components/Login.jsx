import React from "react";
import { State } from "../Context/stateProvider";

const Login = () => {

  const {user} = State();

  return (
    <div className="">
      <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-800 to-purple-500 group-hover:from-blue-800 group-hover:to-purple-500 hover:text-white dark:text-white ">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-3xl font-electric ">
          {user}
        </span>
      </button>
    </div>
  );
};

export default Login;
