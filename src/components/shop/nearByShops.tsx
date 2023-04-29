import SC from '@emotion/styled';
import React from 'react';

import {getAvgReviewsInString, getCountReviewsInString} from '../../utils/calc';
import {Rating} from './rating';


const Root = SC.div`
  height: 50px;
  cursor: pointer;
`;

const Distance = SC.div`
  display: inline-block;
  font-weight: bold;
  padding-left: 10px;
  float: left;
  opacity: 0.4;
  padding-top: 11px;
  width: 55px;
  font-size: 12px;
  transform: translateX(-7px);
`;

const Content = SC.div`
  float: left;
  margin-top: 2px;
`;

const Avatar = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 10px;
  filter: unset;
`;

const AvatarContainer = SC.div`
  width: 40px;
  height: 40px;
  float: left;
  border-radius: 10px;
`;

const Block = SC.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  transform: translateY(-4px);
`;

const SP = SC.span`
  font-size: 10px;
  opacity: 0.7;
  padding-left: 7px;
`;

const Name = SC.div`
  font-weight: bold;
  display: block;
  padding-left: 10px;
  opacity: 0.9;
  padding-top: 0px;
  max-width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NearByShops = ({data}) => {
  const image = data?.dispensary?.image;
  const distance = data?.distance;
  const count = data?.dispensary?.reviews_aggregate?.aggregate?.count || 0;
  const rating = data?.dispensary?.reviews_aggregate?.aggregate?.sum?.rating || 0;

  return (
    <Root>
      <Distance>{`${getAvgReviewsInString(distance)}km`}</Distance>
      <AvatarContainer>
        <Avatar
          alt="image"
          src={`https://i.weed.th/ii/${image}/80x80`}
          width="100%"
        />
      </AvatarContainer>
      <Content>
        <Name>{data?.dispensary?.name}</Name>
        <Block>
          <Rating size={12} value={rating / count} /> <SP>{getAvgReviewsInString(rating / count)}({getCountReviewsInString(count)})</SP>
        </Block>
      </Content>
    </Root>
  );
}
