import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@/config/config';

const baseURL = API_URL || 'http://localhost:3007';

const api: AxiosInstance = axios.create({
	baseURL,
	withCredentials: false
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const headers: any = config.headers ?? {};
		if (typeof headers.set === 'function') {
			headers.set('Accept', 'application/json');
			headers.set('Content-Type', 'application/json');
		} else {
			config.headers = {
				...headers,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			} as any;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

export default api;


