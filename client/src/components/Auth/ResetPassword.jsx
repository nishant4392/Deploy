import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CheckSign from "../../TailwindComponents/CheckSign";
import { UserServices } from "../../Services/UserServices";
import { State } from "../../Context/stateProvider";

const ResetPassword = () => {
  const { setToast} = State();
  const [loading, setLoading] = useState(false);
  const {userId} = useParams();
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

  const onSubmit = async (data) => {
    setLoading(true);
    let result = await UserServices.resetPassword({userId,...data});
    setToast({...result,display:true});
    setLoading(false);
    if(result?.result){
        navigate("/");
    }

  };

  const removeAutoComplete = () => {
    const inputs = document.getElementsByClassName("autoCompleteOff");
    for (let i of inputs) {
      i.removeAttribute("autoComplete");
    }
  };

  const passwordValidation = (value) => {
    const lengthRegex = /^.{8,20}$/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const lowercaseRegex = /^(?=.*[a-z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[@#$%^&+=()!])/;

    if (!uppercaseRegex.test(value)) {
      setUpperCaseCheck(false);
    } else {
      setUpperCaseCheck(true);
    }
    if (!lengthRegex.test(value)) {
      setLengthCheck(() => false);
    } else {
      setLengthCheck(true);
    }
    if (!lowercaseRegex.test(value)) {
      setLowerCaseCheck(() => false);
    } else {
      setLowerCaseCheck(true);
    }
    if (!digitRegex.test(value)) {
      setDigitCheck(() => false);
    } else {
      setDigitCheck(true);
    }
    if (!specialCharRegex.test(value)) {
      setSpecialCharCheck(() => false);
    } else {
      setSpecialCharCheck(true);
    }
  };

  useEffect(() => {
    removeAutoComplete();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center m-0 p-2">
      <div className="dark w-full sm:w-7/12 p-6 border-blue-800 border-2 rounded-md h-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          method="post"
          autoComplete="off"
        >
          <div className="relative z-0 w-full mb-6 group">
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "Otp is required."
              }}
              render={({ field, fieldState }) => (
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  value={formFields?.otp || ""}
                  className=" autoCompleteOff text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  aria-autocomplete="none"
                  autoComplete="new-password"
                  onChange={(e) => {
                    onInputChange(e);
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            <label
              htmlFor="otp"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              One time Password
            </label>
            {getFormErrorMessage("otp")}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "Password is required.",
                validate: (value) => {
                  const passwordRegex =
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,20}$/;
                  if (passwordRegex.test(value)) {
                    return true;
                  } else {
                    return "Please choose a strong password.";
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
                  value={formFields?.newPassword || ""}
                  className=" autoCompleteOff text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  aria-autocomplete="none"
                  autoComplete="new-password"
                  onChange={(e) => {
                    passwordValidation(e.target.value);
                    onInputChange(e);
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {getFormErrorMessage("password")}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required.",
                validate: (value) => {
                  if (formFields.newPassword === value) {
                    return true;
                  } else {
                    return "Passwords do not match.";
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formFields?.confirmPassword || ""}
                  className=" autoCompleteOff text-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  aria-autocomplete="none"
                  autoComplete="new-password"
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
            <button
              type="submit"
              className="relative w-7/12 font-electric tracking-widest inline-flex items-center justify-center p-0.5 mb-2 mr-2 mt-2 overflow-hidden text-lg font-medium text-gray-900 rounded-md background bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-500 "
            >
              <span className="relative w-full px-7 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded text-md text-center">
                Reset Password {loading ? "..." : ""}
              </span>
            </button>
          </div>
        </form>
        <button className="text-blue-500" onClick={() => navigate("/")}>Login</button>
      </div>
    </div>
  );
};
export default ResetPassword;
