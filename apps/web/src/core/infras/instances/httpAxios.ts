import axios from 'axios';
import { Http } from '@core/domain/repositories/httpAxios';

const headers = {
  'Content-Type': 'application/json',
};

const endpoint = 'https://yemusic-api.vc-team.com/api';
export const currentAxios = axios.create({
  headers,
});

export const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(endpoint + path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.post(
      endpoint + path,
      { ...params },
      { ...config, headers }
    );
    return response.data as T;
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.put(
      endpoint + path,
      { ...params },
      { ...config, headers }
    );
    return response.data as T;
  },
  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await axios.delete(endpoint + path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
};
