import { db } from '@src/app/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export const useSetRating = (successCallback?: () => void) => {
  const mutate = (reservationId: string, type: string) => {
    const reservationRef = doc(db, 'reservations', reservationId);
    updateDoc(reservationRef, {
      rating: {
        [type]: increment(1),
      },
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
