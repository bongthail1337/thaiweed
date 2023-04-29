import {useTranslation} from 'next-i18next';

export const useFlowerAttr = (data) => {
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
  return attr.map((o) => o.value > 0 ? `- ${o.value}${o.value > 100 ? 'mg' : '%'} ${o.label.toUpperCase()}`: '').join(' ');
};
