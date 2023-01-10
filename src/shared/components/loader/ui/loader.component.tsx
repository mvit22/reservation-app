import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LoaderContainer, LoaderText, LoaderWrapper } from './loader.styles';

export const Loading = () => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <ActivityIndicator size="large" />
        <LoaderText>Loading...</LoaderText>
      </LoaderWrapper>
    </LoaderContainer>
  );
};
