import styled from 'styled-components/native';

export const ScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const ReservationContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ReservationTitle = styled.Text`
  font-size: 24px;
  color: #000;
  line-height: 28px;
  margin-bottom: 10px;
`;

export const ReservationSubtitle = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: black;
`;

export const ListItem = styled.Text`
  font-size: 18px;
  margin: 5px 0;
  color: #000;
`;

export const ViewHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10%;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 16px;
  color: white;
`;
