import { YStack, Paragraph } from '@my/ui'
import { Stack } from 'expo-router'
export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <YStack center bg="red" color="white">
        <Paragraph color="white">Hello, world!</Paragraph>
      </YStack>
      <YStack ai="center" jc="center" bg="$background" f={1}>
        <Paragraph>Hello, world!</Paragraph>
      </YStack>
    </>
  )
}
