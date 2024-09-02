import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

dotenv.config()

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

const openai = new OpenAI({
  // TODO: move this to .env
  apiKey: process.env.OPENAI_API_KEY!,
})

const CHUNK_DURATION = 600 // 10 minutes in seconds

async function transcribeAudio(filePath: string): Promise<string> {
  const transcript = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-1',
  })

  return transcript.text
}

function splitAudio(inputPath: string, outputDir: string, duration: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const basename = path.basename(inputPath, path.extname(inputPath))
    const outputPattern = path.join(outputDir, `${basename}_chunk_%03d.mp3`)

    ffmpeg(inputPath)
      .outputOptions([`-f segment`, `-segment_time ${duration}`, `-c copy`])
      .output(outputPattern)
      .on('end', () => {
        const chunks = fs
          .readdirSync(outputDir)
          .filter((file) => file.startsWith(`${basename}_chunk_`))
          .map((file) => path.join(outputDir, file))
        resolve(chunks)
      })
      .on('error', reject)
      .run()
  })
}

async function main() {
  const inputDir = path.join(__dirname, 'podcast_episodes')
  const outputDir = path.join(__dirname, 'transcripts')
  const chunksDir = path.join(__dirname, 'temp_chunks')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir)
  }

  const files = fs.readdirSync(inputDir).filter((file) => file.endsWith('.mp3'))

  // Process only the first file
  if (files.length > 0) {
    const file = files[0]
    if (!file) {
      console.log('No MP3 files found in the input directory.')
      return
    }
    const audioPath = path.join(inputDir, file)
    const transcriptPath = path.join(outputDir, `${path.parse(file).name}.txt`)

    console.log(`Processing ${file}...`)
    const chunks = await splitAudio(audioPath, chunksDir, CHUNK_DURATION)

    let fullTranscript = ''
    for (const [index, chunk] of chunks.entries()) {
      console.log(`Transcribing chunk ${index + 1}/${chunks.length} of ${file}...`)
      const chunkTranscript = await transcribeAudio(chunk)
      fullTranscript += chunkTranscript + ' '
    }

    fs.writeFileSync(transcriptPath, fullTranscript.trim())
    console.log(`Transcript saved to ${transcriptPath}`)

    // Clean up chunks
    chunks.forEach((chunk) => fs.unlinkSync(chunk))
  } else {
    console.log('No MP3 files found in the input directory.')
  }

  // Remove temporary chunks directory
  fs.rmdirSync(chunksDir, { recursive: true })

  console.log('Transcription complete.')
}

main().catch(console.error)
