import { Stack } from 'expo-router'
import { Button, Text, useTheme } from '@my/ui'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image } from 'expo-image'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
export function SafeArea({
  children,
  ...props
}: { children: React.ReactNode } & SafeAreaViewProps) {
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background?.val }} {...props}>
      {children}
    </SafeAreaView>
  )
}

export default function PinataPage() {
  const [image, setImage] = useState<string>()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const [asset] = result.assets
      setImage(asset.uri)
    }
  }
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
        <Button onPress={pickImage}>pick</Button>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        <Text>Hello</Text>
      </SafeArea>
    </>
  )
}
