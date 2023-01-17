export const tabIcon = (name: string, focused: boolean) => {
  let iconName;

  switch (name) {
    case 'Profile': {
      iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
      break;
    }
    case 'Chat': {
      iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
      break;
    }
    case 'Reservation': {
      iconName = focused ? 'ios-list' : 'ios-list-outline';
      break;
    }
    case 'SignIn': {
      iconName = focused ? 'ios-log-in' : 'ios-log-in-outline';
      break;
    }
    case 'SignUp': {
      iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
      break;
    }
  }

  return iconName;
};
