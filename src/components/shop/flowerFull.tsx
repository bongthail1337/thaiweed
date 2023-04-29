import SC from '@emotion/styled';
import {useTranslation} from 'next-i18next';
import React from 'react';

import {useFlowerAttr} from '../../hooks/useFlowerAttr';

type RootProps = {
  index: number;
};
const Root = SC.div<RootProps>`
  ${({index}) => (index >= 1 && `border-top: 1px solid rgb(229, 229, 229);`)};
`;
const Container = SC.div`
  padding: 10px 0px;
  overflow: hidden;
  position: relative;
`;

const FeaturedImage = SC.div`
  width: 86px;
  height: 86px;
  margin: 2px;
  background-color: #fff;
  float: left;
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
  float: left;
  margin-left: 10px;
  margin-top: 0px;
  width: calc(100% - 100px);
`;

const Quality = SC.div`
  font-size: 10px;
  font-weight: bold;
  opacity: 0.7;
  text-transform: uppercase;
`;

const Name = SC.div`
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const Attribytes = SC.div`
  font-size: 10px;
  color: rgb(68, 68, 68);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = SC.div`
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  white-space: pre-wrap;
`;

const Price = SC.div`
  font-size: 10px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

export const FlowerFull = ({data, index}) => {
  const {t} = useTranslation('common');
  const attrs = useFlowerAttr(data);
  const images = data?.images || [];
  const name = data?.name || '';
  const quality = data?.quality || '';
  const description = data?.description || '';
  return (
    <Root index={index}>
      <Container>
        <FeaturedImage>
          <Image
            alt="image"
            src={`https://i.weed.th/ii/${images[0]}/80x80`}
            width="86"
            height="86"
          /> 
        </FeaturedImage>
        <Content>
          {quality.length > 0 && <Quality>{quality} {t('Flower.grade')}</Quality>}
          {name.length > 0 && <Name>{name}</Name>}
          {attrs.length > 0 && <Attribytes>{attrs.slice(2)}</Attribytes>}
          {description.length > 0 && <Description>{description}</Description>}
          <Price>{t('Flower.price')}</Price>
        </Content>
      </Container>
    </Root>
  );
}
