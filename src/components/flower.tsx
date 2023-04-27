import SC from '@emotion/styled';
import {useTranslation} from 'next-i18next';
import React from 'react';

const Container = SC.div`
  font-size: 12px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Gram = SC.div`
  font-size: 10px;
  opacity: 0.8;
  padding-right: 5px;
  font-weight: bold;
`;

const FeaturedImage = SC.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  overflow: hidden;
`;

const Image = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 3px;
  filter: unset;
`;

const Content = SC.div`
  padding-left: 5px;
  width: 65%;
`;

const Link = SC.a`
  font-weight: bold;
  opacity: 0.9;
  padding: 0px;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Details = SC.div`
  padding: 0px; 
  margin: 0px;    
  color: #666666;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const useGetAttr = (data) => {
  const {t} = useTranslation('common');
  const thc = data?.thc || 0;
  const cbd = data?.cbd || 0;
  const sativa = data?.sativa || 0;
  const indica = data?.indica || 0;
  const attr = [
    {value: thc, label: t('Flower.thc')},
    {value: cbd, label: t('Flower.cbd')},
    {value: indica, label: t('Flower.indica')},
    {value: sativa, label: t('Flower.sativa')}
  ];
  return attr.map((o) => o.value > 0 ? `- ${o.value}% ${o.label.toUpperCase()}`: '').join(' ');
};

export const Flower = ({data}) => {
  const attrs = useGetAttr(data);
  const name = data?.name || '';
  const images = data?.images || [];
  const quality = data?.quality || '';
  return (
    <Container>
      <Gram>฿900/g</Gram>
      <FeaturedImage>
        <Image
          alt="image"
          src={`https://i.weed.th/ii/${images[0]}/80x80`}
          width="30"
          height="30"
        /> 
      </FeaturedImage>
      <Content>
        <Link href="#">{name}</Link>
        <Details>{quality} {attrs}</Details>
      </Content>
    </Container>
  );
}
