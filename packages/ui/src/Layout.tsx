import { SwitchThemeButton } from '@my/ui'
import type { GestureReponderEvent } from '@tamagui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { YStack, Text, XStack, Spacer, ThemeName, View, Theme, H3 } from 'tamagui'

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

const Header = () => {
  const router = useRouter()
  const [headerHover, setHeaderHover] = React.useState(false)
  const randomNumber0to4 = () => Math.floor(Math.random() * 5)
  const altThemeNames = [
    'blue_alt1',
    'yellow_alt2',
    'green_alt1',
    'purple_alt2',
    'red_alt1',
  ] as ThemeName[]
  const orderOfThemes = React.useMemo(() => {
    const themes = [...altThemeNames]
    const theme = themes.splice(randomNumber0to4(), 1)
    return [...theme, ...themes]
  }, [])
  /* From https://css.glass */
  // background: rgba(255, 255, 255, 0.09);
  // border-radius: 16px;
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  // backdrop-filter: blur(8.2px);
  // -webkit-backdrop-filter: blur(8.2px);
  // border: 1px solid rgba(255, 255, 255, 0.37);
  return (
    <>
      <Spacer size="$4" />
      <YStack
        zi={1}
        backdropFilter="blur(3.8px)"
        // @ts-expect-error TODO: add sticky to tamagui core
        pos="sticky"
        t="$4"
        bg="rgba(255, 255, 255, 0.07)"
        borderRadius="$10"
        borderCurve="continuous"
        shadowColor="$shadowColor"
        shadowRadius="$3"
        mx="$10"
        px="$6"
        tag="header"
        jc="center"
      >
        <XStack
          key="header"
          animation="slow"
          enterStyle={{ x: -5, o: 0 }}
          exitStyle={{ x: -5, o: 0 }}
          columnGap="$4"
          ai="center"
          tag="nav"
          px="$5"
          py="$6"
          pos="relative"
        >
          <View
            pos="relative"
            ai="center"
            onPress={() => {
              router.push('/')
            }}
            onMouseEnter={() => setHeaderHover(true)}
            onMouseLeave={() => setHeaderHover(false)}
          >
            <Theme name={orderOfThemes[4]}>
              <H3
                y={headerHover ? -4 : 0}
                x={headerHover ? 4 : 0}
                pos="absolute"
                color="$color"
                fontFamily="$body"
                size="$9"
                animation="slow"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
            <Theme name={orderOfThemes[3]}>
              <H3
                y={headerHover ? -4 : 0}
                x={headerHover ? 4 : 0}
                color="$color"
                fontFamily="$body"
                size="$9"
                animation="slow"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
            <Theme name={orderOfThemes[2]}>
              <H3
                y={0}
                x={0}
                color="$color"
                letterSpacing={-0.4}
                animation="slow"
                fontFamily="$body"
                size="$9"
                pos="absolute"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
            <Theme name={orderOfThemes[1]}>
              <H3
                y={headerHover ? -2 : 0}
                x={headerHover ? 2 : 0}
                color="$color"
                letterSpacing={-0.4}
                fontFamily="$body"
                size="$9"
                animation="slow"
                pos="absolute"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
            <Theme name={orderOfThemes[0]}>
              <H3
                y={headerHover ? -4 : 0}
                x={headerHover ? 4 : 0}
                fontFamily="$body"
                size="$9"
                animation="slow"
                pos="absolute"
                color="$color"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
            <Theme>
              <H3
                y={headerHover ? -6 : 0}
                x={headerHover ? 6 : 0}
                animation="slow"
                fontFamily="$body"
                size="$9"
                pos="absolute"
                color="$color"
              >
                {'bensch.ac'}
              </H3>
            </Theme>
          </View>
          <Spacer flex />
          {/* <Link href="/about">about</Link> */}
          {/* <Link href="/blog">blog</Link> */}
          {/* <Link href="/uses">uses</Link> */}
          <SwitchThemeButton />
        </XStack>
      </YStack>
    </>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // @ts-expect-error - minHeight is not in the theme
    <YStack
      br="$radius.2"
      bg="$backgroundFocus"
      mih="100vh"
      px="$4"
      $sm={{
        px: '$0',
      }}
    >
      <Theme name="green">
        <Theme name="alt1">
          <Spacer size="$4" />
          <YStack f={1}>
            <Header />
            <Spacer size="$4" />
            <YStack f={1} tag="main">
              {children}
            </YStack>
          </YStack>
        </Theme>
      </Theme>
    </YStack>
  )
}
