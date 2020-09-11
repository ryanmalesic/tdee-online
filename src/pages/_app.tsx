import '../scss/styles.scss';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import fetcher from '../utils/fetch';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
