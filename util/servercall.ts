import axios, { AxiosRequestConfig } from 'axios';
import { UserDataSchema } from '../type/user';

const TOKENSTR = 'token';

export const getBearerToken = (token: string | null) => {
  return 'Bearer ' + token;
};

export const getAxiosHeader = (bearerToken: string) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: bearerToken,
    },
  };
};

const getConfig = (config?: any) => {
  const token =
    typeof window !== 'undefined'
      ? getBearerToken(localStorage.getItem(TOKENSTR))
      : '';

  const headerConfig = getAxiosHeader(token);
  return config == undefined ? headerConfig : { ...headerConfig, ...config };
};

export const setTokenLocalStorage = (token: string) => {
  localStorage.setItem(TOKENSTR, token);
};

export const get = (url: string, config?: any) => {
  const axiosConfig = getConfig(config);
  const baseURL = process.env.BaseURL;
  return axios.get(baseURL + url, axiosConfig);
};

export const getUserData = (url: string, config?: any): Promise<UserDataSchema> => {
  const axiosConfig = getConfig(config);
  const baseURL = process.env.BaseURL;
  return axios.get(baseURL + url, axiosConfig);
};

export const post = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) => {
  const baseURL = process.env.BaseURL;
  const axiosConfig = getConfig(config);
  console.log(baseURL+url)
  console.log(data)
  return axios.post(baseURL + url, data, axiosConfig);
};
