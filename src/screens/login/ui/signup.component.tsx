import { UserContext } from '@src/app/App';
import { AuthService } from '@src/shared/services/auth';
import { User } from 'firebase/auth/react-native';
import React, { useContext, useState } from 'react';
import { Text, Alert } from 'react-native';
import { LoginContainer, SubmitButton, TextInput } from './login.styles';

export const SignupScreen = () => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const { setUser } = useContext(UserContext);

  const submitHandler = () => {
    if (email && password) {
      const callback = (user: User) => {
        setUser!(user);
      };
      AuthService.createUserWithEmailAndPassword(email, password, callback);
    } else {
      Alert.alert('Error', 'User credentials entered incorrectly');
    }
  };

  return (
    <LoginContainer>
      <Text>Email</Text>
      <TextInput onChangeText={onChangeEmail} value={email} />
      <Text>Password</Text>
      <TextInput
        secureTextEntry
        onChangeText={onChangePassword}
        value={password}
      />
      <SubmitButton title="Sign Up" onPress={submitHandler} />
    </LoginContainer>
  );
};
