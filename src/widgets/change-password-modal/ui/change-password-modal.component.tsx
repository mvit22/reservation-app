import { Text, Button, View, Alert, Switch } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from '../../../screens/login/ui/login.styles';
import { Loading } from '../../../shared/components/loader/ui/loader.component';
import {
  ButtonsWrapper,
  ModalContainer,
} from '../../edit-profile-modal/ui/edit-profile-modal.styles';
import { ShowPasswordView } from './change-password-modal.styles';
import { User } from 'firebase/auth/react-native';
import { useUpdateUserPassword } from '@src/shared/data-access/hooks/mutations';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
}) => {
  const [password, onChangePassword] = useState('');
  const [passwordConfiramtion, onChangePasswordConfiramtion] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { mutate, isLoading } = useUpdateUserPassword(user, password, onClose);

  const onSubmit = () => {
    if (password === passwordConfiramtion) {
      mutate();
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ModalContainer>
      <View>
        <ShowPasswordView>
          <Switch
            value={isPasswordHidden}
            onValueChange={setIsPasswordHidden}
          />
          <Text>Show passwords</Text>
        </ShowPasswordView>
        <Text>New password</Text>
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={!isPasswordHidden}
        />
        <Text>Confirm new password</Text>
        <TextInput
          onChangeText={onChangePasswordConfiramtion}
          value={passwordConfiramtion}
          secureTextEntry={!isPasswordHidden}
        />
      </View>
      <ButtonsWrapper>
        <Button title="Close" onPress={onClose} color="red" />
        <Button title="Confirm" onPress={onSubmit} />
      </ButtonsWrapper>
    </ModalContainer>
  );
};
