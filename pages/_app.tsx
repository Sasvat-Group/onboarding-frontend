import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import {
  setCurrentUser,
  loadUserPermissions,
} from '../store/modules/userSlice';

import 'antd/dist/antd.less';
import '../styles/globals.css';

import { useEffect } from 'react';

const getAllInitData = async () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (typeof window !== 'undefined' && token) {
    store.dispatch(setCurrentUser(token));
    const temp = await store.dispatch(loadUserPermissions());
  }
};

getAllInitData();

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.getElementById('__next')!.className = 'min-h-screen';
  }, []);

  return (
    <Provider store={store}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
  );
};

export default MyApp;
