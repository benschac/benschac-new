import { YStack, Text, Theme, XStack, H3, Spacer, Separator, useTheme } from '@my/ui'
import Color from 'color'
import { Home, ChevronRight, Settings, Folder, PawPrint, Paperclip } from '@tamagui/lucide-icons'
import { IconProps } from '@tamagui/helpers-icon'
import { Stack } from 'expo-router'
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  SharedValue,
  withTiming,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import React from 'react'
import { useWindowDimensions } from 'react-native'

const ITEMS = [
  {
    label: 'first',
    icon: Home,
  },
  {
    label: 'pizza',
    icon: PawPrint,
  },
  {
    label: 'cool-beans',
    icon: Folder,
  },
  {
    label: 'poodle',
    icon: Paperclip,
  },
  {
    label: 'rain',
    icon: Settings,
  },
]

const AnimatedYStack = Animated.createAnimatedComponent(YStack)
// const AnimatedChevron = Animated.createAnimatedComponent(ChevronRight)

function Item(props: {
  idx: number
  isOpen: SharedValue<boolean>
  icon: React.FC<IconProps>
  label: string
  dropdownItemsCount: number
}) {
  const { icon: Icon, idx, isOpen } = props
  const theme = useTheme()
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()
  const HEIGHT = 85
  const MARGIN = 10
  const expandedTop = (HEIGHT + MARGIN) * idx
  const fulldropdownHeight = props.dropdownItemsCount * (HEIGHT - MARGIN)
  const collapsedTop = fulldropdownHeight / 2 - HEIGHT
  const expandedScale = 1
  const collapsedBg = Color(theme.accentBackground.val)
    .lighten(idx * 0.01)
    .hex()
  const expandedBg = theme.accentBackground.val
  const collapsedScale = 1 - idx * 0.05

  const rStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isOpen.value ? expandedTop : collapsedTop),
      backgroundColor: withTiming(isOpen.value ? expandedBg : collapsedBg),
      transform: [
        { scale: withSpring(isOpen.value ? expandedScale : collapsedScale) },
        { translateY: fulldropdownHeight / 2 },
      ],
    }
  }, [])
  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withTiming(isOpen.value ? '90deg' : '0deg') }],
    }
  })

  return (
    <AnimatedYStack
      onPress={() => {
        if (idx === 0) {
          isOpen.value = !isOpen.value
        }
      }}
      zi={props.dropdownItemsCount - idx}
      style={[rStyle]}
      h={HEIGHT}
      w={windowWidth * 0.95}
      pos="absolute"
      br="$3"
      ai="center"
      jc="center"
      top={collapsedTop}
    >
      <XStack ai="center" jc="center">
        {idx === 0 && <Spacer flex />}
        <Spacer size="$2" />
        <Icon />
        <Spacer />
        <H3>{props.label}</H3>
        {idx === 0 && (
          <>
            <Spacer flex />
            <Animated.View style={arrowStyle}>
              <ChevronRight />
            </Animated.View>
            <Spacer size="$2" />
          </>
        )}
      </XStack>
    </AnimatedYStack>
  )
}

function ItemList(props: { children: React.ReactNode }) {
  const { children } = props
  return <YStack ai="center">{children}</YStack>
}

export default function StackedListScreen() {
  const isOpen = useSharedValue(false)

  const handleClick = () => {
    console.log(isOpen.value)
    isOpen.value = !isOpen.value
  }

  return (
    <>
      <Stack.Screen />
      <YStack bg="red">
        <ItemList>
          {ITEMS.map((item, idx) => {
            return (
              <Item
                dropdownItemsCount={ITEMS.length}
                key={item.label}
                isOpen={isOpen}
                idx={idx}
                label={item.label}
                icon={item.icon}
              />
            )
          })}
        </ItemList>
      </YStack>
    </>
  )
}
