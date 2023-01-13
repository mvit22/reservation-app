import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from './reservation.styles';
import { Scanner } from '@src/features/scanner';
import { NavigatorParamList } from '@src/routes';

type Props = NativeStackScreenProps<NavigatorParamList, 'Reservation'>;

export const ReservationScreen = ({}: Props) => {
  return (
    <ScreenWrapper>
      <Scanner />
    </ScreenWrapper>
  );
};
