import { User } from 'firebase/auth';
import { updatePassword } from 'firebase/auth/react-native';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useUpdateUserPassword = (
  user: User,
  password: string,
  successCallback: () => void,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = () => {
    setIsLoading(true);
    updatePassword(user, password)
      .then(() => {
        successCallback();
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { mutate, isLoading };
};
