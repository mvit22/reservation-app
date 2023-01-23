import { db } from '@src/app/firebase';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { useGetCurrentUser } from '../queries';

export const useRemoveReservation = (successCallback?: () => void) => {
  const { user } = useGetCurrentUser();
  const mutate = (reservation: {
    name: string;
    id: string;
    people_number: number;
  }) => {
    const userRef = doc(db, 'users', user?.uid!);
    updateDoc(userRef, {
      reservations: arrayRemove(reservation),
    })
      .then(() => {
        successCallback && successCallback();
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      });
  };
  return { mutate };
};
