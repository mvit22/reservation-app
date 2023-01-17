import { db } from '@src/app/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useGetCurrentUser } from '../queries';

export const useMakeReservation = (successCallback: () => void) => {
  const { user } = useGetCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const mutate = (reservationData: {
    name?: string;
    id?: string;
    people_number?: number;
  }) => {
    if (user && reservationData.id) {
      setIsLoading(true);
      const reservationRef = doc(db, 'reservations', reservationData.id);
      const userRef = doc(db, 'users', user.uid);

      Promise.all([
        updateDoc(reservationRef, {
          people_list: arrayUnion(user.displayName ?? 'Anonymous user'),
        }),
        updateDoc(userRef, {
          reservations: arrayUnion(reservationData),
        }),
      ])
        .then(() => {
          successCallback();
        })
        .catch(error => {
          Alert.alert(error.code, error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      Alert.alert('Error', 'Bad IDs');
    }
  };

  return { mutate, isLoading };
};
