import { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { SafeArea } from '../index'
import { Settings } from '@my/ui/src/Settings.native'
import { YStack, Input, Button, Paragraph, Text } from '@my/ui'
import { Image } from '@tamagui/lucide-icons'

export default function LilToolsPage() {
  const [inputSVG, setInputSVG] = useState('')
  const [outputSVG, setOutputSVG] = useState('')

  const handleConvert = () => {
    // Here you would implement the actual SVG conversion logic
    // For now, we'll just set the output to be the same as the input
    setOutputSVG(inputSVG)
  }
  const router = useRouter()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Lil Tools',
          navigationBarHidden: true,
          headerBackTitleVisible: false,
        }}
      />
      <SafeArea>
        <Settings>
          <Settings.Props>
            <Settings.Group>
              <Settings.Item
                onPress={() => router.push('/lil-tools/ipfs')}
                iconAccentColor="blue"
                icon={<Image />}
              >
                <Text>IPFS (Pinata) File Upload</Text>
              </Settings.Item>
            </Settings.Group>
          </Settings.Props>
        </Settings>
      </SafeArea>
    </>
  )
}
