// SSRProvider.js
import React from 'react';
import { SSRProvider } from 'react-bootstrap';

const MyApp = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
};

export default MyApp;
