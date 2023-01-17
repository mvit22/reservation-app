import { db } from '@src/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface ReservationData {
  name: string;
  people_list: string[];
}

export const useGetReservationData = (id: string) => {
  const [reservationData, setReservationData] =
    useState<ReservationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback((id: string) => {
    setIsLoading(true);
    const docRef = doc(db, `reservations/${id}`);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setReservationData(docSnap.data() as ReservationData);
        } else {
          console.log('No such document!');
        }
      })
      .catch(error => {
        Alert.alert(error.code, error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(id);
  }, [fetch, id]);

  return {
    reservationData,
    isLoading,
    refetch: () => fetch(id),
  };
};
