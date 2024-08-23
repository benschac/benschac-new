import { H1, H2, H3, AnimatedHeader, Paragraph, Spacer, Image, YStack, styled } from '@my/ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Suspense } from 'react'

const UnorderedList = styled(YStack, {
  tag: 'ul',
  display: 'block',
})

const ListItem = styled(Paragraph, {
  tag: 'li',
  ml: '$4',
  pl: '$1',
  // @ts-expect-error
  display: 'list-item',
  fontStyle: 'normal',
  fontSize: '$5',
  fontWeight: '400',
  // @ts-expect-error
  lineHeight: '1.56',
  // @ts-expect-error
  letterSpacing: '-0.54px',
  textRendering: 'optimizelegibility',
  style: {
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
  },
})

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
    px: '$4',
  },
})

const InlineCodeBlock = styled(Paragraph, {
  tag: 'code',
  bg: '$backgroundFocus',
  color: '$red10',
  fontFamily: '$mono',
  px: '$1',
  py: '$1',
  br: '$2',
  // borderWidth: '$1',
  // borderStyle: 'solid',
})

const components = {
  Image: (props: unknown) => (
    // @ts-expect-error - Image jsx issue, will look into this later
    <Image mt="$4" bg="red" maxWidth="100%" objectFit="cover" {...props} />
  ),
  h1: H1,
  h2: (props) => (
    <H2
      color="$color"
      fontSize="$9"
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
  Spacer: Spacer,
  ul: UnorderedList,
  li: ListItem,
  h3: (props) => (
    <H3
      fontStyle="normal"
      fontSize="$8"
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
  p: (props) => (
    <Paragraph
      fontStyle="normal"
      fontSize="$5"
      fontWeight="400"
      lineHeight="1.56"
      letterSpacing="-0.54px"
      style={{
        textRendering: 'optimizeLegibility',
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
      <InlineCodeBlock
        style={
          {
            // TODO: single line code block styles
            // overflowX: 'hidden',
            // display: 'block',
          }
        }
        className={className}
        {...props}
      >
        {children}
      </InlineCodeBlock>
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
      >
        <H1
          ta="center"
          fontStyle="italic"
          fontSize="$11"
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
          {props.source.frontmatter.title}
        </H1>
      </YStack>
      {/* <Spacer size="$4" /> */}
      <YStack f={1}>
        <YStack
          // mx="auto"
          ai="center"
          // mx="$4.5"
          px="$4.5"
        >
          <YStack
            bg="rgba(255, 255, 255, 0.07)"
            backdropFilter="blur(3.8px)"
            style={{
              WebkitBackdropFilter: 'blur(3.8px)',
            }}
            borderRadius="$10"
            borderColor="$accentBackground"
            shadowColor="$shadowColor"
            shadowRadius="$3"
            py="$10"
            $sm={{
              px: '$4',
            }}
            px="$10"
            f={1}
            // TOOD: this isn't my favorite way to do this
            // pretty sure there's a css negative margin way to do this
            // I'm making the container wider than what I want the line width
            // to be
            // @ts-expect-error
            maw="90ch"
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
