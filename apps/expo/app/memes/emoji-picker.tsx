import React from 'react'
import { Stack } from 'expo-router'
import EmojiPickerModal from '../../components/EmojiPickerModal'

export default function EmojiPickerPage() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <EmojiPickerModal />
    </>
  )
}
