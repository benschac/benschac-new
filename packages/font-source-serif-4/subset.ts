import { mkdir, readFile, rm, rmdir, writeFile } from 'fs/promises'
import { basename, join } from 'path'

import subsetFont from 'subset-font'

export async function subset({
  inputFiles,
  characters,
  outputDir,
  targetFormat,
}: {
  outputDir: string
  targetFormat: 'woff2' | 'sfnt' | 'woff' | 'truetype'
  inputFiles: string[]
  characters: string
}) {
  try {
    await rm(outputDir, { recursive: true })
  } catch {}
  await mkdir(outputDir)
  console.info(`Subsetting`, inputFiles)
  await Promise.all(
    inputFiles.map(async (file) => {
      const font = await readFile(file)
      const buffer = await subsetFont(font, characters, {
        targetFormat,
      })
      const fileBaseName = basename(file).replace(/\..*/, '')
      const outPath = join(outputDir, fileBaseName + `.${targetFormat}`)
      await writeFile(outPath, buffer)
    })
  )
}

const characters = {
  en: {
    minimal: `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-=_+{}[]|\\/.,<>;:'"\``,
  },
}

const base = [
  'source-serif-4-v8-ext-200-italic',
  'source-serif-4-v8-ext-300',
  'source-serif-4-v8-ext-300italic',
  'source-serif-4-v8-ext-500',
  'source-serif-4-v8-ext-500italic',
  'source-serif-4-v8-ext-600',
  'source-serif-4-v8-ext-600italic',
  'source-serif-4-v8-ext-700',
  'source-serif-4-v8-ext-700italic',
  'source-serif-4-v8-ext-800',
  'source-serif-4-v8-ext-800italic',
  'source-serif-4-v8-ext-regular',
  'source-serif-4-v8-ext-italic',
].map((f) => `${f}`)
// const italics = base.slice(2).map((b) => `${b}Italic`)

const inputFiles = [...base].map((f) => join('fonts', `${f}.woff2`))

subset({
  inputFiles,
  outputDir: 'woff2',
  targetFormat: 'woff2',
  characters: characters.en.minimal,
})
