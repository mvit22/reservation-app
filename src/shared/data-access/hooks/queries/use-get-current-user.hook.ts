import { auth } from '@src/app/firebase';
import { User } from 'firebase/auth/react-native';
import { useEffect, useState, useCallback } from 'react';

export const useGetCurrentUser = () => {
  // return useQuery(['currentUser', id], () => ApiService.getCurrentUser(id));
  const [userData, setUserData] = useState<User | null>(null);

  const fetchData = useCallback(() => {
    setUserData(auth.currentUser);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { user: userData, refetch: fetchData };
};
