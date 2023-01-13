import { UserContext } from '@src/app/App';
import { auth } from '@src/app/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { useContext } from 'react';
import { Alert } from 'react-native';

export const useSignOut = () => {
  const { setUser } = useContext(UserContext);
  const signOut = () => {
    firebaseSignOut(auth)
      .then(() => {
        setUser!(null);
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      });
  };

  return { signOut };
};
