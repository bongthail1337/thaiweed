import SC from '@emotion/styled';
import React from 'react';

import {Icon} from './icon';

const Container = SC.div`
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

const Content = SC.div`
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

const getCountReviewsInString = (count) => {
  const greaterThanZero = count === 1 ? `${count} review` : `${count} reviews`;
  return count === 0 ? 'no reviews' : greaterThanZero;
}

const normalize = (num) => (Math.round(num * 100) / 100);

const getAvgReviewsInString = (num) => {
  const avg = normalize(num);
  return Number.isNaN(avg) ? '' : `${avg.toFixed(1)} `;
}

const getRating = (num) => {
  const avg = normalize(num);
  return Number.isNaN(avg) ? 0 : Math.round(avg);
}

const Rating = ({value}) => {
  const nRating = getRating(value);
  return (
    <>
    {[...Array(5)].map((s, i) => {
      const isValid = nRating > i;
      return (<Icon key={i} name="weed" size={15} color={isValid ? 'green' : 'red'} />)
    })}
    </>
  );
}

export const PopupDetails = ({data}) => {
  const businessImages = data?.business_images || [];
  const count = data?.reviews_aggregate?.aggregate?.count || 0;
  const rating = data?.reviews_aggregate?.aggregate?.sum?.rating || 0;
  const nRating = getRating(rating / count);

  return (
    <Container>
      <Head>
        <FeaturedImage>
          <Image
            alt="image"
            src={`https://i.weed.th/ii/${businessImages[0]}/150x150`}
            width="100%"
          /> 
        </FeaturedImage>
        <Content>
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
        </Content>
      </Head>
    </Container>
  );
}
