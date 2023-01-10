import { ApiService } from '@src/shared/services/api';
import { User } from '@src/shared/services/api/types';
import { useMutation } from 'react-query';

export const useUpdateUser = (
  userId: string,
  userData: User,
  successCallback: () => void,
) => {
  return useMutation<User>(
    () => {
      return ApiService.updateUserInfo(userId, userData);
    },
    {
      onSuccess: successCallback,
    },
  );
};
