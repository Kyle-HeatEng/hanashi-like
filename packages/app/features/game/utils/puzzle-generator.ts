import type { Puzzle } from '../types'
import { getRandomWord } from '../data'

export function generatePuzzle(): Puzzle {
  const word = getRandomWord()
  const puzzleType: Puzzle['type'] =
    Math.random() > 0.5 ? 'VISUAL_TO_AUDIO' : 'AUDIO_TO_HIRAGANA'

  return {
    id: `puzzle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: puzzleType,
    wordId: word.id,
  }
}

