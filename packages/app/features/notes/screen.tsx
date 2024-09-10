import { YStack, styled, Text, Layout, H1, H3, XStack, H2 } from '@my/ui'
import { Link } from 'solito/link'

const NoteBlock = styled(YStack, {
  backgroundColor: '$background',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$4',
  gap: '$2',
  flex: 1,
  minWidth: 260,
})

const NoteLink = ({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) => (
  <Link href={href}>
    <NoteBlock>
      <H3>{title}</H3>
      <Text>{description}</Text>
    </NoteBlock>
  </Link>
)

export const NotesIndex = () => {
  return (
    <Layout>
      <YStack px="$4" gap="$4">
        <H1>Notes</H1>
        <H2>
          A running public list of content, configuration and generally helpful solutions from my
          day-to-day
        </H2>
        <XStack fw="wrap" gap="$4">
          <NoteLink
            title="Configuration"
            description="Setup and configuration tips"
            href="/notes/configuration"
          />
          <NoteLink
            title="React Native"
            description="React Native development notes"
            href="/notes/react-native"
          />
          <NoteLink title="Tools" description="What I use day-to-day" href="/notes/tools" />
          <NoteLink title="Books" description="Books I recommend" href="/notes/books" />
        </XStack>
      </YStack>
    </Layout>
  )
}
