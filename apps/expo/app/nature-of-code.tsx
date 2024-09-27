import React from 'react'
import { Stack } from 'expo-router'
import { SafeArea } from './index'
import { H1, YStack } from '@my/ui'

export default function NatureOfCodePage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Drawing With Skia',
        }}
      />
      <SafeArea>
        <YStack f={1} jc="center" ai="center">
          <H1>Drawing With Skia</H1>
        </YStack>
      </SafeArea>
    </>
  )
}
