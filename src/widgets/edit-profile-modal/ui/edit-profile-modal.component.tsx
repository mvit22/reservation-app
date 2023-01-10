import { Text, Button, View } from 'react-native';
import React, { useState } from 'react';
import { ButtonsWrapper, ModalContainer } from './edit-profile-modal.styles';
import { TextInput } from '../../../screens/login/ui/login.styles';
import { Loading } from '../../../shared/components/loader/ui/loader.component';
import { useUpdateUser } from '@src/shared/data-access/hooks/mutations';
import { User } from '@src/shared/services/api/types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSuccesCallback: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onSuccesCallback,
}) => {
  const [username, onChangeUsername] = useState(user.username);
  const [name, onChangeName] = useState(user.name);

  const { mutate, isLoading } = useUpdateUser(
    user.id,
    { ...user, username, name },
    () => {
      onSuccesCallback();
      onClose();
    },
  );

  const onSubmit = () => {
    mutate();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ModalContainer>
      <View>
        <Text>Username</Text>
        <TextInput onChangeText={onChangeUsername} value={username} />
        <Text>Name</Text>
        <TextInput onChangeText={onChangeName} value={name} />
      </View>
      <ButtonsWrapper>
        <Button title="Close" onPress={onClose} color="red" />
        <Button title="Confirm" onPress={onSubmit} />
      </ButtonsWrapper>
    </ModalContainer>
  );
};
