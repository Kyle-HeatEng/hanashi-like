import { v4 as uuidv4 } from 'uuid'
import { generateTTSAudio } from '../services/tts'
import {
  readWordsJson,
  writeWordsJson,
  saveAudioFiles,
  deleteAudioFiles,
  regenerateAudioAssets,
  getExistingAudioFilenames,
} from '../services/files'
import type { Word } from '../../../app/features/puzzles/types'

export async function migrateWords(): Promise<void> {
  console.log('Starting migration to UUID-based IDs...\n')

  // Read existing words
  const words = await readWordsJson()
  console.log(`Found ${words.length} words to migrate\n`)

  const migratedWords: Word[] = []
  const oldAudioFilesToDelete = new Set<string>()

  // Process each word
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    console.log(`[${i + 1}/${words.length}] Processing: ${word.romaji} (${word.id})`)

    // Generate new UUID
    const newId = uuidv4()
    const newAudioFilename = `${newId}.mp3`

    // Create japanese field by joining hiragana (if it doesn't exist)
    const japanese = 'japanese' in word && word.japanese ? word.japanese : word.hiragana.join('')

    // Track old audio file for deletion
    if (word.audioUri) {
      oldAudioFilesToDelete.add(word.audioUri)
    }

    console.log(`  Generating audio for: ${japanese}...`)

    // Generate new TTS audio
    const audioBuffer = await generateTTSAudio(japanese)

    // Save new audio files
    await saveAudioFiles(audioBuffer, newAudioFilename)

    // Create migrated word
    const migratedWord: Word = {
      id: newId,
      hiragana: word.hiragana,
      romaji: word.romaji,
      japanese,
      audioUri: newAudioFilename,
      difficulty: word.difficulty,
    }

    migratedWords.push(migratedWord)
    console.log(`  ✓ Migrated to ID: ${newId}\n`)
  }

  // Write updated words.json
  console.log('Writing updated words.json...')
  await writeWordsJson(migratedWords)

  // Regenerate audio-assets.ts
  console.log('Regenerating audio-assets.ts...')
  await regenerateAudioAssets()

  // Delete old audio files
  console.log('\nDeleting old audio files...')
  let deletedCount = 0
  for (const oldFilename of oldAudioFilesToDelete) {
    try {
      await deleteAudioFiles(oldFilename)
      deletedCount++
    } catch (error) {
      console.warn(`  Warning: Could not delete ${oldFilename}:`, error)
    }
  }

  console.log(`\n✓ Migration complete!`)
  console.log(`  - Migrated ${migratedWords.length} words`)
  console.log(`  - Deleted ${deletedCount} old audio files`)
  console.log(`  - Generated ${migratedWords.length} new audio files`)
}

