import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { UserServices } from "../Services/UserServices";
import { State } from "../Context/stateProvider";


const Login = () => {
  const {setToast} = State();
  const [formFields, setFormFields] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="text-red-600">{errors[name].message}</small>
    ) : (
      ""
    );
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmit =async (data) => {
    setLoading(true);
    let result =await UserServices.login(data);
    setToast({...result,display:true});
    setLoading(false);
  };

  const removeAutoComplete=()=>{
    const inputs = document.getElementsByClassName("autoCompleteOff");
    for(let i of inputs){
      i.removeAttribute("autoComplete")
    }
  }

  useEffect(()=>{
    removeAutoComplete();
    console.log(process.env.REACT_APP_API_PATH);
  },[])

  return (
    <div className="min-h-screen flex justify-center items-center p-0">
    <div className="dark w-full sm:w-7/12 p-6 border-blue-800 border-2  rounded-md h-2/6">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="post" autoComplete="off">
        <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="email"
            control={control}
            defaultValue={formFields?formFields.email?formFields.email:"":""}
            rules={{
              required: "Email is required.",
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Please enter a valid email",
              },
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="email"
                id="email"
                value={formFields?.email || ""}
                className="autoCompleteOff text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="new-password"
                aria-autocomplete="none"
                onChange={(e) => {
                  onInputChange(e);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {getFormErrorMessage("email")}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="password"
            control={control}
            defaultValue={formFields?formFields.email?formFields.email:"":""}
            rules={{
              required: "Password is required.",
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="password"
                id="password"
                value={formFields?.password || ""}
                className="autoCompleteOff text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="new-password"
                aria-autocomplete="none"
                onChange={(e) => {
                  onInputChange(e);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {getFormErrorMessage("password")}
        </div>
        <div className="relative z-0 w-full mb-6 group flex justify-center">
          <button type="submit" className="relative w-7/12 font-electric tracking-widest inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-lg font-medium text-gray-900 rounded-md background bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-500 ">
            <span className="relative w-full px-7 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded text-md text-center">
              Login {loading?"...":""}
            </span>
          </button>
        </div>
        <button className="mx-8" onClick={()=>navigate("/register")}>register</button>
        <button onClick={()=>navigate("/navbar")}>Navbar Trial</button>
      </form>
    </div>
    </div>

  );
};

export default Login;
