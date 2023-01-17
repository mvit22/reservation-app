import React from 'react';
import { Image as RNImage } from 'react-native';
import {
  ButtonTextStyle,
  ButtonWrapper,
  CardView,
  DescText,
  Image,
  ScanButton,
} from './scanner.styles';

interface ScannerPreviewProps {
  handleScannerOpen: () => void;
}

export const ScannerPreview: React.FC<ScannerPreviewProps> = ({
  handleScannerOpen,
}) => {
  return (
    <CardView>
      <Image source={require('@src/shared/assets/back.png')} />
      <DescText numberOfLines={8}>
        Please move your camera {'\n'} over the QR Code
      </DescText>
      <RNImage source={require('@src/shared/assets/qr-code.png')} />
      <ScanButton onPress={handleScannerOpen}>
        <ButtonWrapper>
          <Image source={require('@src/shared/assets/camera.png')} />
          <ButtonTextStyle>Scan QR Code</ButtonTextStyle>
        </ButtonWrapper>
      </ScanButton>
    </CardView>
  );
};
