import '@tamagui/core/reset.css'
import { Playfair_Display } from 'next/font/google'
import { Source_Serif_4, EB_Garamond } from 'next/font/google'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
// import '@tamagui-google-fonts/source-serif-4/dist/'
import 'raf/polyfill'

import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
// import { Source_Serif_4 } from 'next/font/google'

import type { SolitoAppProps } from 'solito'
import { isWeb } from 'tamagui'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const bodyFont = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--my-body-font',
})

const displayFont = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--my-display-font',
})

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  console.log(isWeb)
  return (
    <>
      <Head>
        <title>bensch.ac</title>
        <meta name="bensch.ac" content="benjamin's blog" />
        {/* TODO: update with real favicon */}
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </Head>
      <ThemeProvider>
        {getLayout(<Component {...pageProps} />)}
        {process.env.NODE_ENV !== 'production' && <GoogleAnalytics gaId="G-M7M1C0YG29" />}
      </ThemeProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      // change default theme (system) here:
      // defaultTheme="light"
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider disableRootThemeClass disableInjectCSS defaultTheme={theme}>
        <div className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</div>
      </Provider>
    </NextThemeProvider>
  )
}

export default MyApp
