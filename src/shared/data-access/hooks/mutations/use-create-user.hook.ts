import { ApiService } from '@src/shared/services/api';
import { User } from '@src/shared/services/api/types';
import { useMutation } from 'react-query';

export const useCreateUser = (
  username: string,
  password: string,
  successCallback?: (id: string) => void,
) => {
  return useMutation<User>(
    () => {
      return ApiService.createUser(username, password);
    },
    {
      onSuccess: data => {
        successCallback!(data.id);
      },
    },
  );
};
