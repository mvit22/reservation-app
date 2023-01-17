import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const ListItemWrapper = styled.View`
  margin: 5px 0;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: black;
`;

export const ListItemTitle = styled.Text`
  font-size: 24px;
  color: #000;
  line-height: 28px;
  margin-bottom: 10px;
`;

export const ListItemSubtitle = styled.Text`
  font-size: 18px;
`;

export const ItemsNumber = styled.Text`
  font-size: 18px;
  color: #000;
`;
