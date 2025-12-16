import { v4 as uuidv4 } from 'uuid'
import { generateTTSAudio } from '../services/tts'
import { readWordsJson, writeWordsJson, saveAudioFiles, regenerateAudioAssets } from '../services/files'
import type { Word } from '../../../packages/app/features/game/types'

interface AddWordOptions {
  romaji: string
  hiragana: string // Comma-separated hiragana characters
  japanese: string
  difficulty: number
}

export async function addWord(options: AddWordOptions): Promise<void> {
  const { romaji, hiragana, japanese, difficulty } = options

  // Validate inputs
  if (!romaji || !hiragana || !japanese) {
    throw new Error('romaji, hiragana, and japanese are required')
  }

  if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 3) {
    throw new Error('difficulty must be a number between 1 and 3')
  }

  // Parse hiragana array
  const hiraganaArray = hiragana.split(',').map((h) => h.trim()).filter((h) => h.length > 0)

  if (hiraganaArray.length === 0) {
    throw new Error('hiragana must contain at least one character')
  }

  // Generate UUID for the word
  const id = uuidv4()
  const audioFilename = `${id}.mp3`

  console.log(`Generating audio for: ${japanese} (${romaji})...`)

  // Generate TTS audio
  const audioBuffer = await generateTTSAudio(japanese)

  // Save audio files
  await saveAudioFiles(audioBuffer, audioFilename)

  // Create new word object
  const newWord: Word = {
    id,
    hiragana: hiraganaArray,
    romaji,
    japanese,
    audioUri: audioFilename,
    difficulty,
  }

  // Read existing words
  const words = await readWordsJson()

  // Add new word
  words.push(newWord)

  // Write updated words.json
  await writeWordsJson(words)

  // Regenerate audio-assets.ts
  await regenerateAudioAssets()

  console.log(`✓ Successfully added word with ID: ${id}`)
  console.log(`  Audio saved as: ${audioFilename}`)
}

