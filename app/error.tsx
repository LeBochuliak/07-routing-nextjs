'use client';

import css from '../components/Error/Error.module.css';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      <h2>There was an error, please try again...</h2>
      <p className={css.text}>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
