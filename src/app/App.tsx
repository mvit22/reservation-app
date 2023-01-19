/* eslint-disable react-native/no-inline-styles */
import { Navigation } from '@src/routes';
import { User } from 'firebase/auth/react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider, QueryClient } from 'react-query';
import { auth } from './firebase';

const queryClient = new QueryClient();
export const UserContext = React.createContext<{
  user?: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}>({});

const App = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navigation isSignedIn={!!user} />
        </UserContext.Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
