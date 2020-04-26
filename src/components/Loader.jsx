import React from "react";
import {useTranslation} from 'react-i18next'

const Loader = () => {
  const {t} = useTranslation();
  return <div className="col d-flex flex-row justify-content-center">
    {t('loading')}
  </div>
};

export default Loader;