import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChatsScreen } from '@src/screens/chat';
import { LoginScreen, SignupScreen } from '@src/screens/login';
import { ProfileScreen } from '@src/screens/profile';
import { ReservationScreen } from '@src/screens/reservation';
import { tabIcon } from './lib/routes.helper';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export type NavigatorParamList = {
  Profile: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Reservation: undefined;
  Chat: undefined;
};

const Tab = createBottomTabNavigator<NavigatorParamList>();

interface NavigationProps {
  isSignedIn: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isSignedIn }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isSignedIn ? 'Profile' : 'SignIn'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = tabIcon(route.name, focused);
            return iconName ? (
              <Ionicons name={iconName} size={size} color={color} />
            ) : null;
          },
        })}>
        {isSignedIn ? (
          <>
            <Tab.Screen
              name="Profile"
              component={gestureHandlerRootHOC(ProfileScreen)}
              options={{ title: 'Profile' }}
            />
            <Tab.Screen
              name="Reservation"
              component={gestureHandlerRootHOC(ReservationScreen)}
              options={{ title: 'Reservation' }}
            />
            <Tab.Screen
              name="Chat"
              component={gestureHandlerRootHOC(ChatsScreen)}
              options={{ title: 'Chat' }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="SignIn"
              component={gestureHandlerRootHOC(LoginScreen)}
              options={{ title: 'Sign In' }}
            />
            <Tab.Screen
              name="SignUp"
              component={gestureHandlerRootHOC(SignupScreen)}
              options={{ title: 'Sign Up' }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
