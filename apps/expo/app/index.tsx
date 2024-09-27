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
  Home,
  Leaf,
  Camera,
  Settings as SettingsIcon,
  Move,
  Code2,
  Image,
} from '@tamagui/lucide-icons'
import { XStack, useTheme, ScrollView, Group, Spacer, AnimatePresence } from '@my/ui'
import { Settings } from '@my/ui/src/Settings.native'
import { useRouter } from 'solito/router'
import { Stack } from 'expo-router'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { Button } from 'tamagui'

const sizes = ['$4', '$5', '$6'] as const

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
type CustomSizes = 'sm' | 'md' | 'lg'

const groupOne = [
  {
    title: 'NFT meme Camera',
    subTitle: 'Snap a photo and mint an NFT',
    route: '/memes',
    color: 'blue',
    icon: Camera,
  },
  {
    title: 'Drawing With Skia',
    subTitle: 'Nature of Code Renders',
    route: '/nature-of-code',
    color: 'green',
    icon: Leaf,
  },
  {
    title: 'Reanimated Fun',
    subTitle: 'Experiments with reanimated',
    route: '/reanimated-experiments',
    color: 'orange',
    icon: Move,
  },
  {
    title: 'Native Modules',
    subTitle: 'Experiments with native modules',
    route: '/native-modules',
    color: 'red',
    icon: Code2,
  },
  {
    title: 'Layout Effects',
    subTitle: 'Experiments with reaminated layout',
    route: '/reanimated-layouts',
    color: 'purple',
    icon: Home,
  },
  {
    title: 'Settings',
    subTitle: 'Change your settings',
    route: '/settings',
    color: 'yellow',
    icon: SettingsIcon,
  },
  {
    title: 'SVG Converter',
    subTitle: 'Convert to SVG',
    route: '/svg-converter',
    color: 'pink',
    icon: Image,
  },
] as const

export default function IndexPage() {
  const router = useRouter()

  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [color, setColor] = useState<'active' | 'alt1' | 'alt2'>('alt1')

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
          <Settings>
            <Settings.Props size={size} color={color}>
              <Settings.Group>
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
          <Spacer />
          <Spacer />
          <XStack jc="center" ai="center">
            <Group f={1} jc="center" ai="center" elevate orientation="horizontal">
              <Group.Item>
                <Button onPress={() => setColor('alt1')}>alt1</Button>
              </Group.Item>
              <Group.Item>
                <Button onPress={() => setColor('alt2')}>alt2</Button>
              </Group.Item>
              <Group.Item>
                <Button onPress={() => setColor('active')}>active</Button>
              </Group.Item>
            </Group>
          </XStack>
        </ScrollView>
      </SafeArea>
    </>
  )
}
