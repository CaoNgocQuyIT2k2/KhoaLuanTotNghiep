// _app.js

import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";

import React from 'react';
import Script from 'next/script';
import MyApp from '../../SSRProvider';

const App = ({ Component, pageProps }) => {
  return (
    <>
      {/*  Global site tag (gtag.js) - Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E448GXQHG8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-E448GXQHG8');
        `}
      </Script>
      <MyApp Component={Component} pageProps={pageProps} />
    </>
  );
};

export default App;
