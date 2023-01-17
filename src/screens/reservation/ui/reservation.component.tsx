import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ButtonWrapper, ScreenWrapper } from './reservation.styles';
import { Scanner, ScannerPreview } from '@src/features/scanner';
import { NavigatorParamList } from '@src/routes';
import { Button } from 'react-native';
import { Modal } from '@src/shared/components/modal';
import { useModal } from '@src/shared/hooks';
import { ReservationsListModal } from '@src/widgets/reservations-list-modal';
import {
  useGetCurrentUser,
  useGetUserData,
} from '@src/shared/data-access/hooks/queries';
import { Loading } from '@src/shared/components/loader';

type Props = NativeStackScreenProps<NavigatorParamList, 'Reservation'>;

export const ReservationScreen = ({}: Props) => {
  const { user } = useGetCurrentUser();
  const { isOpen, handleClose, handleOpen } = useModal();
  const { userData, isLoading, refetch } = useGetUserData(user?.uid!);
  const {
    isOpen: isScannerOpen,
    handleClose: handleScannerClose,
    handleOpen: handleScannerOpen,
  } = useModal();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScreenWrapper>
      <ScannerPreview handleScannerOpen={handleScannerOpen} />
      <ButtonWrapper>
        <Button
          title="Show All Reservations"
          onPress={handleOpen}
          color="#02e4a4"
        />
      </ButtonWrapper>
      <Modal open={isOpen} onClose={handleClose} title="Reservations">
        <ReservationsListModal
          onClose={handleClose}
          reservations={userData?.reservations ?? []}
        />
      </Modal>
      <Modal open={isScannerOpen} onClose={handleScannerClose}>
        <Scanner
          handleScannerClose={handleScannerClose}
          reservations={userData?.reservations ?? []}
          onMakeReservationCallback={refetch}
        />
      </Modal>
    </ScreenWrapper>
  );
};
