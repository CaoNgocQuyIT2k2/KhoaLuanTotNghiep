import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    console.log('NEXT_PUBLIC_BASEPATH:', process.env.NEXT_PUBLIC_BASEPATH);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
