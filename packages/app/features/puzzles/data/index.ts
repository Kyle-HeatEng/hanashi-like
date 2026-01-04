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

