import React from 'react'
import { Stack } from 'expo-router'
import { YStack, H1, Paragraph } from '@my/ui'
import { SafeArea } from './index'

export default function NativeModulesScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Native Modules',
        }}
      />
      <SafeArea>
        <YStack f={1} jc="center" ai="center" p="$4" space>
          <H1>Native Modules</H1>
          <Paragraph ta="center">
            This is where you can experiment with native modules. Add your native module experiments
            here!
          </Paragraph>
        </YStack>
      </SafeArea>
    </>
  )
}
