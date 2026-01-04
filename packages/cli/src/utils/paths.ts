import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the monorepo root
// When running from src: packages/cli/src/utils -> 4 levels up
// When running from dist: packages/cli/dist/utils -> 4 levels up
let MONOREPO_ROOT = resolve(__dirname, '../../../../')

// Verify we're at the right level by checking for package.json with workspaces
if (!existsSync(join(MONOREPO_ROOT, 'package.json'))) {
  // Try one more level up
  MONOREPO_ROOT = resolve(__dirname, '../../../../../')
}

export const PATHS = {
  MONOREPO_ROOT,
  WORDS_JSON: join(MONOREPO_ROOT, 'packages/app/features/puzzles/data/words.json'),
  EXPO_AUDIO_DIR: join(MONOREPO_ROOT, 'apps/expo/assets/audio'),
  NEXT_AUDIO_DIR: join(MONOREPO_ROOT, 'apps/next/public/audio'),
  EXPO_AUDIO_ASSETS: join(MONOREPO_ROOT, 'apps/expo/audio-assets.ts'),
} as const

