import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 20px;
  padding: 10px 30px 30px;
  width: 100%;
  box-shadow: 0px 2px #000;
`;

export const ModalContent = styled.View`
  margin-top: 10px;
  flex: 1;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  padding: 10px 0;
  font-size: 24px;
  color: #000;
  font-weight: 500;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
`;
