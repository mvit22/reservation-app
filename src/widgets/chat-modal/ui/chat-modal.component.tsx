/* eslint-disable react-native/no-inline-styles */
import { Button, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import {
  ButtonWrapper,
  ContentWrapper,
  FooterWrapper,
  Image,
  ImageWrapper,
  InputWrapper,
  ModalContainer,
  TextInput,
  TextTitle,
  ViewHeader,
} from './chat-modal.styles';
import {
  useChatData,
  useGetCurrentUser,
} from '@src/shared/data-access/hooks/queries';
import { Loading } from '@src/shared/components/loader';
import { Message } from './message.component';
import { useSendMessage } from '@src/shared/data-access/hooks/mutations/use-send-message.hook';
import { Timestamp } from 'firebase/firestore';

interface ChatModalProps {
  onClose: () => void;
  chatId: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ onClose, chatId }) => {
  const { user } = useGetCurrentUser();
  const [message, onChangeMessage] = useState('');
  const { messages, isLoading } = useChatData(chatId);

  const sendMessageCallback = () => {
    onChangeMessage('');
  };

  const { mutate } = useSendMessage(chatId, sendMessageCallback);

  const sendHandler = () => {
    mutate({
      userId: user?.uid!,
      userName: user?.displayName ?? 'Anonymous user',
      content: message,
      timestamp: Timestamp.now(),
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ModalContainer>
      <ContentWrapper>
        <ViewHeader>
          <TouchableOpacity onPress={onClose}>
            <ImageWrapper>
              <Image source={require('@src/shared/assets/back.png')} />
            </ImageWrapper>
          </TouchableOpacity>
          <TextTitle>Back</TextTitle>
        </ViewHeader>
        <FlatList
          data={messages}
          inverted
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
          renderItem={({ item }) => (
            <Message message={item} isMyMessage={item.userId === user?.uid} />
          )}
        />
      </ContentWrapper>
      <FooterWrapper>
        <InputWrapper>
          <TextInput onChangeText={onChangeMessage} value={message} />
        </InputWrapper>
        <View>
          <ButtonWrapper>
            <Button title="Send" onPress={sendHandler} />
          </ButtonWrapper>
        </View>
      </FooterWrapper>
    </ModalContainer>
  );
};
