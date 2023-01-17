import {
  Text,
  Linking,
  View,
  TouchableOpacity,
  Alert,
  Image as RNImage,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';
import {
  BottomContent,
  BottomScanButton,
  ButtonTextStyle,
  ButtonWrapper,
  CardView,
  CenteredText,
  Image,
  ScanButton,
  ScrollViewStyle,
  TextTitle,
  ViewHeader,
} from './scanner.styles';
import { ReservationInfo } from '@src/widgets/reservation-info';
import { useMakeReservation } from '@src/shared/data-access/hooks/mutations';

interface ScannerProps {
  handleScannerClose: () => void;
  reservations: {
    name: string;
    id: string;
    people_number: number;
  }[];
  onMakeReservationCallback: () => void;
}

interface QRCodeData {
  id: string;
  data_role: string;
}

export const Scanner: React.FC<ScannerProps> = ({
  handleScannerClose,
  reservations,
  onMakeReservationCallback,
}) => {
  const [scannerNode, setScannerNode] = useState<QRCodeScanner | null>(null);
  const [scanResult, setScanResult] = useState(false);

  const [result, setResult] = useState<BarCodeReadEvent | null>(null);

  const onSuccess = (e: BarCodeReadEvent) => {
    const check = e.data.substring(0, 4);
    setResult(e);
    setScanResult(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setResult(e);
      setScanResult(true);
    }
  };

  const resultData: QRCodeData | undefined = useMemo(() => {
    return result?.data && JSON.parse(result.data);
  }, [result?.data]);

  const onMakeReservation = () => {
    setResult(null);
    setScanResult(false);
    onMakeReservationCallback();
    handleScannerClose();
    Alert.alert('Success', 'Reservation was successful!');
  };

  const { mutate } = useMakeReservation(onMakeReservation);

  const scanAgain = () => {
    setScanResult(false);
  };

  const handleClose = () => {
    handleScannerClose();
    setScanResult(false);
  };

  const makeReservationHandler = (data: {
    name: string;
    id: string;
    people_number: number;
  }) => {
    mutate(data);
  };

  return (
    <ScrollViewStyle>
      <>
        <ViewHeader>
          <TouchableOpacity onPress={handleClose}>
            <Image source={require('@src/shared/assets/back.png')} />
          </TouchableOpacity>
          <TextTitle>Back</TextTitle>
        </ViewHeader>
        {scanResult ? (
          <>
            <CardView isResultView={scanResult}>
              {resultData?.data_role === 'reservation_app' ? (
                <ReservationInfo
                  id={resultData.id}
                  makeReservation={makeReservationHandler}
                  isHelpTextVisible={
                    !!reservations.find(({ id }) => id === resultData.id)
                  }
                />
              ) : (
                <Text>Wrong QR-Code, please try again</Text>
              )}
              <ScanButton onPress={scanAgain}>
                <ButtonWrapper>
                  <Image source={require('@src/shared/assets/camera.png')} />
                  <ButtonTextStyle>Click to scan again</ButtonTextStyle>
                </ButtonWrapper>
              </ScanButton>
            </CardView>
          </>
        ) : (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={node => setScannerNode(node)}
            onRead={onSuccess}
            topContent={
              <CenteredText>
                Please move your camera over the QR Code
              </CenteredText>
            }
            bottomContent={
              <View>
                <BottomContent
                  source={require('@src/shared/assets/bottom-panel.png')}>
                  <BottomScanButton onPress={() => scannerNode?.reactivate()}>
                    <RNImage
                      source={require('@src/shared/assets/camera2.png')}
                    />
                  </BottomScanButton>
                </BottomContent>
              </View>
            }
          />
        )}
      </>
    </ScrollViewStyle>
  );
};

// const QRCodeData = {
//   id: 'table_1',
//   data_role: 'reservation_app',
// };
