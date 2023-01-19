import React, { useMemo } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  MessageContainer,
  MessageContent,
  MessageInfo,
  MessageInfoText,
} from './chat-modal.styles';
import { format } from 'date-fns';

export interface MessageData {
  userId: string;
  userName: string;
  content: string;
  timestamp: Timestamp;
}

interface MessageProps {
  message: MessageData;
  isMyMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isMyMessage }) => {
  const { content, userName, timestamp } = message;
  const time = useMemo(() => {
    return format(timestamp.toDate(), 'dd.MM.y h:mm aa');
  }, [timestamp]);

  return (
    <MessageContainer isMyMessage={isMyMessage}>
      <MessageContent>{content}</MessageContent>
      <MessageInfo>
        <MessageInfoText>{userName}</MessageInfoText>
        <MessageInfoText>{time}</MessageInfoText>
      </MessageInfo>
    </MessageContainer>
  );
};
