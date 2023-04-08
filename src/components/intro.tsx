import SC from '@emotion/styled';
import React from 'react';
import {Element} from 'react-scroll';

import {maxDevice, minDevice, theme} from '../styles';
import {Label, Section,Text} from './common';

const Container = SC.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const Layout = SC(Section)`
  background: rgb(0,0,0);
  background: linear-gradient(0.69deg, #000000 0.73%, rgba(0, 0, 0, 0) 38.64%), linear-gradient(180deg, rgba(0, 5, 24, 0.67) 0%, rgba(0, 36, 52, 0.0201) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.67) 0%, rgba(0, 0, 0, 0.3015) 100%);
  display: flex;
  align-items: flex-end;
  padding: 120px 140px 90px 140px;
  @media ${maxDevice.tablet} {
    align-items: flex-start;
    padding: 120px 30px 90px 30px;
  }
  @media ${maxDevice.mobileL} {
    align-items: flex-start;
    padding: 90px 30px 90px 30px;
  }
`;

const Content = SC.div`
  @media ${minDevice.tablet} {
    width: 560px;
  }
`;

export const Intro = props => (
  <Element name="intro">
    <Container>
      <Layout>
        <div>
          <Content>
            <Label color={theme.colors.White}>Сайт в фазе разработки</Label>
            <Text color={theme.colors.White}>
              Зайдите позже или обновите страницу
            </Text>
          </Content>
        </div>
      </Layout>
    </Container>
  </Element>
);
