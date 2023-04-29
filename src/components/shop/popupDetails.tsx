import SC from '@emotion/styled';
import {useTranslation} from 'next-i18next';
import React from 'react';
import { Popup} from 'react-map-gl';

import {getAvgReviewsInString, getCountReviewsInString} from '../../utils/calc';
import {Flower} from './flower';
import {Rating} from './rating';

const Container = SC(Popup)`
  opacity: 0.9;
`;

const Content = SC.div`
  overflow: hidden;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FeaturedImage = SC.div`
  width: 75px;
  height: 75px;
  border-radius: 3px;
  overflow: hidden;
`;

const Image = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 3px;
  filter: unset;
`;

const Head = SC.div`
  display: flex;
  flex-direction: row;
`;

const Block = SC.div`
  padding-left: 10px;
  width: 65%;
`;

const Reviews = SC.div`
  display: flex;
  flex-direction: column;
  color: #666666;
  text-align: center;
  align-items: center;
`;

const Name = SC.span`
  color: #343434;
  font-weight: bold;
  font-size: 15px;
  white-space: break-spaces;
`;

const Body = SC.div``;

const Preview = SC.div`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  padding-bottom: 5px;
  padding-top: 10px;
`;


export const PopupDetails = ({data}) => {
  const {t} = useTranslation('common');
  const businessImages = data?.business_images || [];
  const count = data?.reviews_aggregate?.aggregate?.count || 0;
  const rating = data?.reviews_aggregate?.aggregate?.sum?.rating || 0;
  const productsFlowers = data?.products_flowers || [];

  return (
    <Container
    anchor="top"
    longitude={+data.lng}
    latitude={+data.lat}
    closeButton={false}
  >
    <Content>
      <Head>
        <FeaturedImage>
          <Image
            alt="image"
            src={`https://i.weed.th/ii/${businessImages[0]}/150x150`}
            width="100%"
          /> 
        </FeaturedImage>
        <Block>
          <Reviews>
            <div>
              <Rating value={rating / count} />
            </div>
            <div>
            {getAvgReviewsInString(rating / count)}({getCountReviewsInString(count)})
            </div>
          </Reviews>
          <Name>
            {data.name}
          </Name>
        </Block>
      </Head>
      {productsFlowers.length > 0 && (
        <Body>
          <Preview>{t('PopupDetails.productsFlowers')}</Preview>
          {productsFlowers.map((o, i) => <Flower key={i} data={o} />)}
        </Body>
      )}
    </Content>
  </Container>
  );
}
