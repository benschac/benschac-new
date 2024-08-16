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
  ColorfulSVGPattern,
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
  p: (props) => (
    <Paragraph
      fontStyle="normal"
      fontSize="$5"
      fontWeight="400"
      lineHeight="1.56"
      letterSpacing="-0.54px"
      style={{
        textRendering: 'optimizelegibility',
        fontSmoothing: 'antialiased',
        WebkitFontSmoothing: 'antialiased',
      }}
      textRendering="optimizelegibility"
      mt="$3"
      {...props}
    />
  ),
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
          marginTop: 20,
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
        // @ts-expect-error
        mih="30vh"
        $sm={{
          px: '$0',
        }}
        jc="center"
        ai="center"
        // mih="25vh"
      >
        <H1
          ta="center"
          fontStyle="italic"
          fontSize="$12"
          color="$color"
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
          {props.source.frontmatter.title}
        </H1>
      </YStack>
      {/* <Spacer size="$4" /> */}
      <YStack f={1}>
        <YStack
          bg="$background075"
          borderRadius="$10"
          borderColor="$accentBackground"
          borderCurve="continuous"
          shadowColor="$shadowColor"
          shadowRadius="$3"
          $sm={{ px: '$2' }}
          py="$8"
          px="$6"
          mx="auto"
        >
          <YStack
            $sm={{
              px: '$2',
            }}
            f={1}
            px="$4"
            // @ts-expect-error
            maw="80ch"
          >
            {/* @ts-expect-error */}
            <MDXRemote components={components} {...props.source} />
          </YStack>
        </YStack>
      </YStack>
      <Spacer size="$10" />
    </Suspense>
  )
}
