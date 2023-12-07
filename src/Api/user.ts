import axios, { AxiosResponse } from "axios";
import { AUTH_API_URL } from "@/Store/constants";

export const getSMSCode = async (to: string): Promise<string> => {
    return axios.get(`${AUTH_API_URL}/sms/send/${to}`);
  };


export const verifySMSCode = (to: string, code: string, name: string) => {
  return axios.get(`${AUTH_API_URL}/sms/verify/${to}/${code}/${name}`);
};