import { useState, useMemo } from 'react'
import { Button, useIsomorphicLayoutEffect, Text } from 'tamagui'
import { useThemeSetting, useRootTheme } from '@tamagui/next-theme'
type Themes = 'light' | 'dark' | 'system'

export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting()
  const [theme] = useRootTheme()

  // would be nice if this was a little narrower
  const [clientTheme, setClientTheme] = useState('light')

  // https://react.dev/reference/react/useLayoutEffect
  // useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.
  useIsomorphicLayoutEffect(() => {
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme)
  }, [themeSetting.current, themeSetting.resolvedTheme])

  const icon = useMemo(() => {
    if (clientTheme === 'light') {
      return '🌞'
    } else if (clientTheme === 'dark') {
      return '🌚'
    } else {
      return '🌗'
    }
  }, [clientTheme])

  return (
    <Button
      chromeless
      pressStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
      hoverStyle={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      }}
      onPress={themeSetting.toggle}
    >
      <Button.Icon>
        <Text>{icon}</Text>
      </Button.Icon>
    </Button>
  )
}
