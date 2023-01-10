import React from 'react';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '@src/routes';

type Props = NativeStackScreenProps<NavigatorParamList, 'Chat'>;

export const ChatScreen = ({}: Props) => {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
};
