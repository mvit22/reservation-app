import { ApiService } from '@src/shared/services/api';
import { useQuery } from 'react-query';

export const useGetUsers = () => {
  return useQuery('users', ApiService.getUsers);
};
