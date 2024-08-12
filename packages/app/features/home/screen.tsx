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
type Props = { source: MDXRemoteSerializeResult }

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
                  <H2 size="$10">{title}</H2>
                  <XStack columnGap="$2">
                    <XStack columnGap="$2">
                      {tags?.map((tag: string, idx: number) => {
                        return (
                          <Theme key={`${blogLink.href}-${tag}`} inverse>
                            <Paragraph
                              bg="$color"
                              br="$2"
                              color="$background"
                              key={idx}
                              px="$2"
                              size="$1"
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
                <Paragraph>{description}</Paragraph>
              </YStack>
              <Separator />
            </React.Fragment>
          )
        })}
      </YStack>
    </Layout>
  )
}
