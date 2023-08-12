import React, { useEffect, useState } from "react";
import { State } from "../../Context/stateProvider";
import { UserServices } from "../../Services/UserServices";

const OtpModal = (props) => {
  const { user,setToast } = State();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(null);
  const [verifyLoading,setVerifyLoading] = useState(false);
  const [resendOtpLoading,setResetOtpLoading] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  const verify =async ()=>{
    setVerifyLoading(true);
    let result = await UserServices.verifyMail({userId:user._id,otp});
    setVerifyLoading(false)
    setToast({...result,display:true});
    if(result?.result){
        setShow(false);
        props.closeModal();
    }
  }

  const resendOtp = async()=>{
    setResetOtpLoading(true);
    let result = await UserServices.sendOtp({userId:user._id});
    setResetOtpLoading(false);
    setToast({...result,display:true});
  }

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`fixed  top-0 left-0 right-0 z-5 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          show ? "" : "hidden"
        } flex justify-center items-center backdrop-blur-sm`}
      >
        <div className="relative w-full max-w-md max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => {setShow(false);props.closeModal()}}
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
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                Please verify your Email.
              </h3>
              <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                We have sent otp to your registered email address.{" "}
              </p>
              <div className="relative mb-2 w-full flex flex-col justify-center items-center">
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  className="text-center autoCompleteOff text-sm block sm:w-2/4 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Enter your otp"
                  aria-autocomplete="none"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setError(false);
                    setOtp(e.target.value);
                  }}
                />
                <div className="relative text-sm text-red-500 w-full inline-flex justify-center items-center">
                  {error ? "Otp is required" : ""}
                </div>
              </div>
              <div
                onClick={() => {
                  otp.length > 0 ? verify(): setError(true);
                }}
                className="text-white bg-green-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center m-1"
              >
                Submit {verifyLoading?"...":""}
              </div>
              <div
                onClick={() => resendOtp()}
                className="text-gray-500 inline-flex bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Resend OTP {resendOtpLoading?"...":""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpModal;
