import React from 'react';
import {
  ItemsNumber,
  ListItemSubtitle,
  ListItemTitle,
  ListItemWrapper,
} from './reservations-list-modal.styles';

interface ListItemProps {
  title: string;
  number: number;
  subtitle?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  number,
  subtitle = 'Number',
}) => {
  return (
    <ListItemWrapper>
      <ListItemTitle>{title}</ListItemTitle>
      <ListItemSubtitle>
        {subtitle}: <ItemsNumber>{number}</ItemsNumber>
      </ListItemSubtitle>
    </ListItemWrapper>
  );
};

export default ListItem;
