import axios from "axios";
import { handleResponse } from "./Responses";

export const UserServices = {
    login: async (params) => {
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/login`,
            params
        );
        response = handleResponse(response);
        return response;
    },
    register: async (params) => {
        console.log(process.env.REACT_APP_API_PATH);
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/register`,
            params
        );
        response = handleResponse(response);
        return response;
    },
    sendOtp: async (params) => {
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/send-mail`,
            params
        );
        response = handleResponse(response);
        return response;
    },
    verifyMail: async (params) => {
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/verify-mail`,
            params
        );
        response = handleResponse(response);
        return response;
    },
    forgetPassword: async (params) => {
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/forget-password`,
            params
        );
        response = handleResponse(response);
        return response;
    },
    resetPassword: async (params) => {
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/reset-password`,
            params
        );
        response = handleResponse(response);
        return response;
    },
};
