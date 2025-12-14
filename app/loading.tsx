'use client';

import { ClipLoader } from 'react-spinners';
import css from '../components/Loader/Loader.module.css';

const Loading = () => {
  return (
    <div className={css.backdrop}>
      <ClipLoader />
    </div>
  );
};

export default Loading;
