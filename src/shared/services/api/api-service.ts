import axios, { AxiosInstance } from 'axios';
import { User } from './types';

const baseURL = 'https://63ac483134c46cd7ae7d0856.mockapi.io/';

const instance: AxiosInstance = axios.create({
  baseURL,
});

export const ApiService = {
  getCurrentUser: async (id: string) => {
    const { data } = await instance.get<User>(`/users/${id}/`);
    return data;
  },
  getUsers: async () => {
    const { data } = await instance.get<User[]>('/users/');
    return data;
  },
  createUser: async (username: string, password: string) => {
    const { data } = await instance.post<User>('/users/', {
      username,
      password,
    });
    return data;
  },
  updateUserInfo: async (id: string, userData: User) => {
    const { data } = await instance.put<User>(`/users/${id}/`, userData);
    return data;
  },
};
