import React from "react";
import { createContext, useContext,useState } from "react";

const stateContext = createContext();

export const State = () => {
  return useContext(stateContext);
};

const StateProvider = ({ children }) => {
  const [user, setUser] = useState({
    name:"Guest User",
    email:"guest@gmail.com",
    userName:"guest101",
    profilePic:"https://th.bing.com/th/id/R.a7ce18dec9affaf5ab51395ac967ae78?rik=KeA%2biXOYlZKFbg&riu=http%3a%2f%2fwww.agronomia.uanl.mx%2fwp-content%2fuploads%2f2016%2f11%2fno-avatar.png&ehk=Le2Uzebok%2bjRm66bAmlSxLPWb82km%2fNPwXQE4uvb5X0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
  });

  return <stateContext.Provider value={{user,setUser}}x>{children}</stateContext.Provider>;
};

export default StateProvider;
