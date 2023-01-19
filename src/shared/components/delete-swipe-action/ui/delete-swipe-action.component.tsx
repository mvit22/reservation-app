import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  DeleteButton,
  DeleteButtonText,
  SwipedRow,
} from './delete-swipe-action.styles';

interface DeleteSwipeActionProps {
  onClick: () => void;
}

export const DeleteSwipeAction: React.FC<DeleteSwipeActionProps> = () => {
  return (
    <SwipedRow>
      <DeleteButton>
        <TouchableOpacity>
          <DeleteButtonText>Delete</DeleteButtonText>
        </TouchableOpacity>
      </DeleteButton>
    </SwipedRow>
  );
};
