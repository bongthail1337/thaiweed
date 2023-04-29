import SC from '@emotion/styled';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import React from 'react';

import {Icon} from '../icon';

const Container = SC(Link)`
  width: 60px;
`;

const SCIcon = SC.div`
  border-radius: 50px;
  cursor: pointer;
  border: 1px solid rgb(4, 177, 78);
  display: inline-block;
  overflow: hidden;
  margin-right: 5px;
  margin-left: 5px;
  padding: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 22px;
`;

const Label = SC.div`
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: rgb(97, 100, 111);
`;

export enum BadgeType {
  Location = 'location',
  Call = 'call',
  Attach = 'attach',
  Url = 'url',
  Fb = 'fb',
}

export const Badge = ({type = BadgeType.Url, href, ...props}) => {
  const {t} = useTranslation('common');

  const label = {
    [BadgeType.Location]: t('Details.directions'),
    [BadgeType.Call]: t('Details.call'),
    [BadgeType.Attach]: t('Details.website'),
    [BadgeType.Url]: t('Details.line'),
    [BadgeType.Fb]: t('Details.facebook'),
  }[type] || type ;
  
  return (
    <Container href={href} {...props}>
      <SCIcon>
        <Icon name={type} size={22} />
      </SCIcon>
      {label && <Label>{label}</Label>}
    </Container>
  );
}
