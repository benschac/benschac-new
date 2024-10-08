import { Stack } from 'expo-router'
import { SafeArea } from './index'
import { Settings } from '@my/ui/src/Settings.native'
import { YStack } from '@my/ui'
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
                iconAccentColor="alt1"
                icon={rootTheme === 'light' ? <Moon /> : <Sun />}
                onPress={() => {
                  if (typeof setRootTheme === 'function') {
                    setRootTheme?.(rootTheme === 'light' ? 'dark' : 'light')
                  }
                }}
              >
                Toggle Theme
              </Settings.Item>
            </Settings.Group>
            {/* <Settings.Group>
              <Settings.Item
                // @ts-expect-error - icon prop is missing
                icon={Code2}
                onPress={() => {}}
                iconBackground="active"
                isActive={false}
                title="Debug Menu"
                subTitle="Developer Tools"
              >
                Developer Tools
              </Settings.Item>
            </Settings.Group> */}
          </Settings>
        </YStack>
      </SafeArea>
    </>
  )
}
