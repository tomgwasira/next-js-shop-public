import * as React from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '../common/styles/globals.css';
import AuthContext from '../common/contexts/AuthContext';
import HttpCodes from '../common/HttpCodes';
import AuthDataService from '../features/auth/data';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [authDetails, setAuthDetails] = React.useState({});

  // Memoized login routine
  const login = React.useCallback(
    (userData) => {
      setAuthDetails({ isAuthenticated: true, user: userData });
    },
    [authDetails]
  );

  // Memoized logout routine
  const logout = React.useCallback(() => {
    setAuthDetails({ isAuthenticated: false, user: {} });
  }, [authDetails]);

  // Memoize the full context value
  const authContextValue = React.useMemo(
    () => ({
      authDetails,
      login,
      logout,
    }),
    [authDetails, login, logout]
  );

  // On every page load get authDetails from localStorage or set to unauthenticated state if unavailable
  React.useEffect(() => {
    const defaultAuthDetails = { isAuthenticated: false, user: {} };
    const localStorageAuthDetails = JSON.parse(window.localStorage.getItem('authDetails') || '{}');

    async function verifyTokenAndSetAuthDetails() {
      try {
        const nextApiRes = await AuthDataService.nextApiVerifyAccessToken();

        if (nextApiRes.status === HttpCodes.ok) {
          setAuthDetails(localStorageAuthDetails);
        } else {
          setAuthDetails(defaultAuthDetails);
        }
      } catch (error) {
        setAuthDetails(defaultAuthDetails);
      }
    }

    if (Object.keys(localStorageAuthDetails).length !== 0) {
      verifyTokenAndSetAuthDetails();
    } else {
      setAuthDetails(defaultAuthDetails);
    }
  }, []);

  // Update value in localStorage if authDetails is changed
  React.useEffect(() => {
    window.localStorage.setItem('authDetails', JSON.stringify(authDetails));
  }, [authDetails]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {getLayout(<Component {...pageProps} />)};
    </AuthContext.Provider>
  );
}
