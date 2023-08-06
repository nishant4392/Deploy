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
        let response = await axios.post(
            `${process.env.REACT_APP_API_PATH}/api/user/register`,
            params
        );
        response = handleResponse(response);
        return response;
    },
};
