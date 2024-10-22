import {
  Home,
  Leaf,
  Camera,
  Settings as SettingsIcon,
  Move,
  Code2,
  Image,
  Wrench,
} from '@tamagui/lucide-icons'

export const groupOne = [
  {
    title: 'NFT meme Camera',
    subTitle: 'Snap a photo and mint an NFT',
    route: '/memes',
    color: 'blue',
    icon: Camera,
  },
  {
    title: 'Drawing With Skia',
    subTitle: 'Nature of Code Renders',
    route: '/nature-of-code',
    color: 'green',
    icon: Leaf,
  },
  {
    title: 'Reanimated Fun',
    subTitle: 'Experiments with reanimated',
    route: '/reanimated-experiments',
    color: 'orange',
    icon: Move,
  },
  {
    title: 'Native Modules',
    subTitle: 'Experiments with native modules',
    route: '/native-modules',
    color: 'red',
    icon: Code2,
  },
  {
    title: 'Layout Effects',
    subTitle: 'Experiments with reaminated layout',
    route: '/reanimated-layouts',
    color: 'purple',
    icon: Home,
  },
  {
    title: 'Settings',
    subTitle: 'Change your settings',
    route: '/settings',
    color: 'yellow',
    icon: SettingsIcon,
  },
  {
    title: 'Lil Tools',
    subTitle: 'Convert to SVG',
    route: '/lil-tools',
    color: 'pink',
    icon: Wrench,
  },
] as const
