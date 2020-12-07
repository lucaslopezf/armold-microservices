import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import HttpAgent, { HttpsAgent } from 'agentkeepalive';

const handleResponse = <T>(response: AxiosResponse): T => {
  return response?.data;
};

const handleError = (error: AxiosError): Promise<void> => {
  return Promise.reject(error);
};

const initializeResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(handleResponse, handleError);
};

const httpAgent = new HttpAgent({
  freeSocketTimeout: 15000,
  keepAlive: true,
});

const httpsAgent = new HttpsAgent({
  freeSocketTimeout: 15000,
  keepAlive: true,
});

export const httpClient = (url: string, handleResponse = true, timeout = 30000): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout,
    httpAgent,
    httpsAgent,
  });
  if (handleResponse) initializeResponseInterceptor(instance);
  return instance;
};
