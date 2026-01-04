import wordsJson from './words.json'
import type { Word } from '../types'

export const words: Word[] = wordsJson as Word[]

export function getWordById(id: string): Word | undefined {
  return words.find((word) => word.id === id)
}

export function getRandomWord(): Word {
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words[randomIndex]
  if (!word) {
    throw new Error('No words available')
  }
  return word
}

export function getRandomWords(count: number, excludeId?: string): Word[] {
  const availableWords = excludeId
    ? words.filter((word) => word.id !== excludeId)
    : words
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getAllWords(): Word[] {
  return words
}

export function getWordsWithSimilar(): Word[] {
  return words.filter((word) => word.similar && word.similar.length > 0)
}

export function getRandomWordWithSimilar(): Word {
  const wordsWithSimilar = getWordsWithSimilar()
  if (wordsWithSimilar.length === 0) {
    throw new Error('No words with similar-sounding words available')
  }
  const randomIndex = Math.floor(Math.random() * wordsWithSimilar.length)
  const word = wordsWithSimilar[randomIndex]
  if (!word) {
    throw new Error('Failed to get random word with similar')
  }
  return word
}


