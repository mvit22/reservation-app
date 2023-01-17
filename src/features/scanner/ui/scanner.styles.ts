import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

export const ScrollViewStyle = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: #2196f3;
`;

export const ViewHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 10%;
  padding-left: 15px;
  padding-top: 10px;
  width: ${width}px;
`;

export const TextTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  padding: 16px;
  color: white;
`;

interface CardViewProps {
  isResultView?: boolean;
}

export const CardView = styled.View<CardViewProps>`
  width: ${width - 32}px;
  align-self: center;
  justify-content: flex-start;
  ${props => (props.isResultView ? '' : 'align-items: center;')}
  border-radius: 10px;
  padding: 25px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10%;
  background-color: white;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ScanButton = styled.TouchableOpacity`
  border-width: 2px;
  border-radius: 10px;
  border-color: #258ce3;
  padding-top: 5px;
  padding-right: 25px;
  padding-bottom: 5px;
  padding-left: 25px;
  margin-top: 20px;
`;

export const BottomScanButton = styled.TouchableOpacity`
  margin-left: ${width / 2 - 50}px;
  width: 100px;
  height: 100px;
`;

export const DescText = styled.Text`
  padding: 16px;
  text-align: center;
  font-size: 16px;
`;

export const CenteredText = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 18px;
  padding-top: 10px;
  color: white;
`;

export const BoldText = styled.Text`
  font-weight: 500;
  color: #000;
`;

export const BottomContent = styled.ImageBackground`
  width: ${width}px;
  height: 120px;
`;

export const ButtonTextStyle = styled.Text`
  color: black;
  font-weight: bold;
  color: #2196f3;
`;

export const Image = styled.Image`
  height: 36px;
  width: 36px;
`;
