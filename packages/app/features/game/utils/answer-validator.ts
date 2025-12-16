import type { Puzzle } from '../types'
import { getWordById } from '../data'

export function validateAnswer(
  puzzle: Puzzle,
  answer: string | string[]
): boolean {
  const word = getWordById(puzzle.wordId)
  if (!word) {
    return false
  }

  if (puzzle.type === 'VISUAL_TO_AUDIO') {
    // For Type A, answer is the selected audio URI (wordId)
    return typeof answer === 'string' && answer === puzzle.wordId
  } else {
    // For Type B, answer is an array of hiragana characters
    if (!Array.isArray(answer)) {
      return false
    }
    // Compare arrays element by element
    if (answer.length !== word.hiragana.length) {
      return false
    }
    return answer.every((char, index) => char === word.hiragana[index])
  }
}

