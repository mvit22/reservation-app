import { auth, db } from '@src/app/firebase';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth/react-native';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export const AuthService = {
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    successCallback: (user: User) => void,
  ) => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        userCredential => {
          const { user } = userCredential;
          const usersRef = collection(db, 'users');
          setDoc(doc(usersRef, user.uid), {
            reservations: [],
          }).then(() => console.log('Success sign up'));
          successCallback(user);
        },
      );
    } catch (error) {
      const errorCode = (error as FirebaseError).code;
      const errorMessage = (error as FirebaseError).message;
      Alert.alert(errorCode, errorMessage);
    }
  },
  signInWithEmailAndPassword: async (
    email: string,
    password: string,
    successCallback: (user: User) => void,
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      successCallback(user);
    } catch (error) {
      const errorCode = (error as FirebaseError).code;
      const errorMessage = (error as FirebaseError).message;
      Alert.alert(errorCode, errorMessage);
    }
  },
  signOut: (successCallback: () => void) => {
    signOut(auth)
      .then(() => {
        successCallback();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
      });
  },
};
