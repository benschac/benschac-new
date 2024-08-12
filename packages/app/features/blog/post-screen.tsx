import { H1, H2, H3, ListItem, Paragraph, Spacer, Image } from '@my/ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Layout } from '@tamagui/lucide-icons'
import { Suspense } from 'react'
import { useRouter } from 'solito/navigation'
const components = {
  Image: (props: unknown) => (
    // @ts-expect-error - Image jsx issue, will look into this later
    <Image maxWidth="100%" objectFit="cover" {...props} />
  ),
  h1: H1,
  h2: H2,
  Spacer: Spacer,
  h3: H3,
  p: Paragraph,
  li: ListItem,
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

export function PostScreen(props: { source: MDXRemoteSerializeResult }) {
  const router = useRouter()

  return <MDXRemote components={components} {...props.source} />
}
