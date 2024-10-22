import { fullscreenStyle, Paragraph, Spacer, Theme, XStack, YStack } from '@my/ui'
import { Stack } from 'expo-router'
import { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { IconProps } from '@tamagui/helpers-icon'
import { BookImage, Home, Settings, Beer, Dog, DollarSign } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DATA = [
  { name: 'big', icon: BookImage },
  { name: 'dog', icon: Dog },
  { name: 'home', icon: Home },
  { name: 'settings', icon: Settings },
  { name: 'beer', icon: Beer },
]

const AnimatedXStack = Animated.createAnimatedComponent(XStack)

export default function Test() {
  const HEIGHT = 80
  const MARGIN = 10
  const inset = useSafeAreaInsets()
  const isOpen = useSharedValue(false)
  const stackItemsCount = DATA.length
  const expandedList = (HEIGHT + MARGIN) * stackItemsCount
  const collapsedList = HEIGHT + MARGIN

  return (
    <>
      <Stack.Screen />
      <YStack ai="center">
        {DATA.map((item, idx) => {
          const Icon = item.icon
          const top = idx * (HEIGHT + MARGIN)
          const scaleCollapsed = 1 - idx * 0.05
          const rStyles = useAnimatedStyle(() => {
            return {
              top: withSpring(isOpen.value ? top : collapsedList),
              transform: [
                { scale: withSpring(isOpen.value ? 1 : scaleCollapsed) },
                {
                  translateY: expandedList / 2,
                },
              ],
            }
          })
          return (
            <Theme inverse key={item.name}>
              <AnimatedXStack
                onPress={() => {
                  console.log(isOpen.value)
                  isOpen.value = !isOpen.value
                }}
                background="$color"
                key={item.name}
                style={[rStyles]}
                mb={MARGIN}
                h={HEIGHT}
                w={300}
                br="$2"
                t={top}
                pos="absolute"
                ai="center"
                jc="center"
                bg="$backgroundPress"
                zi={stackItemsCount - idx}
                // lets try to figure this out, in a minute
                transform={[{ translateY: (expandedList - inset.top - 50) / 2 }]}
              >
                <Icon />
                <Spacer />
                <Paragraph>{item.name}</Paragraph>
              </AnimatedXStack>
            </Theme>
          )
        })}
      </YStack>
    </>
  )
}
