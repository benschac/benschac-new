import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { SafeArea, Settings } from './index'
import { YStack, Input, Button, Paragraph } from '@my/ui'
import { Image } from '@tamagui/lucide-icons'

export default function SVGConverterPage() {
  const [inputSVG, setInputSVG] = useState('')
  const [outputSVG, setOutputSVG] = useState('')

  const handleConvert = () => {
    // Here you would implement the actual SVG conversion logic
    // For now, we'll just set the output to be the same as the input
    setOutputSVG(inputSVG)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'SVG Converter',
          navigationBarHidden: true,
          headerBackTitleVisible: false,
        }}
      />
      <SafeArea>
        <YStack f={1} p="$4" space="$4">
          <Input
            placeholder="Paste your SVG code here"
            value={inputSVG}
            onChangeText={setInputSVG}
            multiline
            numberOfLines={5}
          />

          <Button icon={Image} onPress={handleConvert}>
            Convert
          </Button>

          {outputSVG && (
            <>
              <Settings.SubTitle>Converted SVG:</Settings.SubTitle>
              <Paragraph>{outputSVG}</Paragraph>
            </>
          )}
        </YStack>
      </SafeArea>
    </>
  )
}
