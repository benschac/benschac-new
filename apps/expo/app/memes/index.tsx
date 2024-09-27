import { YStack, Image, Button } from '@my/ui'
import * as ImagePicker from 'expo-image-picker'
import { SafeArea } from '../voice'
import { Image as ImageIcon } from '@tamagui/lucide-icons'
import React, { useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'expo-router'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
const PlaceHolder = require('../../assets/icon.png')

export default function MemeIndexPage() {
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset>()
  const router = useRouter()
  const imgSource = image?.uri ? { uri: image.uri } : PlaceHolder
  const [visable, setVisable] = React.useState(false)
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      const [selectedImage] = result.assets ?? []
      setImage(selectedImage)
      console.info(result)
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <SafeArea>
      <BottomSheetModalProvider>
        <YStack f={1} px="$4">
          <YStack ai="center" jc="center" f={1}>
            <Image w={300} h={300} source={imgSource} />
          </YStack>
          <YStack f={1 / 3} rowGap="$4">
            <Button onPress={pickImageAsync}>
              <Button.Icon>
                <ImageIcon />
              </Button.Icon>
              Choose Photo
            </Button>
            <Button onPress={handlePresentModalPress}>Choose Emoji</Button>
            <Button>Use Photo</Button>
          </YStack>
        </YStack>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView>
            <ModalPage />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeArea>
  )
}

function ModalPage() {
  return (
    <SafeArea>
      <YStack f={1} p="$4">
        <YStack f={1} rowGap="$4"></YStack>
      </YStack>
    </SafeArea>
  )
}
import { useState } from 'react'
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native'

function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState([
    require('../../assets/emoji1.png'),
    require('../../assets/emoji2.png'),
    require('../../assets/emoji3.png'),
    require('../../assets/emoji4.png'),
    require('../../assets/emoji5.png'),
    require('../../assets/emoji6.png'),
  ])

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item)
            onCloseModal()
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})
