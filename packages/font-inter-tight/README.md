# Prerequisite
First install the dependencies running `yarn install`, then make sure to build the package using `yarn build` and add the package as a dependency to the package/app you want to consume it from (could be the `app` or `ui` package) like so:
```
"dependencies": {
  "@tamagui-google-fonts/inter-tight": "*"
}
```
## Usage
### Expo
  
Add this to the root of your file:
    
```ts
import { useFonts } from 'expo-font'

export default function App() {
  const [loaded] = useFonts({
    InterTightThin: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Thin.ttf'),
    InterTightExtraLight: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-ExtraLight.ttf'),
    InterTightLight: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Light.ttf'),
    InterTight: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Regular.ttf'),
    InterTightMedium: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Medium.ttf'),
    InterTightSemiBold: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-SemiBold.ttf'),
    InterTightBold: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Bold.ttf'),
    InterTightExtraBold: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-ExtraBold.ttf'),
    InterTightBlack: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Black.ttf'),
    InterTightThinItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-ThinItalic.ttf'),
    InterTightExtraLightItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-ExtraLightItalic.ttf'),
    InterTightLightItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-LightItalic.ttf'),
    InterTightItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-Italic.ttf'),
    InterTightMediumItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-MediumItalic.ttf'),
    InterTightSemiBoldItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-SemiBoldItalic.ttf'),
    InterTightBoldItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-BoldItalic.ttf'),
    InterTightExtraBoldItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-ExtraBoldItalic.ttf'),
    InterTightBlackItalic: require('@tamagui-google-fonts/inter-tight/fonts/static/InterTight-BlackItalic.ttf'),
  })
// ...
```

## Web

Get the font's script (`<link>` or `@import`) and add it to `<head>` from [here](https://fonts.google.com/specimen/Inter+Tight)


## Next.js Font (next/font/google)

Import the font from `next/font/google` and give it a variable name in your `_app.tsx` like so:

```ts
import { InterTight } from 'next/font/google' // the casing might differ

const font = InterTight({
  variable: '--my-font',
})
```

Add the variable style in `_app.tsx`:

```tsx
<div className={font.variable}>
  {*/ ...rest of your _app.tsx tree */}
</div>
```

Then go to the generated font package and update `family` with the variable.

So, change it from:
```ts
return createFont({
    family: isWeb
      ? '"Inter Tight", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      : 'Inter Tight',
```

To:
```ts
return createFont({
    family: isWeb
      ? 'var(--my-font), -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      : 'Inter Tight',
```


## Usage in config

```ts
import { createInterTightFont } from '@tamagui-google-fonts/inter-tight' 

export const myFont = createInterTightFont(
  {
    face: {
    "100": {
        "normal": "InterTightThin",
        "italic": "InterTightThinItalic"
    },
    "200": {
        "normal": "InterTightExtraLight",
        "italic": "InterTightExtraLightItalic"
    },
    "300": {
        "normal": "InterTightLight",
        "italic": "InterTightLightItalic"
    },
    "400": {
        "normal": "InterTight",
        "italic": "InterTightItalic"
    },
    "500": {
        "normal": "InterTightMedium",
        "italic": "InterTightMediumItalic"
    },
    "600": {
        "normal": "InterTightSemiBold",
        "italic": "InterTightSemiBoldItalic"
    },
    "700": {
        "normal": "InterTightBold",
        "italic": "InterTightBoldItalic"
    },
    "800": {
        "normal": "InterTightExtraBold",
        "italic": "InterTightExtraBoldItalic"
    },
    "900": {
        "normal": "InterTightBlack",
        "italic": "InterTightBlackItalic"
    }
}
        },
  {
    // customize the size and line height scaling to your own needs
    // sizeSize: (size) => Math.round(size * 1.1),
    // sizeLineHeight: (size) => size + 5,
  }
)
```

NOTE: these instructions are auto-generated and might not be accurate with some fonts since not all fonts share the same conventions. you may need to edit them out to get them to work.
