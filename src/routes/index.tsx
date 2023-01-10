import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChatScreen } from '@src/screens/chat';
import { LoginScreen, SignupScreen } from '@src/screens/login';
import { ProfileScreen } from '@src/screens/profile';
import { ReservationScreen } from '@src/screens/reservation';

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
      {isSignedIn ? (
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Profile': {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                  break;
                }
                case 'Chat':
                case 'Reservation': {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                  break;
                }
              }
              return iconName ? (
                <Ionicons name={iconName} size={size} color={color} />
              ) : null;
            },
          })}>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Tab.Screen
            name="Reservation"
            component={ReservationScreen}
            options={{ title: 'Reservation' }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ title: 'Chat' }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="SignIn">
          <Tab.Screen
            name="SignIn"
            component={LoginScreen}
            options={{ title: 'Sign In' }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignupScreen}
            options={{ title: 'Sign Up' }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
