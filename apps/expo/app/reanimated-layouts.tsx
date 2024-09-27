import React from 'react'
import { Stack } from 'expo-router'
import { SafeArea } from './index'
import { H1, YStack } from '@my/ui'

export default function ReanimatedLayoutsPage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Layout Effects',
        }}
      />
      <SafeArea>
        <YStack f={1} jc="center" ai="center">
          <H1>Layout Effects</H1>
        </YStack>
      </SafeArea>
    </>
  )
}
