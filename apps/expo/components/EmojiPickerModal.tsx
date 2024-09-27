import React from 'react'
import { Modal } from 'react-native'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { YStack } from '@my/ui'

export default function EmojiPickerModal() {
  const router = useRouter()

  return (
    <Modal visible={true} onRequestClose={() => router.back()} animationType="slide">
      <YStack style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose an Emoji</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.closeButton}>Close</Text>
          </Pressable>
        </View>
        {/* Add your emoji picker content here */}
        <Text>Emoji Picker Content</Text>
      </YStack>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '50%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: 50,
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    color: '#fff',
    fontSize: 14,
  },
})
