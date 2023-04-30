import SC from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import React from 'react';

import {getAvgReviewsInString, getCountReviewsInString, getRatingWithoutRound} from '../../utils/calc';
import {Badge, BadgeType} from './badge';
import {CircularProgressWithLabel} from './circularProgressWithLabel';
import {FlowerFull} from './flowerFull';
import {LinearProgressRating} from './linearProgressRating';
import {NearByShops} from './nearByShops';
import {Rating} from './rating';
import {Review} from './review';

const Container = SC(Drawer)`
  overflow-y: scroll;
`;

const Content = SC.div`
  margin: auto;
  min-width: 320px;
  max-width: 420px;
  padding-right: 10px;
  padding-left: 10px;
`;

const H1 = SC.h1`
  text-align: center;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  word-break: break-word;
`;

const RatingBlock = SC.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(85, 85, 85);
  font-size: 22px;
  font-weight: bold;
  overflow: hidden;
`;

const RatingValue = SC.span`
  margin-left: 7px;
`;

const SCLink = SC(Link)`
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
  margin-top: 10px;
  display: block;
`;

const LogoContainer = SC.div`
width: calc(100% - 6px);
  border-radius: 3px;
  overflow: hidden;
  margin: 2px;
`;

const Logo = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 3px;
  filter: unset;
`;

const GoogleImagesContainer = SC.div`
  width: calc(25% - 4.5px);
  overflow: hidden;
  border-radius: 3px;
  margin: 2px;
  float: left;
`;

const GoogleImagesBlock = SC.div`
  clear: left;
  position: relative;
  height: 103px;
`;

const Contacts = SC.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 40px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = SC.div`
  padding: 10px 20px;
  font-size: 14px;
  color: rgb(136, 136, 136);
  white-space: pre-wrap;
`;

const H3 = SC.h3`
  margin-left: 20px;
`;

const Body = SC.div`
  margin-left: 20px;
`;

const Label = SC.h2`
  font-size: 16px;
`;

const ContentBlock = SC.h2`
  padding: 5px;
  overflow: hidden;
  border-radius: 10px;
  margin-top: -7px;
  margin-bottom: 5px;
`;

const NoMoreBlock = SC.div`
  padding: 20px 20px 35px;
  text-align: center;
  opacity: 0.4;
`;

const NearbyBlock = SC.div`
  margin-bottom: 50px;
  margin-left: 10px;
`;

const Number = SC.div`
  font-size: 42px;
  color: rgb(124, 124, 124);
`;

const Centred = SC.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Total = SC.div`
  font-size: 14px;
  margin-top: 14px;
`;

