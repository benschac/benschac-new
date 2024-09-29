/**
 * Feature: make list items toggle: compact, large, default
 *
 * - animate the transition
 * - use variants and static properties to define the list item size changes
 * - [x] use a button group to toggle the size
 *
 */
import React, { useState } from 'react'
import {
  XStack,
  ScrollView,
  Group,
  Spacer,
  SizeTokens,
  createStyledContext,
  useTheme,
  Button,
} from '@my/ui'
import { Settings } from '@my/ui/src/Settings.native'
import { useRouter } from 'solito/router'
import { Stack } from 'expo-router'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { groupOne } from '../constants'

export const ButtonContext = createStyledContext({
  size: '$5' as SizeTokens,
  color: 'green' as 'red' | 'blue' | 'green',
})

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

export default function IndexPage() {
  const router = useRouter()

  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [color, setColor] = useState<'alt1' | 'alt2'>('alt1')
  const height = size === 'sm' ? '$2' : size === 'md' ? '$6' : '$10'
  console.log(height)

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <SafeArea>
        <Spacer />
        <ScrollView>
          <Settings animation="bouncy">
            <Settings.Props size={size} color={color}>
              <Settings.Group animation="bouncy">
                {groupOne.map((item, idx) => {
                  return (
                    <Settings.Item
                      key={item.title}
                      onPress={() => router.push(item.route)}
                      iconAccentColor={item.color}
                      icon={<item.icon />} // Pass the icon as a ReactElement
                    >
                      {item.title}
                    </Settings.Item>
                  )
                })}
              </Settings.Group>
            </Settings.Props>
          </Settings>
          <Spacer />
          <Group f={1} jc="center" ai="center" elevate orientation="horizontal">
            <Group.Item>
              <Button onPress={() => setColor('alt1')}>alt1</Button>
            </Group.Item>
            <Group.Item>
              <Button onPress={() => setColor('alt2')}>alt2</Button>
            </Group.Item>
          </Group>
          <Spacer size="$4" />
          <XStack jc="center" ai="center">
            <Group f={1} jc="center" ai="center" elevate orientation="horizontal">
              <Group.Item>
                <Button onPress={() => setSize('sm')}>compact</Button>
              </Group.Item>
              <Group.Item>
                <Button onPress={() => setSize('md')}>default</Button>
              </Group.Item>
              <Group.Item>
                <Button onPress={() => setSize('lg')}>spacious</Button>
              </Group.Item>
            </Group>
          </XStack>
        </ScrollView>
      </SafeArea>
    </>
  )
}
