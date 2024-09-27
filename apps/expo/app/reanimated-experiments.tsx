import { Stack } from 'expo-router'
import { Button, H1, YStack } from '@my/ui'
import { useRouter } from 'solito/router'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { SafeArea } from './index'

export default function ReanimatedExperimentsPage() {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    }
  })

  const handleAnimate = () => {
    offset.value = withSpring(offset.value + 50)
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Reanimated Experiments',
        }}
      />
      <SafeArea>
        <YStack f={1} jc="center" ai="center" gap>
          <H1>Reanimated Experiments</H1>
          <Animated.View
            style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyles]}
          />
          <Button onPress={handleAnimate}>Animate</Button>
        </YStack>
      </SafeArea>
    </>
  )
}
