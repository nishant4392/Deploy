import React from "react";
import { createContext, useContext,useState } from "react";

const stateContext = createContext();

export const State = () => {
  return useContext(stateContext);
};

const StateProvider = ({ children }) => {
  const [user, setUser] = useState("nishant");

  return <stateContext.Provider value={{user,setUser}}x>{children}</stateContext.Provider>;
};

export default StateProvider;
