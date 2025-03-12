import { AxiosRequestConfig } from "axios";
import Axios from "./axios.service";

const deleteReq = async (url: string): Promise<any> => {
    try {
        return await Axios.delete(url);
    } catch (error) {
        throw error;
    }
};

const postReq = async (url: string, data: any, bearer: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `${bearer}`,
        },
    };

    try {
        return await Axios.post(url, data, config);
    } catch (error) {
        throw error;
    }
};

const getReq = async (url: string, bearer: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `${bearer}`,
        },
    };

    try {
        return await Axios.get(url, config);
    } catch (error) {
        throw error;
    }
};

export const reqService = {
    deleteReq,
    postReq,
    getReq,
};
