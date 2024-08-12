import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
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
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import React from 'react'

export function HomeScreen({ pagesMode = false, source }) {
  const components = {
    Image,
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    Test: Text,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <span className={className} {...props}>
          {children}
        </span>
      )
    },
  }

  return (
    <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background">
      {source.map((post, idx) => {
        const blogLink = useLink({
          href: `/blog/${source[idx].source.frontmatter.slug}`,
        })
        console.log(blogLink)
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
                        <Theme key={`${tag}-${idx}`} inverse>
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
  )
}

function SheetDemo() {
  const toast = useToastController()

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle bg="$gray8" />
        <Sheet.Frame ai="center" jc="center" gap="$10" bg="$color2">
          <XStack gap="$2">
            <Paragraph ta="center">Made by</Paragraph>
            <Anchor col="$blue10" href="https://twitter.com/natebirdman" target="_blank">
              @natebirdman,
            </Anchor>
            <Anchor
              color="$purple10"
              href="https://github.com/tamagui/tamagui"
              target="_blank"
              rel="noreferrer"
            >
              give it a ⭐️
            </Anchor>
          </XStack>

          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