export const Details = ({data}) => {
  const {t} = useTranslation('common');
  const businessImages = data?.business_images || [];
  const googleImages = data?.google_images || [];
  const openingHours = data?.opening_hours || [];
  const count = data?.reviews_aggregate?.aggregate?.count || 0;
  const rating = data?.reviews_aggregate?.aggregate?.sum?.rating || 0;
  const productsFlowers = data?.products_flowers || [];
  const productsSeeds = data?.products_seeds || [];
  const productsPrerolls = data?.products_prerolls || [];
  const productsEdibles = data?.products_edibles || [];
  const productsTopicals = data?.products_topicals || [];
  const productsGear = data?.products_gear || [];
  // const productsMisc = data?.products_misc || [];
  const reviews = data?.reviews || [];
  const r = reviews.map(o => o.rating);
  const collectReviews = r.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});

  const suggestions = data?.suggestions || [];
  return (
    <Container
      sx={{
        width: 420,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 420,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Content>
        {data.name && <H1>{data.name}</H1>}
        <RatingBlock>
          <Rating value={rating / count} size={30} />
          <RatingValue>{getAvgReviewsInString(rating / count)}</RatingValue>
        </RatingBlock>
        {data.city && (<SCLink href="#">{`${data.city} ${t('Details.store')}`}</SCLink>)}
        {businessImages.length > 0 && (
            <LogoContainer>
              <Logo
                alt="image"
                src={`https://i.weed.th/ii/${businessImages[0]}/800x800`}
                width="100%"
              /> 
            </LogoContainer>
        )}
        {googleImages.length > 0 && (
          <GoogleImagesBlock>
            {googleImages.slice(0, 4).map((o, i) => (
              <GoogleImagesContainer key={i}>
                <Logo
                  alt="image"
                  src={`https://i.weed.th/ii/${o}/200x200`}
                  width="100%"
                />
            </GoogleImagesContainer>
            ))}
          </GoogleImagesBlock>
        )}
        <Contacts>
          {data.google_url && <Badge type={BadgeType.Location} href={data.google_url} target='_blank' />}
          {data.phone && <Badge type={BadgeType.Call} href={`tel://${data.phone}`} />}
          {data.website && <Badge type={BadgeType.Attach} href={data.website} target='_blank' />}
          {/* {data.line && <Badge type={BadgeType.Url} href={`https://line.me/ti/p/~${data.line}`} target='_blank' />} */}
          {data.facebook && <Badge type={BadgeType.Fb} href={data.facebook} target='_blank' />}
        </Contacts>
        {data.description && <Description>{data.description}</Description>}
        {openingHours.length > 0 && (
          <>
            <H3>{t('Details.opening')}</H3>
          </>
        )}
        {productsFlowers.length > 0 && (
          <Body>
            <Label>{t('Details.flowers')}</Label>
            <ContentBlock>
              {productsFlowers.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {productsSeeds.length > 0 && (
          <Body>
            <Label>{t('Details.seeds')}</Label>
            <ContentBlock>
              {productsSeeds.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {productsPrerolls.length > 0 && (
          <Body>
            <Label>{t('Details.prerolls')}</Label>
            <ContentBlock>
              {productsPrerolls.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {productsEdibles.length > 0 && (
          <Body>
            <Label>{t('Details.edibles')}</Label>
            <ContentBlock>
              {productsEdibles.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {productsTopicals.length > 0 && (
          <Body>
            <Label>{t('Details.topicals')}</Label>
            <ContentBlock>
              {productsTopicals.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {productsGear.length > 0 && (
          <Body>
            <Label>{t('Details.gear')}</Label>
            <ContentBlock>
              {productsGear.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )}
        {/* {productsMisc.length > 0 && (
          <Body>
            <Label>{t('Details.misc')}</Label>
            <ContentBlock>
              {productsMisc.map((o, i) => <FlowerFull index={i}  key={i} data={o} />)}
            </ContentBlock>
          </Body>
        )} */}
        <H3>{t('Details.summary')}</H3>
        <Centred>
          <CircularProgressWithLabel size={180} color='warning' value={(getRatingWithoutRound(rating / count) / 5) * 100}>
            <Number>
              {getAvgReviewsInString(rating / count, '0.0')}
            </Number>
            <div>
              <Rating value={rating / count} size={18} color="#ed6c03" />
            </div>
          </CircularProgressWithLabel>
          <Total>
            {getCountReviewsInString(count)}
          </Total>
        </Centred>
        {reviews.length > 0 && (
          <>
            <LinearProgressRating color='warning' total={count} value={collectReviews[5] || 0} label={t('Details.5stars')} />
            <LinearProgressRating color='warning' total={count} value={collectReviews[4] || 0} label={t('Details.4stars')} />
            <LinearProgressRating color='warning' total={count} value={collectReviews[3] || 0} label={t('Details.3stars')} />
            <LinearProgressRating color='warning' total={count} value={collectReviews[2] || 0} label={t('Details.2stars')} />
            <LinearProgressRating color='warning' total={count} value={collectReviews[1] || 0} label={t('Details.1star')} />
            {reviews.map((o, i) => <Review key={i} data={o} />)}
            <NoMoreBlock>{t('Details.noMore')}</NoMoreBlock>
          </>
        )}
        {suggestions.length > 0 && (
          <>
            <H3>{t('Details.nearby')}</H3>
            <NearbyBlock>
              {suggestions.map((o, i) => <NearByShops key={i} data={o} />)}
            </NearbyBlock>
          </>
        )}
      </Content>
    </Container>
  );
}
