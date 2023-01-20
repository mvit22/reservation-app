import React, { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '@src/routes';
import { ItemContainer, ScreenWrapper, Title } from './chats.styles';
import { FlatList } from 'react-native';
import {
  useGetCurrentUser,
  useGetUserData,
} from '@src/shared/data-access/hooks/queries';
import { useModal } from '@src/shared/hooks';
import { Modal } from '@src/shared/components/modal';
import { ChatModal } from '@src/widgets/chat-modal';
import { Loading } from '@src/shared/components/loader';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { DeleteSwipeAction } from '@src/shared/components/delete-swipe-action';
import { useRemoveReservation } from '@src/shared/data-access/hooks/mutations/use-remove-reservation.hook';

type Props = NativeStackScreenProps<NavigatorParamList, 'Chat'>;

export const ChatsScreen = ({}: Props) => {
  const { user } = useGetCurrentUser();
  const { userData, isLoading, refetch } = useGetUserData(user?.uid!);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const { isOpen, handleClose, handleOpen } = useModal();
  const { mutate } = useRemoveReservation(refetch);

  const rowClickHandler = (id: string) => {
    setReservationId(id);
    handleOpen();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScreenWrapper>
      <FlatList
        data={userData?.reservations ?? []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const removeHandler = () => {
            mutate(item);
          };
          return (
            <Swipeable
              renderRightActions={() => DeleteSwipeAction(removeHandler)}>
              <TouchableOpacity onPress={() => rowClickHandler(item.id)}>
                <ItemContainer>
                  <Title>{item.name}</Title>
                </ItemContainer>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
      />
      {reservationId && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          title={
            userData?.reservations.find(({ id }) => reservationId === id)?.name
          }>
          <ChatModal onClose={handleClose} chatId={reservationId} />
        </Modal>
      )}
    </ScreenWrapper>
  );
};
