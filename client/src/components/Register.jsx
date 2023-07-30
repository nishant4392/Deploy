import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { Controller, useForm } from "react-hook-form";
import CheckSign from "../TailwindComponents/CheckSign";

const Register = () => {
  const [formFields, setFormFields] = useState();
  const navigate = useNavigate();
  const [upperCaseCheck, setUpperCaseCheck] = useState(false);
  const [lowerCaseCheck, setLowerCaseCheck] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [digitCheck, setDigitCheck] = useState(false);
  const [specialCharCheck, setSpecialCharCheck] = useState(false);

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

  const onSubmit = (data) => {
    console.log(data);
  };

  const userNameValidation = (value)=>{
    //api call
    let userName = "123"
    if(value === userName){
      return `User name ${value} is not availaible`
    }
    else{
      return true
    }
  }

  const emailValidation=(value)=>{
    // api call
    let userEmail = "Super@gmail.com"
    if(value === userEmail){
      return "This email is already registered with us"
    }
    else{
      return true
    }
  }

  const passwordValidation = (value) => {
    const lengthRegex = /^.{8,20}$/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[@#$%^&+=()!])/;

    if (!uppercaseRegex.test(value)) {
      setUpperCaseCheck(false)
    } else {
      setUpperCaseCheck(true);
    }
    if (!lengthRegex.test(value)) {
      setLengthCheck(()=>false);
    } else {
      setLengthCheck(true);
    }
    if (!lowercaseRegex.test(value)) {
      setLowerCaseCheck(()=>false);
    } else {
      setLowerCaseCheck(true);
    }
    if (!digitRegex.test(value)) {
      setDigitCheck(()=>false);
    } else {
      setDigitCheck(true);
    }
    if (!specialCharRegex.test(value)) {
      setSpecialCharCheck(()=>false);
    } else {
      setSpecialCharCheck(true);
    }
  };


  return (
    <div className="dark w-full sm:w-7/12 p-6 border-blue-800 border-2  rounded-md h-2/6">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="post">
        <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required.",
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="name"
                id="name"
                value={formFields?.name || ""}
                className="text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                aria-autocomplete="none"
                onChange={(e) => {
                  onInputChange(e);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
          {getFormErrorMessage("name")}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="userName"
            control={control}
            rules={{
              required: "User name is required.",
              validate:{userNameValidation}
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="userName"
                id="userName"
                value={formFields?.userName || ""}
                className="text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                aria-autocomplete="none"
                onChange={(e) => {
                  onInputChange(e);
                  field.onChange(e.target.value.replace(/\s/g, ""));
                }}
              />
            )}
          />
          <label
            htmlFor="userName"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User name
          </label>
          {getFormErrorMessage("userName")}
        </div>
      <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
              pattern: {
                value:
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Please enter a valid email",
              },
              validate:{emailValidation}
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="email"
                id="email"
                value={formFields?.email || ""}
                className="text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
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
            rules={{
              required: "Password is required.",
              validate:(value)=>{
                const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,20}$/;
                if(passwordRegex.test(value)){
                  return true
                }
                else{
                  return "Please choose a strong password."
                }
              }
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="password"
                id="password"
                value={formFields?.password || ""}
                className="text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                aria-autocomplete="none"
                onChange={(e) => {
                  passwordValidation(e.target.value);
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
        <div className="relative z-0 w-full mb-6 group">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm password is required.",
              validate:(value)=>{
                if(formFields.password === value ){
                  return true
                }
                else{
                  return "Passwords do not match."
                }
              }
            }}
            render={({ field, fieldState }) => (
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value={formFields?.confirmPassword || ""}
                className="text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                aria-autocomplete="none"
                onChange={(e) => {
                  onInputChange(e);
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {getFormErrorMessage("confirmPassword")}
        </div>
        <div
          className={
            lengthCheck
              ? "relative flex flex-row items-center z-0 w-full text-green-500 "
              : "relative flex flex-row items-center z-0 w-full text-red-500"
          }
        >
          <CheckSign check={lengthCheck} />
          Length must be between 8 - 20.
        </div>
        <div
          className={
            upperCaseCheck
              ? "relative flex flex-row items-center z-0 w-full text-green-500"
              : "relative flex flex-row items-center z-0 w-full text-red-500"
          }
        >
          <CheckSign check={upperCaseCheck} />
          Must contain an uppercase letter.
        </div>
        <div
          className={
            lowerCaseCheck
              ? "relative flex flex-row items-center z-0 w-full text-green-500"
              : "relative flex flex-row items-center z-0 w-full text-red-500"
          }
        >
          <CheckSign check={lowerCaseCheck} />
          Must contain an lowercase letter.
        </div>
        <div
          className={
            digitCheck
              ? "relative flex flex-row items-center z-0 w-full text-green-500"
              : "relative flex flex-row items-center z-0 w-full text-red-500"
          }
        >
          <CheckSign check={digitCheck} />
          Must contain an digit.
        </div>
        <div
          className={
            specialCharCheck
              ? "relative flex flex-row items-center z-0 w-full text-green-500"
              : "relative flex flex-row items-center z-0 w-full text-red-500"
          }
        >
          <CheckSign check={specialCharCheck} />
          Must contain a special character.
        </div>
        <div className="relative z-0 w-full mb-6 group flex justify-center">
          <button type="submit" className="relative w-7/12 font-electric tracking-widest inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-lg font-medium text-gray-900 rounded-md background bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-500 ">
            <span className="relative w-full px-7 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded text-md text-center">
              Register
            </span>
          </button>
        </div>
      </form>
      <button onClick={()=>navigate("/")}>login</button>
    </div>
  );
};
export default Register;
