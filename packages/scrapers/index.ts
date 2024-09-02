import fs from 'fs'
import path from 'path'
import xml2js from 'xml2js'
import dotenv from 'dotenv'

dotenv.config()

async function fetchRSS(url: string): Promise<any> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const text = await response.text()
  const parser = new xml2js.Parser()
  return parser.parseStringPromise(text)
}

async function downloadFile(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const buffer = await response.arrayBuffer()
  fs.writeFileSync(outputPath, Buffer.from(buffer))
}

async function downloadPodcastEpisodes(rssUrl: string, limit: number = 5): Promise<string[]> {
  console.log('Fetching RSS feed...')
  const rss = await fetchRSS(rssUrl)
  const episodes = rss.rss.channel[0].item.slice(0, limit)

  const outputDir = path.join(__dirname, 'podcast_episodes')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const downloadedFiles: string[] = []

  for (let i = 0; i < episodes.length; i++) {
    const episode = episodes[i]
    const title = episode.title[0].replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const audioUrl = episode.enclosure[0].$.url
    const outputPath = path.join(outputDir, `${title}.mp3`)

    console.log(`Downloading episode ${i + 1}/${episodes.length}: ${title}`)
    await downloadFile(audioUrl, outputPath)
    console.log(`Downloaded: ${outputPath}`)
    downloadedFiles.push(outputPath)
  }

  console.log('All episodes downloaded successfully.')
  return downloadedFiles
}

// Test function
async function testDownloadPodcastEpisodes() {
  const rssFeedUrl = ''
  try {
    const downloadedFiles = await downloadPodcastEpisodes(rssFeedUrl, 3)
    console.log('Download process completed.')
    console.log('Downloaded files:')
    downloadedFiles.forEach((file) => {
      const stats = fs.statSync(file)
      console.log(`- ${file} (${stats.size} bytes)`)
    })
  } catch (error) {
    console.error('Error in test function:', error)
  }
}

// Run the test
testDownloadPodcastEpisodes()
