import { Text, Linking, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';
import {
  BottomContent,
  BottomScanButton,
  ButtonTextStyle,
  ButtonWrapper,
  CardView,
  CenteredText,
  DescText,
  ScanButton,
  ScrollViewStyle,
  TextTitle,
  ViewHeader,
} from './scanner.styles';

interface ScannerProps {}

export const Scanner: React.FC<ScannerProps> = ({}) => {
  const [scannerNode, setScannerNode] = useState<QRCodeScanner | null>(null);
  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);

  const [result, setResult] = useState<BarCodeReadEvent | null>(null);

  const onSuccess = (e: BarCodeReadEvent) => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    setResult(e);
    setScan(false);
    setScanResult(true);
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setResult(e);
      setScan(false);
      setScanResult(true);
    }
  };
  const activeQR = () => {
    setScan(true);
  };
  const scanAgain = () => {
    setScan(true);
    setScanResult(false);
  };

  return (
    <ScrollViewStyle>
      <>
        {!scan && !scanResult ? (
          <CardView>
            <Image
              source={require('@src/shared/assets/back.png')}
              style={{ height: 36, width: 36 }}
            />
            <DescText numberOfLines={8}>
              Please move your camera {'\n'} over the QR Code
            </DescText>
            <Image
              source={require('@src/shared/assets/qr-code.png')}
              style={{ margin: 20 }}
            />
            <ScanButton onPress={activeQR}>
              <ButtonWrapper>
                <Image
                  source={require('@src/shared/assets/camera.png')}
                  style={{ height: 36, width: 36 }}
                />
                <ButtonTextStyle>Scan QR Code</ButtonTextStyle>
              </ButtonWrapper>
            </ScanButton>
          </CardView>
        ) : (
          <ViewHeader>
            <TouchableOpacity
              onPress={() => {
                setScan(false);
                setScanResult(false);
              }}>
              <Image
                source={require('@src/shared/assets/back.png')}
                style={{ height: 36, width: 36 }}
              />
            </TouchableOpacity>
            <TextTitle>Back</TextTitle>
          </ViewHeader>
        )}
        {scanResult && (
          <>
            <TextTitle>Result</TextTitle>
            <CardView>
              <Text>Type: {result?.type}</Text>
              <Text>Result: {result?.data}</Text>
              <Text numberOfLines={1}>RawData: {result?.rawData}</Text>
              <ScanButton onPress={scanAgain}>
                <ButtonWrapper>
                  <Image
                    source={require('@src/shared/assets/camera.png')}
                    style={{ height: 36, width: 36 }}
                  />
                  <ButtonTextStyle>Click to scan again</ButtonTextStyle>
                </ButtonWrapper>
              </ScanButton>
            </CardView>
          </>
        )}
        {scan && (
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
                  <BottomScanButton
                    onPress={() => scannerNode?.reactivate()}
                    onLongPress={() => setScan(false)}>
                    <Image source={require('@src/shared/assets/camera2.png')} />
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
