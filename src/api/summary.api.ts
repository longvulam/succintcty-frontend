import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../appConfig";

const api = "api/v1";

export const fetchSummary = async (payload: any, endpoint: string, config: AxiosRequestConfig) => {
  try {
    const { data } = await axios.post(`${baseUrl}/${api}/${endpoint}`, payload, config);
    return data;
  } catch (error) {
    return;
  }
}
