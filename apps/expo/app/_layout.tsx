import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from 'app/provider'
import { NativeToast } from '@my/ui/src/NativeToast'
import { usePersistNavigationState } from 'app/hooks/persist-expo-router-state.native'
import { useSentryInit } from 'app/hooks/useSentryInit.native'
import ErrorBoundary from '../components/ErrorBoundary'
import * as Sentry from '@sentry/react-native'

Sentry.init({
  dsn: 'https://62737aa119098c67e0ae7ae2c1db6ea1@o4507895126294528.ingest.us.sentry.io/4507895138025472',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
})

export const unstable_settings = {
  initialRouteName: 'index',
}

SplashScreen.preventAutoHideAsync()

function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <ErrorBoundary>
      <Provider>
        <RootLayoutNav />
      </Provider>
    </ErrorBoundary>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const initialState = usePersistNavigationState()
  useSentryInit()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName={__DEV__ && initialState ? undefined : 'index'}
        screenOptions={{ headerShown: false }}
      />
      <NativeToast />
    </ThemeProvider>
  )
}

export default Sentry.wrap(RootLayout)
