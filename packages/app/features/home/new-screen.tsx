import { H1, Image, Layout, XStack, YStack, styled, Circle, Spacer, Paragraph, H3 } from '@my/ui'

import { Twitter, NotepadText, Linkedin, Github, Rss, Space, X, Pen } from '@tamagui/lucide-icons'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useLink } from 'solito/navigation'
import { useRouter } from 'solito/router'

const Grid = styled(YStack, {
  tag: 'grid',
  width: '100%',
  // @ts-expect-error
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$4',
  $sm: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const Aside = styled(YStack, {
  tag: 'aside',
  bg: 'rgba(255, 255, 255, 0.07)',
  width: '40%',
  ai: 'center',
  borderColor: '$accentBackground',
  minWidth: 250,
  maxWidth: 300,
  style: {
    WebkitBackdropFilter: 'blur(3.8px)',
  },
  backdropFilter: 'blur(3.8px)',
  gap: '$4',
  shadowRadius: '$4',
  padding: '$4',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.9,
  borderRadius: '$4',
  $sm: {
    flexDirection: 'row',
    w: '100%',
    minWidth: '100%',
  },
})

const Main = styled(XStack, {
  tag: 'main',
  flex: 1,
  display: 'flex',
  maxWidth: '100%',
  minWidth: 250,
  gap: '$4',
})

const GridItem = styled(YStack, {
  position: 'relative',
  backgroundColor: '$backgroundHover',
  borderRadius: '$4',
  padding: '$4',
  shadowRadius: '$4',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 10 },
  hoverStyle: {
    cursor: 'pointer',
  },
  shadowOpacity: 0.9,
  opacity: 0.9,
  variants: {
    twitter: {
      true: {
        background: '#1DA1F2',
        color: 'white',
      },
    },
    linkedin: {
      true: {
        background: '#0072b1',
        color: '#fff',
      },
    },
  },
})

export function NewScreen(props: { source: MDXRemoteSerializeResult }) {
  const { source } = props
  const router = useRouter()

  const twitterLink = useLink({
    href: `https://www.twitter.com/benschac`,
  })

  const linkedInLink = useLink({
    href: `https://www.linkedin.com/in/benjaminschachter`,
  })
  const gitHubLink = useLink({
    href: `https://www.github.com/benschac`,
  })
  return (
    <Layout>
      <YStack f={1} p="$3">
        <XStack
          $sm={{
            flexDirection: 'column',
          }}
          f={1}
          rowGap="$4"
        >
          <Aside>
            <Circle size={150}>
              <Image
                h={150}
                w={150}
                src="https://avatars.githubusercontent.com/u/2502947?v=4"
                alt="Benjamin Schachter"
              />
            </Circle>
            <H3>One time, I ate a penny</H3>
          </Aside>
          <Spacer size="$4" />
          <Main>
            <Grid>
              <GridItem twitter {...twitterLink}>
                <XStack ai="center">
                  <H3>Twitter</H3>
                  <Spacer size="$4" />
                  <Twitter
                    $theme-light={{
                      color: '$background',
                    }}
                    $theme-dark={{
                      color: '$color',
                    }}
                  />
                </XStack>
              </GridItem>
              <GridItem onPress={() => router.push('/blog')}>
                <XStack ai="center">
                  <H3>Blog</H3>
                  <Spacer size="$4" />
                  <NotepadText />
                </XStack>
              </GridItem>
              <GridItem linkedin {...linkedInLink}>
                <XStack ai="center">
                  <H3>Linkedin</H3>
                  <Spacer size="$4" />
                  <Linkedin
                    $theme-light={{
                      color: '$color',
                    }}
                    $theme-dark={{
                      color: '$color',
                    }}
                  />
                </XStack>
              </GridItem>
              <GridItem bg="$color" {...gitHubLink}>
                <XStack themeInverse ai="center">
                  <H3>Github</H3>
                  <Spacer size="$4" />
                  <Github
                  // $theme-light={{
                  //   color: '$background',
                  // }}
                  // $theme-dark={{
                  //   color: '$color',
                  // }}
                  />
                </XStack>
              </GridItem>
            </Grid>
          </Main>
        </XStack>
      </YStack>
    </Layout>
  )
}
