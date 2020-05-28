import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex text-uppercase text-center align-self-center title-wrapper">
      {t('header-text')}
    </div>
  );
};

export default Title;
