import React from 'react'
import { H1, Theme, ThemeName, View, YStack } from 'tamagui'

export function AnimatedHeader({ children }: { children: React.ReactNode }) {
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
  return (
    <>
      <YStack>
        <View
          key="header"
          animation="slow"
          enterStyle={{ x: -5, o: 0 }}
          exitStyle={{ x: -5, o: 0 }}
          columnGap="$4"
          ai="center"
          tag="nav"
          height="20vh"
          pos="relative"
          textWrap="wrap"
          onMouseEnter={() => setHeaderHover(true)}
          onMouseLeave={() => setHeaderHover(false)}
        >
          <Theme name={orderOfThemes[4]}>
            <H1
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              pos="absolute"
              color="$color"
              fontFamily="$body"
              // size="$9"
              style={{
                transform: `translateY(-50%) translateX(-50%)`,
              }}
              width="90%"
              textAlign="center"
              top="50%"
              left="50%"
              m={0}
              wordWrap="break-word"
              display="flex"
            >
              {children}
            </H1>
          </Theme>
          <Theme name={orderOfThemes[3]}>
            <H1
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              color="$color"
              fontFamily="$body"
              // size="$9"
              animation="slow"
            >
              {children}
            </H1>
          </Theme>
          <Theme name={orderOfThemes[2]}>
            <H1
              y={0}
              x={0}
              color="$color"
              letterSpacing={-0.4}
              animation="slow"
              fontFamily="$body"
              // size="$9"
              pos="absolute"
            >
              {children}
            </H1>
          </Theme>
          <Theme name={orderOfThemes[1]}>
            <H1
              y={headerHover ? -2 : 0}
              x={headerHover ? 2 : 0}
              color="$color"
              letterSpacing={-0.4}
              fontFamily="$body"
              // size="$9"
              animation="slow"
              pos="absolute"
            >
              {children}
            </H1>
          </Theme>
          <Theme name={orderOfThemes[0]}>
            <H1
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              fontFamily="$body"
              // size="$9"
              animation="slow"
              pos="absolute"
              color="$color"
            >
              {children}
            </H1>
          </Theme>
          <Theme>
            <H1
              y={headerHover ? -6 : 0}
              x={headerHover ? 6 : 0}
              animation="slow"
              fontFamily="$body"
              // size="$9"
              pos="absolute"
              color="$color"
            >
              {children}
            </H1>
          </Theme>
        </View>
      </YStack>
    </>
  )
}
