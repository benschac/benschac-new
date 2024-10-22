import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { SafeArea } from './index'
import { CheckCircle2 } from '@tamagui/lucide-icons'
import { SizableText, XStack, Spacer, Theme } from '@my/ui'
import { AnimatePresence } from '@my/ui'
const DATA = [
  {
    name: 'Italian',
    selected: false,
  },
  {
    name: 'Indian',
    selected: false,
  },
  {
    name: 'French',
    selected: false,
  },
  {
    name: 'German',
    selected: false,
  },
  {
    name: 'Vegetarian',
    selected: false,
  },
  {
    name: 'Sushi',
    selected: false,
  },
  {
    name: 'Chinese',
    selected: false,
  },
  {
    name: 'Thai',
    selected: false,
  },
  {
    name: 'Soup',
    selected: false,
  },
  {
    name: 'Mexican',
    selected: false,
  },
]
type Item = {
  name: string
}

function Button(props: { item: Item }) {
  const { item } = props
  const [selected, setSelected] = useState(false)
  const [buttonWidth, setButtonWidth] = useState<number>(0)

  return (
    <React.Fragment key={item.name}>
      <XStack
        onPress={() => setSelected(!selected)}
        ai="center"
        bw="$0.25"
        br="$8"
        borderCurve="continuous"
        px="$4"
        mb="$4"
        w={selected ? buttonWidth + 15 : buttonWidth}
        animation="quick"
        onLayout={(e) => {
          if (e.nativeEvent.layout.width) {
            setButtonWidth(e.nativeEvent.layout.width)
          }
        }}
      >
        <SizableText size="$5">{item.name}</SizableText>
        <Spacer size="$2" />
        <Theme name="orange">
          <Theme name="alt1">
            <AnimatePresence initial={false}>
              {selected && (
                <XStack
                  animateOnly={['transform', 'opacity']}
                  animation="quick"
                  onLayout={(e) => e.nativeEvent.layout.width}
                  enterStyle={{
                    opacity: 0,
                    x: -10,
                  }}
                  exitStyle={{
                    opacity: 0,
                    x: -10,
                  }}
                >
                  <CheckCircle2
                    br="$9"
                    color="$background"
                    bg="$color"
                    enterStyle={{
                      opacity: 0,
                    }}
                    exitStyle={{
                      opacity: 0,
                    }}
                    strokeWidth={1.5}
                  />
                </XStack>
              )}
            </AnimatePresence>
          </Theme>
        </Theme>
      </XStack>
      <Spacer />
    </React.Fragment>
  )
}

export default function ReanimatedLayoutsPage() {
  const [data, setData] = useState(DATA)
  return (
    <>
      <Stack.Screen
        options={{
          title: 'tamagui layout effect',
        }}
      />
      <SafeArea>
        <Spacer size="$4" />
        <XStack px="$0.5" fw="wrap" f={1} jc="center" ai="center">
          {data.map((item, idx) => {
            return <Button key={idx} item={item} />
          })}
        </XStack>
      </SafeArea>
    </>
  )
}
