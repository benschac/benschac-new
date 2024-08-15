# Prerequisite
First install the dependencies running `yarn install`, then make sure to build the package using `yarn build` and add the package as a dependency to the package/app you want to consume it from (could be the `app` or `ui` package) like so:
```
"dependencies": {
  "@tamagui-google-fonts/source-serif-4": "*"
}
```
## Usage
### Expo
  
Add this to the root of your file:
    
```ts
import { useFonts } from 'expo-font'

export default function App() {
  const [loaded] = useFonts({
    SourceSerif4ExtraLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-ExtraLight.ttf'),
    SourceSerif4Light: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Light.ttf'),
    SourceSerif4: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Regular.ttf'),
    SourceSerif4Medium: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Medium.ttf'),
    SourceSerif4SemiBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-SemiBold.ttf'),
    SourceSerif4Bold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Bold.ttf'),
    SourceSerif4ExtraBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-ExtraBold.ttf'),
    SourceSerif4Black: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Black.ttf'),
    SourceSerif4_18ptExtraLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-ExtraLight.ttf'),
    SourceSerif4_18ptLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Light.ttf'),
    SourceSerif4_18pt: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Regular.ttf'),
    SourceSerif4_18ptMedium: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Medium.ttf'),
    SourceSerif4_18ptSemiBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-SemiBold.ttf'),
    SourceSerif4_18ptBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Bold.ttf'),
    SourceSerif4_18ptExtraBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-ExtraBold.ttf'),
    SourceSerif4_18ptBlack: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Black.ttf'),
    SourceSerif4_36ptExtraLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-ExtraLight.ttf'),
    SourceSerif4_36ptLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Light.ttf'),
    SourceSerif4_36pt: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Regular.ttf'),
    SourceSerif4_36ptMedium: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Medium.ttf'),
    SourceSerif4_36ptSemiBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-SemiBold.ttf'),
    SourceSerif4_36ptBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Bold.ttf'),
    SourceSerif4_36ptExtraBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-ExtraBold.ttf'),
    SourceSerif4_36ptBlack: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Black.ttf'),
    SourceSerif4_48ptExtraLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-ExtraLight.ttf'),
    SourceSerif4_48ptLight: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Light.ttf'),
    SourceSerif4_48pt: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Regular.ttf'),
    SourceSerif4_48ptMedium: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Medium.ttf'),
    SourceSerif4_48ptSemiBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-SemiBold.ttf'),
    SourceSerif4_48ptBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Bold.ttf'),
    SourceSerif4_48ptExtraBold: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-ExtraBold.ttf'),
    SourceSerif4_48ptBlack: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Black.ttf'),
    SourceSerif4ExtraLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-ExtraLightItalic.ttf'),
    SourceSerif4LightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-LightItalic.ttf'),
    SourceSerif4Italic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-Italic.ttf'),
    SourceSerif4MediumItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-MediumItalic.ttf'),
    SourceSerif4SemiBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-SemiBoldItalic.ttf'),
    SourceSerif4BoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-BoldItalic.ttf'),
    SourceSerif4ExtraBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-ExtraBoldItalic.ttf'),
    SourceSerif4BlackItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4-BlackItalic.ttf'),
    SourceSerif4_18ptExtraLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-ExtraLightItalic.ttf'),
    SourceSerif4_18ptLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-LightItalic.ttf'),
    SourceSerif4_18ptItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-Italic.ttf'),
    SourceSerif4_18ptMediumItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-MediumItalic.ttf'),
    SourceSerif4_18ptSemiBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-SemiBoldItalic.ttf'),
    SourceSerif4_18ptBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-BoldItalic.ttf'),
    SourceSerif4_18ptExtraBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-ExtraBoldItalic.ttf'),
    SourceSerif4_18ptBlackItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_18pt-BlackItalic.ttf'),
    SourceSerif4_36ptExtraLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-ExtraLightItalic.ttf'),
    SourceSerif4_36ptLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-LightItalic.ttf'),
    SourceSerif4_36ptItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-Italic.ttf'),
    SourceSerif4_36ptMediumItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-MediumItalic.ttf'),
    SourceSerif4_36ptSemiBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-SemiBoldItalic.ttf'),
    SourceSerif4_36ptBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-BoldItalic.ttf'),
    SourceSerif4_36ptExtraBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-ExtraBoldItalic.ttf'),
    SourceSerif4_36ptBlackItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_36pt-BlackItalic.ttf'),
    SourceSerif4_48ptExtraLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-ExtraLightItalic.ttf'),
    SourceSerif4_48ptLightItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-LightItalic.ttf'),
    SourceSerif4_48ptItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-Italic.ttf'),
    SourceSerif4_48ptMediumItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-MediumItalic.ttf'),
    SourceSerif4_48ptSemiBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-SemiBoldItalic.ttf'),
    SourceSerif4_48ptBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-BoldItalic.ttf'),
    SourceSerif4_48ptExtraBoldItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-ExtraBoldItalic.ttf'),
    SourceSerif4_48ptBlackItalic: require('@tamagui-google-fonts/source-serif-4/fonts/static/SourceSerif4_48pt-BlackItalic.ttf'),
  })
// ...
```

## Web

Get the font's script (`<link>` or `@import`) and add it to `<head>` from [here](https://fonts.google.com/specimen/Source+Serif+4)


## Next.js Font (next/font/google)

Import the font from `next/font/google` and give it a variable name in your `_app.tsx` like so:

```ts
import { SourceSerif_4 } from 'next/font/google' // the casing might differ

const font = SourceSerif_4({
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
      ? '"Source Serif 4", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      : 'Source Serif 4',
```

To:
```ts
return createFont({
    family: isWeb
      ? 'var(--my-font), -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      : 'Source Serif 4',
```


## Usage in config

```ts
import { createSourceSerif_4Font } from '@tamagui-google-fonts/source-serif-4' 

export const myFont = createSourceSerif_4Font(
  {
    face: {
    "200": {
        "normal": "SourceSerif4ExtraLight",
        "italic": "SourceSerif4_18ptExtraLight"
    },
    "300": {
        "normal": "SourceSerif4Light",
        "italic": "SourceSerif4_18ptLight"
    },
    "400": {
        "normal": "SourceSerif4",
        "italic": "SourceSerif4_18ptRegular"
    },
    "500": {
        "normal": "SourceSerif4Medium",
        "italic": "SourceSerif4_18ptMedium"
    },
    "600": {
        "normal": "SourceSerif4SemiBold",
        "italic": "SourceSerif4_18ptSemiBold"
    },
    "700": {
        "normal": "SourceSerif4Bold",
        "italic": "SourceSerif4_18ptBold"
    },
    "800": {
        "normal": "SourceSerif4ExtraBold",
        "italic": "SourceSerif4_18ptExtraBold"
    },
    "900": {
        "normal": "SourceSerif4Black",
        "italic": "SourceSerif4_18ptBlack"
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
