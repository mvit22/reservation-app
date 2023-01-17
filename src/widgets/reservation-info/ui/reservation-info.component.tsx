import { Button } from 'react-native';
import React from 'react';
import {
  ButtonsWrapper,
  ListItem,
  ScreenContainer,
  ReservationSubtitle,
  ReservationTitle,
  ReservationContainer,
} from './reservation-info.styles';
import { FlatList } from 'react-native-gesture-handler';
import { useGetReservationData } from '@src/shared/data-access/hooks/queries/use-get-reservation-data.hook';
import { Loading } from '@src/shared/components/loader';

interface ReservationInfoProps {
  id: string;
  onClose?: () => void;
  makeReservation?: (data: {
    name: string;
    id: string;
    people_number: number;
  }) => void;
  isHelpTextVisible?: boolean;
}

export const ReservationInfo: React.FC<ReservationInfoProps> = ({
  id,
  onClose,
  makeReservation,
  isHelpTextVisible,
}) => {
  const { reservationData, isLoading } = useGetReservationData(id);

  if (isLoading) {
    return <Loading />;
  }

  const makeReservationHandler = () => {
    makeReservation &&
      reservationData &&
      makeReservation({
        name: reservationData?.name,
        id,
        people_number: reservationData?.people_list.length,
      });
  };

  const Wrapper = makeReservation ? ReservationContainer : ScreenContainer;

  return (
    <Wrapper>
      <ReservationTitle>{reservationData?.name}</ReservationTitle>
      <ReservationSubtitle>People on the reservation:</ReservationSubtitle>
      <FlatList
        data={reservationData?.people_list}
        renderItem={({ item }) => <ListItem>- {item}</ListItem>}
      />
      <ButtonsWrapper>
        {isHelpTextVisible ? (
          <ReservationSubtitle>
            You are already in this reservation
          </ReservationSubtitle>
        ) : (
          makeReservation && (
            <Button
              title="Make a Reservation"
              onPress={makeReservationHandler}
            />
          )
        )}
        {onClose && <Button title="Back" onPress={onClose} color="red" />}
      </ButtonsWrapper>
    </Wrapper>
  );
};
