import { Modal as RNModal } from 'react-native';
import React, { PropsWithChildren } from 'react';
import {
  CenteredView,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from './modal.styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
  title,
}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <CenteredView>
        <ModalContainer isPaddingsExist={!!title}>
          {title && (
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
          )}
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </CenteredView>
    </RNModal>
  );
};
