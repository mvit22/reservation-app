import { updateProfile } from 'firebase/auth';
import { User } from 'firebase/auth/react-native';
import { useState } from 'react';

export interface UserData {
  name?: string;
}

export const useUpdateUser = (
  user: User,
  userData: UserData,
  successCallback: () => void,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = () => {
    setIsLoading(true);
    updateProfile(user, {
      displayName: userData.name,
    }).then(() => {
      successCallback();
      setIsLoading(false);
    });
  };

  return { mutate, isLoading };
};
