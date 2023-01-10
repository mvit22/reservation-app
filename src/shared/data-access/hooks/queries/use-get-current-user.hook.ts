import { ApiService } from '@src/shared/services/api';
import { useQuery } from 'react-query';

export const useGetCurrentUser = (id: string) => {
  return useQuery(['currentUser', id], () => ApiService.getCurrentUser(id));
};
