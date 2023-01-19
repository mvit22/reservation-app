import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const SwipedRow = styled.View``;

export const DeleteButton = styled(Animated.View)`
  background-color: red;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 10px;
`;

export const DeleteButtonText = styled.Text`
  color: #fcfcfc;
  font-weight: bold;
  font-size: 18px;
  padding: 3px;
`;
