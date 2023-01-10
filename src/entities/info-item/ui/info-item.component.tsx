import React from 'react';
import { ItemContainer, Title, Value } from './info-item.styles';

interface InfoItemProps {
  title: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, value }) => {
  return (
    <ItemContainer>
      <Title>{title}: </Title>
      <Value>{value}</Value>
    </ItemContainer>
  );
};

export default InfoItem;
