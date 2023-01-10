import { Navigation } from '@src/routes';
import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
export const UserContext = React.createContext<{
  userId?: string | null;
  setUserId?: React.Dispatch<React.SetStateAction<string | null>>;
}>({});

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ userId, setUserId }}>
        <Navigation isSignedIn={!!userId} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
