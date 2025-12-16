#!/usr/bin/env node

import { Command } from 'commander'
import { config } from 'dotenv'
import { addWord } from './commands/add'
import { migrateWords } from './commands/migrate'
import { regenerateAudio } from './commands/regenerate'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env file at monorepo root
// From packages/cli/src/index.ts, go up 3 levels to monorepo root
config({ path: resolve(__dirname, '../../../.env') })

const program = new Command()

program
  .name('hanashi-cli')
  .description('CLI tool for managing Japanese word audio assets')
  .version('0.0.0')

program
  .command('add')
  .description('Add a new word with audio generation')
  .requiredOption('--romaji <romaji>', 'Romaji spelling of the word')
  .requiredOption('--hiragana <hiragana>', 'Comma-separated hiragana characters (e.g., "こ,ん,に,ち,は")')
  .requiredOption('--japanese <japanese>', 'Japanese text for TTS (e.g., "こんにちは")')
  .requiredOption('--difficulty <difficulty>', 'Difficulty level (1-3)', (value) => parseInt(value, 10))
  .action(async (options) => {
    try {
      await addWord(options)
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program
  .command('migrate')
  .description('Migrate all existing words to UUID-based IDs and regenerate audio')
  .action(async () => {
    try {
      await migrateWords()
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program
  .command('regenerate')
  .description('Regenerate audio for a specific word by ID')
  .requiredOption('--id <id>', 'Word ID (UUID)')
  .action(async (options) => {
    try {
      await regenerateAudio(options.id)
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program.parse()

