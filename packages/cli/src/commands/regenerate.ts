import { generateTTSAudio } from '../services/tts'
import { readWordsJson, writeWordsJson, saveAudioFiles, regenerateAudioAssets } from '../services/files'
import type { Word } from '../../../app/features/puzzles/types'

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

export async function regenerateAllAudio(filter?: 'length-trap' | 'all'): Promise<void> {
  const words = await readWordsJson()
  
  // Filter words based on the filter option
  let wordsToRegenerate: Word[]
  if (filter === 'length-trap') {
    wordsToRegenerate = words.filter((w) => w.id.startsWith('lt-pair-'))
    console.log(`🎵 Regenerating audio for ${wordsToRegenerate.length} length-trap words...`)
  } else {
    wordsToRegenerate = words
    console.log(`🎵 Regenerating audio for all ${wordsToRegenerate.length} words...`)
  }

  console.log('This may take a while...\n')

  for (let i = 0; i < wordsToRegenerate.length; i++) {
    const word = wordsToRegenerate[i]
    const progress = `[${i + 1}/${wordsToRegenerate.length}]`
    
    console.log(`${progress} Regenerating ${word.id} (${word.romaji})...`)
    
    try {
      // Get japanese text for TTS
      const japaneseText = word.japanese || word.hiragana.join('')

      // Generate new TTS audio
      const audioBuffer = await generateTTSAudio(japaneseText)

      // Save audio files (will overwrite existing)
      await saveAudioFiles(audioBuffer, word.audioUri)

      console.log(`  ✓ Successfully generated audio for ${word.audioUri}`)
    } catch (error) {
      console.error(`  ✗ Failed to generate audio for ${word.id}:`, error instanceof Error ? error.message : String(error))
      throw error
    }
    
    console.log('')
  }

  // Regenerate audio-assets.ts once at the end
  console.log('Regenerating audio-assets.ts...')
  await regenerateAudioAssets()

  console.log('\n✅ Successfully regenerated all audio files!')
  console.log('🎉 You can now run the app and test the puzzles!')
}

