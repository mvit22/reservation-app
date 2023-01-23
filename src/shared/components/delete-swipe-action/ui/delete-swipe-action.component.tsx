import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  DeleteButton,
  DeleteButtonText,
  SwipedRow,
} from './delete-swipe-action.styles';

export const DeleteSwipeAction = (removeHandler: () => void) => {
  return (
    <SwipedRow>
      <DeleteButton>
        <TouchableOpacity onPress={removeHandler}>
          <DeleteButtonText>Remove</DeleteButtonText>
        </TouchableOpacity>
      </DeleteButton>
    </SwipedRow>
  );
};
