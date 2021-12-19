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

export const requestLogout = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/${api}/users/logout`);
    return data;
  } catch (error) {
    return;
  }
}

export const requestCurrentUser = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/${api}/users/current_users`);
    return data;
  } catch (error) {
    return;
  }
}
