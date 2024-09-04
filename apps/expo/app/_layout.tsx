import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from 'app/provider'
import { NativeToast } from '@my/ui/src/NativeToast'
import { usePersistNavigationState } from 'app/hooks/persist-expo-router-state.native'

export const unstable_settings = {
  initialRouteName: 'index',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
    <Provider>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const initialState = usePersistNavigationState()

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
