import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
  const [formFields, setFormFields] = useState();
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
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

  return (
    <div className="dark w-7/12 border-2 p-6">
      <form onSubmit={handleSubmit(onSubmit)} action="#" method="post">
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
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-medium text-gray-900 rounded-md background bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-500 ">
          <span className="relative px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded text-md">
            Login
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;
//button group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200       dark:hover:text-gray-900
//span  group-hover:bg-opacity-0
