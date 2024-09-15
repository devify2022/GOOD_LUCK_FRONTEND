// apiClient.ts
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {activeURL} from './constants';
import {store} from '../redux';

const axiosConfig: AxiosRequestConfig = {
  baseURL: activeURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosAuthConfig: AxiosRequestConfig = {
  baseURL: activeURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseClient: AxiosInstance = axios.create(axiosConfig);

export const authClient: AxiosInstance = axios.create(axiosAuthConfig);

baseClient.interceptors.request.use(
  config => {
    const state = store.getState();
    const accessToken = state.auth.userDetails?.accessToken ?? '';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default {baseClient, authClient};
