import { H1, Navigation, Spacer, Theme, YStack } from '.'

export function PostLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <Theme name="green">
      <Theme name="alt1">
        <YStack f={1}>
          <Navigation />
          <Spacer size="$4" />
          {children}
        </YStack>
      </Theme>
    </Theme>
  )
}
