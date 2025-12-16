import { generateTTSAudio } from '../services/tts'
import { readWordsJson, writeWordsJson, saveAudioFiles, regenerateAudioAssets } from '../services/files'
import type { Word } from '../../../packages/app/features/game/types'

export async function regenerateAudio(wordId: string): Promise<void> {
  // Read existing words
  const words = await readWordsJson()

  // Find the word
  const wordIndex = words.findIndex((w) => w.id === wordId)
  if (wordIndex === -1) {
    throw new Error(`Word with ID "${wordId}" not found`)
  }

  const word = words[wordIndex]
  console.log(`Regenerating audio for: ${word.romaji} (${word.japanese || word.hiragana.join('')})`)

  // Get japanese text for TTS
  const japaneseText = word.japanese || word.hiragana.join('')

  // Generate new TTS audio
  const audioBuffer = await generateTTSAudio(japaneseText)

  // Save audio files (will overwrite existing)
  await saveAudioFiles(audioBuffer, word.audioUri)

  // Update word in array (in case japanese field was missing)
  if (!word.japanese) {
    words[wordIndex] = {
      ...word,
      japanese: japaneseText,
    }
    await writeWordsJson(words)
  }

  // Regenerate audio-assets.ts (in case it needs updating)
  await regenerateAudioAssets()

  console.log(`✓ Successfully regenerated audio for word ID: ${wordId}`)
  console.log(`  Audio file: ${word.audioUri}`)
}

