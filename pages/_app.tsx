import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Giridhar Karnik</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="The digital home of Giridhar Karnik. A Full stack react-native and web developer based in London, UK."
        />
        <meta name="keywords" content="Giridhar Karnik, Full stack developer" />
        <meta name="author" content="Giridhar Karnik" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
