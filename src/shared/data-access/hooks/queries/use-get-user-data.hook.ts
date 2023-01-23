import { db } from '@src/app/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface UserData {
  reservations: {
    name: string;
    id: string;
    people_number: number;
    rating: {
      plus: number;
      minus: number;
    };
  }[];
}

export const useGetUserData = (id: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = useCallback((id: string) => {
    setIsLoading(true);
    const docRef = doc(db, `users/${id}`);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
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

  return { userData, isLoading, refetch: () => fetch(id) };
};
