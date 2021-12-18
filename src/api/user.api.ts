import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../appConfig";

const api = "api/v1";

export const requestLogin = async (payload: {email: string, password: string}) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/users/login`, payload);
    return data;
  } catch (error) {
    return;
  }
}

export const requestRegistration = async (payload: any) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/users/register`, payload);
    return data;
  } catch (error) {
    return;
  }
}
