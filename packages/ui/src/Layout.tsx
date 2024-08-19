import { SwitchThemeButton, Navigation } from '@my/ui'
import type { GestureReponderEvent } from '@tamagui/core'
import { useRouter } from 'solito/router'
import React from 'react'
import { YStack, Text, XStack, Spacer, ThemeName, View, Theme, H3 } from '.'

export const Link = ({
  href,
  tag = 'a',
  ...props
}: {
  href: string
  children: React.ReactNode
  tag?: string
}) => {
  const router = useRouter()
  const handlePress = (event: GestureReponderEvent) => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <Text
      tag={tag}
      onPress={handlePress}
      cursor="pointer"
      // @ts-expect-error - inhert type is fucked
      lineHeight="inherit"
      {...props}
    />
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <YStack
      br="$radius.2"
      bg="$backgroundFocus"
      // @ts-expect-error - minHeight is not in the theme
      mih="100vh"
      px="$4"
      $sm={{
        px: '$0',
      }}
    >
      <Spacer size="$4" />
      <YStack f={1}>
        <Navigation />
        <Spacer size="$2" />
        <YStack f={1} tag="main">
          {children}
        </YStack>
      </YStack>
    </YStack>
  )
}
