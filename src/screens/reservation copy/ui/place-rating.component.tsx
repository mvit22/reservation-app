import React, { useCallback, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from './place-rating.styles';
import { NavigatorParamList } from '@src/routes';
import {
  useGetCurrentUser,
  useGetUserData,
} from '@src/shared/data-access/hooks/queries';
import { Loading } from '@src/shared/components/loader';
import { Stack, StackProps } from '@src/features/stack/ui/stack.component';
import { CardItem } from '@src/entities/card-item';
import { Card } from '@src/entities/card-item/ui/card-item.component';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSetRating } from '@src/shared/data-access/hooks/mutations/use-set-rating.hook';

type Props = NativeStackScreenProps<NavigatorParamList, 'Place Rating'>;

export const PlaceRatingScreen = ({}: Props) => {
  const { user } = useGetCurrentUser();
  const { userData, isLoading } = useGetUserData(user?.uid!);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const { mutate } = useSetRating();
  const [currentItem, setCurrenItem] = useState<{
    name: string;
    id: string;
    people_number: number;
  } | null>(null);

  const renderItem = useCallback((item: Card) => <CardItem card={item} />, []);
  const handleLike = () => {
    if (currentItem?.id) {
      mutate(currentItem.id, 'plus');
      setCurrentIndex(prev => prev + 1);
    }
  };
  const handleDisLike = () => {
    if (currentItem?.id) {
      mutate(currentItem.id, 'minus');
      setCurrentIndex(prev => prev + 1);
    }
  };
  const handleSwipeLeft = useCallback<
    NonNullable<StackProps<Card>['onSwipeLeft']>
  >(
    item => {
      mutate(item.id, 'minus');
    },
    [mutate],
  );

  const handleSwipeRight = useCallback<
    NonNullable<StackProps<Card>['onSwipeLeft']>
  >(
    item => {
      mutate(item.id, 'plus');
    },
    [mutate],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScreenWrapper>
      <Stack
        data={userData?.reservations ?? []}
        renderItem={renderItem}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        setCurrentItem={setCurrenItem}
        currentIndex={currentIndex}
        nextIndex={nextIndex}
        setCurrentIndex={setCurrentIndex}
        setNextIndex={setNextIndex}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleDisLike}>
          <View style={styles.circle}>
            <Ionicons name="ios-close-outline" size={36} color="red" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike}>
          <View style={styles.circle}>
            <Ionicons name="ios-heart-outline" size={36} color="green" />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: 'white',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf2ed',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
