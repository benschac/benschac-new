import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'

import React from 'react'
import Head from 'next/head'
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import type { SolitoAppProps } from 'solito'
import { Provider } from 'app/provider'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
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
        <Component {...pageProps} />
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
        {children}
      </Provider>
    </NextThemeProvider>
  )
}

export default MyApp
