import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  Anchor,
  Button,
  H1,
  Layout,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
  H2,
  H3,
  Image,
  Text,
  Spacer,
  H5,
  Theme,
} from '@my/ui'
import { useLink } from 'solito/navigation'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'

export function HomeScreen(props: { source: MDXRemoteSerializeResult }) {
  const { source } = props
  return (
    <Layout>
      <YStack f={1} gap="$8" p="$4">
        {/* @ts-expect-error: TODO: need to look into how mdx remote gets this type */}
        {source.map((post, idx) => {
          const blogLink = useLink({
            href: `/blog/${source[idx].source.frontmatter.slug}`,
          })
          const { title, date, description, tags } = post.source.frontmatter
          return (
            <React.Fragment key={idx}>
              <YStack cursor="pointer" {...blogLink}>
                <YStack rowGap="$2">
                  <H5 size="$6">{new Date(date as string).toLocaleDateString()}</H5>
                  <H1
                    fontStyle="italic"
                    fontSize="$12"
                    color="$color"
                    // lineHeight={1.2}
                    textShadowColor="$background"
                    textShadowRadius={2}
                    textShadowOffset={{ width: 5, height: 2 }}
                    fontWeight="400"
                    $sm={{
                      fontSize: '$9',
                    }}
                    // @ts-expect-error
                    letterSpacing="-1px"
                  >
                    {title}
                  </H1>
                  <XStack overflow="scroll" miw={0} columnGap="$2">
                    <XStack columnGap="$2">
                      {tags?.map((tag: string, idx: number) => {
                        return (
                          <Theme key={`${blogLink.href}-${tag}`}>
                            <Paragraph
                              bg="$color"
                              color="$background"
                              px="$3"
                              py="$1"
                              borderRadius="$3"
                              fontStyle="normal"
                              fontSize="$4"
                              fontWeight="400"
                              // @ts-expect-error
                              lineHeight="1.56"
                              // @ts-expect-error
                              letterSpacing="-0.54px"
                              // @ts-expect-error
                              style={{
                                textRendering: 'optimizelegibility',
                                fontSmoothing: 'antialiased',
                                WebkitFontSmoothing: 'antialiased',
                              }}
                              textRendering="optimizelegibility"
                              mt="$3"
                            >
                              {tag}
                            </Paragraph>
                          </Theme>
                        )
                      })}
                    </XStack>
                  </XStack>
                </YStack>
                <Spacer size="$4" />
                <Paragraph
                  fontStyle="normal"
                  fontSize="$5"
                  fontWeight="400"
                  // @ts-expect-error
                  lineHeight="1.56"
                  // @ts-expect-error
                  letterSpacing="-0.54px"
                  // @ts-expect-error
                  style={{
                    textRendering: 'optimizelegibility',
                    fontSmoothing: 'antialiased',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                  textRendering="optimizelegibility"
                  mt="$3"
                >
                  {description}
                </Paragraph>
              </YStack>
              <Separator />
            </React.Fragment>
          )
        })}
      </YStack>
    </Layout>
  )
}
