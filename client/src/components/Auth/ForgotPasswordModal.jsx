import React, { useEffect, useState } from "react";
import { UserServices } from "../../Services/UserServices";
import { State } from "../../Context/stateProvider";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModal = (props) => {
  const navigate = useNavigate();
  const {setToast} = State();
  const[loading,setLoading] = useState();
  const [userId,setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [error,setError] = useState(false);


  const onSubmit =async()=>{
    setLoading(true);
    let result = await UserServices.forgetPassword({email:email});
    console.log(result);
    setToast({...result,display:true});
    if(result?.result){
      setUserId(result.result._id)
    }
    setLoading(false);
  }

  return (
    <div
      data-modal-target="popup-modal"
      id="popup-modal"
      tabIndex="-1"
      className={`fixed  top-0 left-0 right-0 z-5 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        props.show ? "" : "hidden"
      } flex justify-center items-center backdrop-blur-sm`}
    >
      <div className="relative w-full max-w-md max-h-full ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={() => {
              props.closeModal();
            }}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-4 w-[27px] h-[27px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
            </svg>
            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Forgot Password?
            </h3>
            <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              You will recieve otp on your registered email address.{" "}
            </p>
            <div className="relative mb-2 w-full flex flex-col justify-center items-center">
              <input
                type="string"
                name="email"
                id="email"
                className="text-center autoCompleteOff text-sm block sm:w-2/4 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Email address"
                aria-autocomplete="none"
                autoComplete="new-password"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
              <div className="relative text-sm text-red-500 w-full inline-flex justify-center items-center">
              {error ? "Email is required" : ""}
              </div>
            </div>
            <div
              onClick={() => {
                email.length>0?onSubmit():setError(true);
              }}
              className="text-white cursor-pointer bg-green-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center m-1"
            >
              Submit {loading?"...":""}
            </div>
            <div
              onClick={() => {navigate(`/reset-password/${userId}`)}}
              className="text-gray-500 cursor-pointer inline-flex bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Verify OTP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
