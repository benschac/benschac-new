import React from 'react'
import { Stack } from 'expo-router'
import { SafeArea } from './index'
import { Settings } from '@my/ui'
import { YStack, useTheme } from '@my/ui'
import { Moon, Sun, Code2 } from '@tamagui/lucide-icons'
import { useRootTheme } from 'app/provider/theme/index.native'

export default function SettingsPage() {
  const [rootTheme, setRootTheme] = useRootTheme()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings',
          navigationBarHidden: true,
          headerBackTitleVisible: false,
          headerBlurEffect: 'systemChromeMaterialLight',
        }}
      />
      <SafeArea>
        <YStack f={1}>
          <Settings px="$2">
            <Settings.Group>
              <Settings.Item
                icon={rootTheme === 'light' ? Moon : Sun}
                onPress={() => {
                  if (typeof setRootTheme === 'function') {
                    setRootTheme?.(rootTheme === 'light' ? 'dark' : 'light')
                  }
                }}
                iconBackground="active"
                isActive={false}
                title="Dark Mode"
                subTitle="toggle theme"
              />
            </Settings.Group>
            <Settings.Group>
              <Settings.Item
                icon={Code2}
                onPress={() => {
                  if (typeof setRootTheme === 'function') {
                    setRootTheme?.(rootTheme === 'light' ? 'dark' : 'light')
                  }
                }}
                iconBackground="active"
                isActive={false}
                title="Debug Menu"
                subTitle="Developer Tools"
              />
            </Settings.Group>
          </Settings>
        </YStack>
      </SafeArea>
    </>
  )
}
