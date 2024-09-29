import React from 'react'
import { H3, Spacer, Theme, ThemeName, View, XStack, YStack } from 'tamagui'
import { SwitchThemeButton } from './SwitchThemeButton'
import { useRouter } from 'solito/router'

export const Navigation = () => {
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
        style={{
          WebkitBackdropFilter: 'blur(3.8px)',
        }}
        backdropFilter="blur(3.8px)"
        // @ts-expect-error TODO: add sticky to tamagui core
        pos="sticky"
        t="$4"
        bg="rgba(255, 255, 255, 0.07)"
        borderRadius="$4"
        shadowColor="$shadowColor"
        mx="$3"
        shadowRadius="$3"
        $sm={{
          mx: '$2',
          px: '$0',
        }}
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
          onPress={() => {
            router.push('/')
          }}
        >
          <View
            pos="relative"
            ai="center"
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
