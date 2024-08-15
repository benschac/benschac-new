import {
  H1,
  H2,
  H3,
  AnimatedHeader,
  ListItem,
  Paragraph,
  Spacer,
  Image,
  Layout,
  YStack,
  XStack,
  styled,
} from '@my/ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Suspense } from 'react'

const Blockquote = styled(YStack, {
  tag: 'blockquote',
  borderRadius: '$4',
  bg: '$backgroundFocus',
  br: '$4',
  px: '$4',
  py: '$8',
  borderWidth: '$1',
  borderStyle: 'dotted',
  $sm: {
    px: '$2',
  },
})

const components = {
  Image: (props: unknown) => (
    // @ts-expect-error - Image jsx issue, will look into this later
    <Image maxWidth="100%" objectFit="cover" {...props} />
  ),
  h1: H1,
  h2: H2,
  Spacer: Spacer,
  h3: H3,
  p: (props) => <Paragraph size="$5" {...props} />,
  AnimatedHeader,
  li: ListItem,
  blockquote: Blockquote,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        children={String(children).replace(/\n$/, '')}
        style={atomDark}
        language={match[1]}
        PreTag="div"
        customStyle={{
          minWidth: 'min-content',
          textWrap: 'wrap',
          whiteSpace: 'wrap',
          overflow: 'hidden',
          lineBreak: 'anywhere',
        }}
        {...props}
      />
    ) : (
      <span
        style={
          {
            // TODO: single line code block styles
            // overflowX: 'hidden',
            // background: 'red',
            // display: 'block',
          }
        }
        className={className}
        {...props}
      >
        {children}
      </span>
    )
  },
}

export function PostScreen(props: { source: MDXRemoteSerializeResult }) {
  return (
    <Suspense fallback={<YStack>Loading...</YStack>}>
      <YStack
        // @ts-expect-error
        maw="81ch"
        mx="auto"
        $sm={{
          px: '$0',
        }}
        // px="$3"
        jc="center"
        ai="center"
        // @ts-expect-error
        mih="25vh"
      >
        <H1
          ta="center"
          $sm={{
            fontSize: '$9',
          }}
          // @ts-expect-error
          letterSpacing="-1px"
        >
          {props.source.frontmatter.title}
        </H1>
      </YStack>
      <Spacer size="$4" />
      <YStack
        bg="$background075"
        borderRadius="$10"
        borderColor="$accentBackground"
        borderCurve="continuous"
        shadowColor="$shadowColor"
        shadowRadius="$3"
        px="$10"
        $sm={{ px: '$2' }}
        py="$9"
        mx="auto"
      >
        <YStack
          $sm={{
            px: '$0',
            overflow: 'hidden',
          }}
          f={1}
          rowGap="$6"
          // @ts-expect-error
          maw="80ch"
        >
          {/* @ts-expect-error */}
          <MDXRemote components={components} {...props.source} />
        </YStack>
      </YStack>
      <Spacer size="$10" />
    </Suspense>
  )
}
