import { YStack, Paragraph, withStaticProperties, H3, createStyledContext } from '@my/ui'
import { Stack } from 'expo-router'
import { FlatList } from 'react-native'
import { styled } from '@my/ui'
import { cloneElement, isValidElement, useContext } from 'react'

const ItemFrame = styled(YStack, {
  borderWidth: 1,
  borderColor: 'red',
  padding: 10,
})

const ItemContext = createStyledContext({
  icon: null,
})
const ItemTitle = styled(H3, {
  fontWeight: 'bold',
})
const ItemSubTitle = styled(Paragraph, {})

const ItemIcon = (props: { children: React.ReactNode }) => {
  const { icon } = useContext(ItemContext.context)

  return isValidElement(props.children) ? cloneElement(props.children, {}) : null
}

const Item = withStaticProperties(ItemFrame, {
  Title: ItemTitle,
  SubTitle: ItemSubTitle,
  Icon: ItemIcon,
})

// function Item({
//   onPress,
//   title,
//   subTitle,
// }: {
//   onPress: () => void
//   title: string
//   subTitle: string
// }) {
//   return (
//     <YStack>
//       <Paragraph>{title}</Paragraph>
//       <Paragraph>{subTitle}</Paragraph>
//     </YStack>
//   )
// }
const metaData = [
  {
    title: 'Hello, world!',
    subTitle: 'This is a test',
    onPress: () => {},
  },
]

export default function Page() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <YStack bg="$background" f={1}>
        <FlatList data={metaData} renderItem={({ item }) => <Item {...item} />} />
      </YStack>
    </>
  )
}
