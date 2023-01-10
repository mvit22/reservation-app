import { UserContext } from '@src/app/App';
import { Loading } from '@src/shared/components/loader';
import { useCreateUser } from '@src/shared/data-access/hooks/mutations';
import React, { useContext, useEffect, useState } from 'react';
import { Text, Alert } from 'react-native';
import { LoginContainer, SubmitButton, TextInput } from './login.styles';

export const SignupScreen = () => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const { setUserId } = useContext(UserContext);

  const { mutate, isError, isLoading } = useCreateUser(
    username,
    password,
    setUserId,
  );

  const submitHandler = () => {
    if (username && password) {
      mutate();
    } else {
      Alert.alert('Error', 'User credentials entered incorrectly');
    }
  };

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'User credentials entered incorrectly');
    }
  }, [isError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LoginContainer>
      <Text>Username</Text>
      <TextInput onChangeText={onChangeUsername} value={username} />
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
