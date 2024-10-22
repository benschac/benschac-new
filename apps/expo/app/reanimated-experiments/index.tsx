import { Stack, useRouter } from 'expo-router'
import { YGroup, useTheme, Separator, ListItem } from '@my/ui'
import { TestTube, BarChart, FileStack, Star } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { SafeArea } from '../index'

export default function ReanimatedExperimentsPage() {
  const offset = useSharedValue(0)
  const theme = useTheme()

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  })

  const handleAnimate = () => {
    offset.value = withSpring(offset.value + 50)
  }

  const stackedItemsLink = useLink({
    href: '/stacked-list',
  })
  const router = useRouter()
  return (
    <>
      <Stack.Screen />
      <SafeArea style={{ backgroundColor: theme.background0.val, flex: 1 }}>
        <YGroup mx="$4" bg="$background">
          <YGroup.Item>
            <ListItem
              onPress={() => router.push('/reanimated-experiments/stacked-list')}
              title="Stacked Items"
              icon={FileStack}
              scaleIcon={2}
            />
          </YGroup.Item>
          <Separator />
          <YGroup.Item>
            <ListItem title="Bar Chart" icon={BarChart} scaleIcon={2} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              onPress={() => router.push('/reanimated-experiments/test')}
              title="Test"
              icon={TestTube}
              scaleIcon={2}
            />
          </YGroup.Item>
        </YGroup>
      </SafeArea>
    </>
  )
}
// <YGroup.Item>
//   <XStack>
//     <Theme name="red">
//       <Theme name="active">
//         <Square themeInverse bg="$background" size="$3" br="$2">
//           <Home size="$2" col="$color" />
//         </Square>
//       </Theme>
//     </Theme>
//     <Spacer size="$4" />
//     <XStack f={1}>
//       <XStack bbw={0.25} bbc="$color7" f={1}>
//         <H3>Home</H3>
//       </XStack>
//     </XStack>
//   </XStack>
// </YGroup.Item>

// <YStack f={1} jc="center" ai="center" gap>
//   <H1>Reanimated Experiments</H1>
//   <Animated.View
//     style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyles]}
//   />
//   <Button onPress={handleAnimate}>Animate</Button>
// </YStack>
