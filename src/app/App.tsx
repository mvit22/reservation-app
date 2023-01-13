import { Navigation } from '@src/routes';
import { User } from 'firebase/auth/react-native';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { auth } from './firebase';

const queryClient = new QueryClient();
export const UserContext = React.createContext<{
  user?: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}>({});

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  // const user = auth.currentUser?.uid;
  // console.log(user);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <Navigation isSignedIn={!!user} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
