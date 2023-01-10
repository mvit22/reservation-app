import { UserContext } from '@src/app/App';
import { Loading } from '@src/shared/components/loader';
import { useGetUsers } from '@src/shared/data-access/hooks/queries';
import React, { useContext, useState } from 'react';
import { Text, Alert } from 'react-native';
import { LoginContainer, SubmitButton, TextInput } from './login.styles';

export const LoginScreen = () => {
  const { data: users, isLoading } = useGetUsers();
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const { setUserId } = useContext(UserContext);

  const submitHandler = () => {
    const activeUser = users?.find(
      ({ username: login, password: userPassword }) =>
        username === login && password === userPassword,
    );
    if (activeUser) {
      setUserId && setUserId(activeUser.id);
    } else {
      Alert.alert('Error', 'User credentials entered incorrectly');
    }
  };

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
      <SubmitButton title="Sign In" onPress={submitHandler} />
    </LoginContainer>
  );
};
