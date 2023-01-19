import { Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import {
  ButtonsWrapper,
  ModalContainer,
} from './reservations-list-modal.styles';
import ListItem from './list-item.component';
import { useModal } from '@src/shared/hooks';
import { Modal } from '@src/shared/components/modal';
import { ReservationInfo } from '@src/widgets/reservation-info';
import {
  gestureHandlerRootHOC,
  TouchableOpacity,
} from 'react-native-gesture-handler';

interface ReservationsListProps {
  reservations: {
    name: string;
    id: string;
    people_number: number;
  }[];
  onClose: () => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  onClose,
}) => {
  const { isOpen, handleClose, handleOpen } = useModal();
  const [reservationId, setReservationId] = useState<string | null>(null);

  const rowClickHandler = (id: string) => {
    setReservationId(id);
    handleOpen();
  };

  return (
    <ModalContainer>
      <FlatList
        data={reservations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => rowClickHandler(item.id)}>
            <ListItem
              title={item.name}
              number={item.people_number}
              subtitle="Number of people on the reservation"
            />
          </TouchableOpacity>
        )}
      />
      <ButtonsWrapper>
        <Button title="Close" onPress={onClose} color="red" />
      </ButtonsWrapper>
      {reservationId && (
        <Modal open={isOpen} onClose={handleClose} title="Reservation Info">
          <ReservationInfo onClose={handleClose} id={reservationId} />
        </Modal>
      )}
    </ModalContainer>
  );
};

export const ReservationsListModal = gestureHandlerRootHOC(ReservationsList);
