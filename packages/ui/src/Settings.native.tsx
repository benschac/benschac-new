import React, { useContext } from 'react'
import { IconProps } from '@tamagui/helpers-icon'
import {
  YStack,
  styled,
  withStaticProperties,
  createStyledContext,
  ThemeName,
  YGroup,
  XStack,
  Theme,
  SizableText,
  Separator,
  Spacer,
} from '.'
import { ChevronRight } from '@tamagui/lucide-icons'
import { z } from 'zod'

import invariant from 'tiny-invariant'
const Sizes = z.enum(['sm', 'md', 'lg'])
type Sizes = z.infer<typeof Sizes>
const SettingsContext = createStyledContext({
  size: 'md' as Sizes,
  color: 'grey' as ThemeName,
})

const mapSizeToToken = (size: Sizes) => {
  switch (size) {
    case 'sm':
      return '$1'
    case 'md':
      return '$2'
    case 'lg':
      return '$3'
    default: {
      console.error('Invalid size')
      invariant(true, 'Invalid size')
    }
  }
}

const Frame = styled(YStack, {
  name: 'SettingsFrame',
  context: SettingsContext,
  gap: '$4',
  br: '$4',
  mx: '$3',
})

const Group = styled(YGroup, {
  name: 'SettingsGroup',
  bg: 'transparent',
  context: SettingsContext,
  '$platform-native': {
    separator: <Separator boc="$color4" bw="$0.25" />,
  },
})

const Items = styled(YStack, {
  name: 'SettingsItems',
  context: SettingsContext,
})

const Title = styled(SizableText, {
  name: 'SettingsTitle',
  context: SettingsContext,
  color: '$color',
  variants: {
    size: {
      sm: {
        fontSize: '$4',
      },
      md: {
        fontSize: '$6',
      },
      lg: {
        fontSize: '$8',
      },
    },
  } as const,
})
const ItemFrame = styled(XStack, {
  name: 'ItemFrame',
  context: SettingsContext,
  ai: 'center',
  jc: 'center',
  cur: 'pointer',
  gap: '$3',
  br: '$4',
  variants: {
    size: {
      sm: {
        p: '$2',
      },
      md: {
        p: '$4',
      },
      lg: {
        p: '$6',
      },
    },
  } as const,
})

const Item = ({
  children,
  icon: Icon,
  onPress,
  iconAccentColor,
  ...props
}: {
  children: React.ReactNode
  icon: React.ReactElement<IconProps, string | React.JSXElementConstructor<any>>
  onPress: () => void
  iconAccentColor: ThemeName
}) => {
  const { size, color } = useContext(SettingsContext.context)
  return (
    <YGroup.Item {...props}>
      <ItemFrame size={size} onPress={onPress}>
        <Theme name={iconAccentColor}>
          <Theme name={color}>
            <IconFrame size={size}>
              {React.cloneElement(Icon, { size: mapSizeToToken(size) })}
            </IconFrame>
            <Title size={size}>{children}</Title>
            <Spacer flex />
            <ChevronRight size={mapSizeToToken(size)} />
          </Theme>
        </Theme>
      </ItemFrame>
    </YGroup.Item>
  )
}

const Icon = (props: { children: React.ReactElement }) => {
  const context = React.useContext(SettingsContext.context)
  const size = mapSizeToToken(context.size)
  return React.cloneElement(props.children, {
    size: size,
  })
}

const IconFrame = styled(YStack, {
  name: 'IconFrame',
  context: SettingsContext,
  bg: '$backgroundFocus',
  boc: '$borderColorFocus',
  bw: 1,
  br: '$4',
  variants: {
    size: {
      sm: {
        br: '$3',
        p: '$1',
      },
      md: {
        p: '$2',
      },
      lg: {
        p: '$2',
      },
    },
  } as const,
})

export const Settings = withStaticProperties(Frame, {
  Title,
  Icon,
  IconFrame,
  Item,
  Group,
  Items,
  Props: SettingsContext.Provider,
})
