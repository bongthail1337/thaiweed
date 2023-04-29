import SC from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

import {Rating} from './rating';

const Root = SC.div`
  text-align: left;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const Header = SC.div`
  overflow: hidden;
`;

const Content = SC.div`
  margin-top: 20px;
  color: rgb(51, 51, 51);
  overflow: hidden;
`;

const Images = SC.div`
  overflow: hidden;
  margin-top: 20px;
  clear: left;
`;

const Image = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 3px;
  filter: unset;
`;

const ImagesContainer = SC.div`
  width: calc(25% - 4.5px);
  overflow: hidden;
  border-radius: 3px;
  margin: 2px;
  float: left;
`;

const Left = SC.div`
  float: left;
`;

const Right = SC.div`
  float: right;
  font-size: 11px;
  color: rgb(102, 102, 102);
  text-align: center;
`;

const SCLink = SC(Link)`
  font-weight: bold;
  text-decoration: none;
  color: rgb(51, 51, 51);
  line-height: 40px;
`;

const Avatar = SC.img`
  cursor: inherit;
  background-color: transparent;
  border-radius: 20px;
  filter: unset;
`;

const AvatarContainer = SC.div`
  width: 40px;
  height: 40px;
  float: left;
  border-radius: 20px;
  opacity: 1;
  margin-right: 10px;
`;

export const Review = ({data}) => {
  const images = data?.images || [];

  return (
    <Root>
       <Header>
        <Left>
          <SCLink href={data?.url}>
          <AvatarContainer>
                <Avatar
                  alt="image"
                  src={`https://i.weed.th/ii/${data?.avatar}/80x80`}
                  width="100%"
                />
            </AvatarContainer>
            {data?.author}
          </SCLink>
        </Left>
        <Right>
          <div>
            <Rating value={data?.rating} />
          </div>
          <div>{dayjs(data?.review_date).fromNow()}</div>
        </Right>
       </Header>
       <Content>{data?.content}</Content>
       {images.length > 0 && (
         <Images>
            {images.slice(0, 4).map((o, i) => (
              <ImagesContainer key={i}>
                <Image
                  alt="image"
                  src={`https://i.weed.th/ii/${o}/200x200`}
                  width="100%"
                />
            </ImagesContainer>
            ))}
         </Images> 
       )}
    </Root>
  );
}
