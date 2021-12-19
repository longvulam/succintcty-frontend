import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../appConfig";
import { corsConfig } from "./user.api";

const api = "api/v1";

export const fetchSummary = async (payload: any, endpoint: string, config: AxiosRequestConfig) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/${endpoint}`, payload, corsConfig);
    return data;
  } catch (error) {
    return;
  }
}
