import { UserContext } from '@src/app/App';
import { AuthService } from '@src/shared/services/auth';
import { User } from 'firebase/auth/react-native';
import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { LoginContainer, SubmitButton, TextInput } from './login.styles';

export const LoginScreen = () => {
  const [email, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const { setUser } = useContext(UserContext);

  const submitHandler = () => {
    const callback = (user: User) => {
      setUser!(user);
    };
    AuthService.signInWithEmailAndPassword(email, password, callback);
  };

  return (
    <LoginContainer>
      <Text>Email</Text>
      <TextInput onChangeText={onChangeUsername} value={email} />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        onChangeText={onChangePassword}
        value={password}
      />
      <SubmitButton title="Sign In" onPress={submitHandler} />
    </LoginContainer>
  );
};
