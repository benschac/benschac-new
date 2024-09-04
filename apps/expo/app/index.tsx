import React, { useCallback, useRef } from 'react'
import { Home, ChevronRight, Camera } from '@tamagui/lucide-icons'
import {
  YStack,
  Paragraph,
  withStaticProperties,
  H3,
  createStyledContext,
  Button,
  Theme,
  getTokens,
  XStack,
  Spacer,
  useTheme,
} from '@my/ui'
import { useRouter } from 'solito/router'
import { Stack } from 'expo-router'
import { FlatList, View } from 'react-native'
import { styled } from '@my/ui'
import { isValidElement, useContext } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

const ItemFrame = styled(XStack, {
  px: '$4',
  py: '$4',
  ai: 'center',
  borderRadius: '$8',
  bg: '$background',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})

const ItemContext = createStyledContext({
  icon: null,
  size: '$4',
})
const ItemTitle = styled(H3, {
  fontWeight: 'bold',
})
const ItemSubTitle = styled(Paragraph, {})

const ItemIcon = (props: { children: React.ReactNode }) => {
  const { icon, size } = useContext(ItemContext.context)
  const tokens = getTokens()
  return isValidElement(props.children) ? React.cloneElement(props.children, {}) : null
}

const ItemIconRight = (props: { children: React.ReactNode }) => {
  const { icon, size } = useContext(ItemContext.context)
  const tokens = getTokens()
  return isValidElement(props.children) ? React.cloneElement(props.children, {}) : null
}

const Item = withStaticProperties(ItemFrame, {
  Title: ItemTitle,
  SubTitle: ItemSubTitle,
  Icon: ItemIcon,
  IconRight: ItemIconRight,
})
export function SafeArea({
  children,
  ...props
}: { children: React.ReactNode } & SafeAreaViewProps) {
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }} {...props}>
      {children}
    </SafeAreaView>
  )
}

export default function IndexPage() {
  const router = useRouter()
  const metaData = [
    {
      title: 'NFT Camera',
      subTitle: 'This is a test',
      onPress: () => {
        router.push('/mint')
      },
      icon: <Camera />,
    },
    {
      title: 'Hello, world!',
      subTitle: 'This is a test',
      onPress: () => {},
      icon: <Home />,
    },
    {
      title: 'Hello, world!',
      subTitle: 'This is a test',
      onPress: () => {},
      icon: <Home />,
    },
  ]
  // ref for the bottom sheet modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = ['25%', '50%']

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeArea>
        {/* <BottomSheetModalProvider> */}
        <YStack bg="$background" f={1}>
          <Button
            onPress={() => {
              throw new Error('Test Sentry Error')
            }}
          >
            Test Sentry Error
          </Button>
          <FlatList
            data={metaData}
            indicatorStyle="black"
            ItemSeparatorComponent={() => <Spacer size="$4" />}
            renderItem={({ item }) => (
              <Item mx="$4" onPress={item.onPress}>
                <Item.Icon>{item.icon}</Item.Icon>
                <Spacer size="$4" />
                <Item.Title>{item.title}</Item.Title>
                <Spacer flex />
                <Item.IconRight>
                  <ChevronRight />
                </Item.IconRight>
              </Item>
            )}
            ListHeaderComponent={
              <Button onPress={handlePresentModalPress}>Open Bottom Sheet</Button>
            }
          />
          {/* <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
              <Theme name="red">
                <Theme name="active">
                  <YStack f={1} ai="center" jc="center" bg="$background">
                    <H3>Bottom Sheet Content</H3>
                    <Paragraph>This is the content of the bottom sheet modal.</Paragraph>
                  </YStack>
                </Theme>
              </Theme>
            </BottomSheetModal> */}
        </YStack>
        {/* </BottomSheetModalProvider> */}
      </SafeArea>
    </>
  )
}
