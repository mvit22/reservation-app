import styled from 'styled-components/native';

export const ContentWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  padding: 5px;
  border-radius: 50px;
  background-color: #6e9eeb;
`;

export const Image = styled.Image`
  height: 26px;
  width: 26px;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 16px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const FooterWrapper = styled.View`
  padding-top: 15px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const InputWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  margin-right: 10px;
`;

export const TextInput = styled.TextInput`
  height: 35px;
  border-width: 1px;
  padding: 10px;
  width: 100%;
`;

export const ButtonWrapper = styled.View`
  margin-bottom: 10px;
`;

interface MessageContainerProps {
  isMyMessage: boolean;
}

export const MessageContainer = styled.View<MessageContainerProps>`
  margin-top: 10px;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  max-width: 80%;
  margin-left: ${props => (props.isMyMessage ? '15%' : '0')};
  margin-right: 10px;
  background-color: #f2f7f6;
`;

export const MessageContent = styled.Text`
  font-size: 18px;
  color: black;
  margin-bottom: 10px;
`;

export const MessageInfo = styled.View`
  align-items: flex-end;
`;

export const MessageInfoText = styled.Text`
  font-size: 14px;
  color: black;
  text-align: right;
`;
