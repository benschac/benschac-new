import React from 'react'
import { YStack, Button } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'

export default function CircleButton({ onPress }) {
  return (
    <YStack
      width={84}
      height={84}
      marginHorizontal={60}
      borderWidth={4}
      borderColor="#ffd33d"
      borderRadius={42}
      padding={3}
    >
      <Button
        flex={1}
        justifyContent="center"
        alignItems="center"
        borderRadius={42}
        backgroundColor="#fff"
        onPress={onPress}
        unstyled
      >
        <Plus size={38} color="#25292e" />
      </Button>
    </YStack>
  )
}
