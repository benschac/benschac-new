import { useEffect } from 'react'
import { useNavigationContainerRef } from 'expo-router'
import * as Sentry from '@sentry/react-native'
import Constants from 'expo-constants'

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
  enableTimeToInitialDisplay: Constants.appOwnership !== 'expo',
})

export function useSentryInit() {
  const ref = useNavigationContainerRef()

  useEffect(() => {
    Sentry.init({
      dsn: 'https://62737aa119098c67e0ae7ae2c1db6ea1@o4507895126294528.ingest.us.sentry.io/4507895138025472',
      integrations: [
        new Sentry.ReactNativeTracing({
          routingInstrumentation,
          enableNativeFramesTracking: Constants.appOwnership !== 'expo',
        }),
      ],
      tracesSampleRate: 1.0,
      _experiments: {
        profilesSampleRate: 1.0,
      },
    })
  }, [])

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref)
    }
  }, [ref])
}
