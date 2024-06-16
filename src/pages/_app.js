import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Spinner from "../components/common/Spinner";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
      <Spinner/>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
