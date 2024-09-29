import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackButtonMenuEnabled: true }}>
      {/* Remove the specific screen name */}
    </Stack>
  )
}
