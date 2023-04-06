import SC from '@emotion/styled';
import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import {Page} from '../components';
import {Icon} from '../components/icon';
import {maxDevice} from '../styles';

const Title = SC.div`
  white-space: pre-line;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 72px;
  color: #1f2326;
  @media ${maxDevice.tablet} {
    font-size: 40px;
    line-height: 48px;
  }
  @media ${maxDevice.mobileL} {
    font-size: 30px;
    line-height: 36px;
  }
`;
const Text = SC.div`
  width: 560px;
  margin-top: 40px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #22262A;
  @media ${maxDevice.tablet} {
    width: 370px;
    margin-top: 30px;
    font-size: 20px;
    line-height: 28px;
  }
  @media ${maxDevice.mobileL} {
    width: auto;
    margin-top: 30px;
    font-size: 16px;
    line-height: 20px;
  }
`;

const NotFound = SC(Icon)`
  @media ${maxDevice.mobileL} {
    width: 90%;
  }
`;
const Img = SC.div`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  // Add custom props here
};

const NotFoundPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {t} = useTranslation('common');
  return (
    <Page>
      <div>
        <Title>{t('NotFoundPage.title')}</Title>
        <Text>
          {t('NotFoundPage.text')}
          <Link rel="canonical" href="/" passHref>
            {t('NotFoundPage.link')}
          </Link>
        </Text>
      </div>
      <Img>
        <NotFound name="notFound" size="260" />
      </Img>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'ru', ['common'])),
  },
});

export default NotFoundPage;
