// pages/_app.tsx

import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import './styles.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: React.FC;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type ChildrenComponent = ({ children }: { children: ReactNode }) => JSX.Element;

const DefaultLayout: ChildrenComponent = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PageLayout: ChildrenComponent = Component.Layout || DefaultLayout;

  return (
    <>
      <Head>
        <title>Welcome to reader!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </MantineProvider>
    </>
  );
}
