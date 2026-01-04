import { create } from 'zustand'
import type { RunState, Word, PuzzleType } from '../types'
import { getRandomWord, getRandomWordWithSimilar } from '../data'

interface RunStore extends RunState {
  startRun: () => void
  correctAnswer: () => void
  wrongAnswer: () => void
  endRun: () => void
  reset: () => void
}

const initialState: RunState = {
  inRun: false,
  puzzleIndex: 0,
  coins: 0,
  hp: 1,
  currentWord: null,
  puzzleSequence: [],
  currentPuzzleType: null,
}

// Generate a weighted random puzzle sequence
// 70% audio, 30% length-trap
function generatePuzzleSequence(length: number = 50): PuzzleType[] {
  const sequence: PuzzleType[] = []
  for (let i = 0; i < length; i++) {
    const random = Math.random()
    // 70% chance for audio, 30% chance for length-trap
    sequence.push(random < 0.7 ? 'audio' : 'length-trap')
  }
  return sequence
}

export const useRunStore = create<RunStore>((set, get) => ({
  ...initialState,

  startRun: () => {
    const puzzleSequence = generatePuzzleSequence()
    const firstPuzzleType = puzzleSequence[0]
    
    // Get appropriate word based on puzzle type
    const word = firstPuzzleType === 'length-trap' 
      ? getRandomWordWithSimilar() 
      : getRandomWord()
    
    set({
      inRun: true,
      puzzleIndex: 0,
      coins: 0,
      hp: 1,
      currentWord: word,
      puzzleSequence,
      currentPuzzleType: firstPuzzleType,
    })
  },

  correctAnswer: () => {
    const state = get()
    const newPuzzleIndex = state.puzzleIndex + 1
    const newCoins = state.coins + 1
    
    // Get next puzzle type from sequence
    const nextPuzzleType = state.puzzleSequence[newPuzzleIndex]
    
    // Get appropriate word based on puzzle type
    const newWord = nextPuzzleType === 'length-trap'
      ? getRandomWordWithSimilar()
      : getRandomWord()

    set({
      coins: newCoins,
      puzzleIndex: newPuzzleIndex,
      currentWord: newWord,
      currentPuzzleType: nextPuzzleType || null,
    })
  },

  wrongAnswer: () => {
    set({
      hp: 0,
      inRun: false,
    })
  },

  endRun: () => {
    set({
      inRun: false,
      currentWord: null,
    })
  },

  reset: () => {
    set(initialState)
  },
}))


