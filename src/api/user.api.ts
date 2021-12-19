import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../appConfig";

const api = "api/v1";
const corsConfig = {withCredentials: true, crossorigin: true};

export const requestLogin = async (payload: { email: string, password: string }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/users/login`, payload, corsConfig);
    return data;
  } catch (error) {
    return;
  }
}

export const requestLogout = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/${api}/users/logout`, corsConfig);
    return data;
  } catch (error) {
    return;
  }
}

export const requestCurrentUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/${api}/users/current_user`, corsConfig);
    return res;
  } catch (error) {
    return;
  }
}

export const requestRegistration = async (payload: any) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/users/register`, payload, corsConfig);
    return data;
  } catch (error) {
    return;
  }
}
