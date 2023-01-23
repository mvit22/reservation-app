import {
  Text,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  ViewProps,
  ImageProps,
  ImageBackground,
} from 'react-native';
import React, { useMemo } from 'react';

export type Card = {
  photo?: string;
  name: string;
  id: string;
  rating: {
    plus: number;
    minus: number;
  };
};

type ItemProps = Pick<ViewProps, 'style'> & {
  card: Card;
};

export const CardItem: React.FC<ItemProps> = ({
  card: { name, photo },
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, { width: screenWidth - 16 * 2 }, style],
    [screenWidth, style],
  );

  const source = useMemo<ImageProps['source']>(
    () =>
      photo ? { uri: photo } : require('@src/shared/assets/workplace.png'),
    [photo],
  );

  return (
    <ImageBackground key={name} style={containerStyle} source={source}>
      <Text style={styles.title}>{name}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 1,
  },
});
