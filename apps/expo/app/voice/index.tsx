import { H1, YStack, useTheme } from '@my/ui'
import { Stack } from 'expo-router'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { useRouter } from 'solito/router'

export function SafeArea({
  children,
  ...props
}: { children: React.ReactNode } & SafeAreaViewProps) {
  const theme = useTheme()
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      {...props}
    >
      {children}
    </SafeAreaView>
  )
}

export default function MintPage() {
  const router = useRouter()
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackVisible: true,
          headerBackTitle: 'Back',
        }}
      />
      <SafeArea>
        <YStack px="$4" f={1} bg="$background">
          <H1>Voice</H1>
        </YStack>
      </SafeArea>
    </>
  )
}
