import { create } from 'zustand'
import type { RunState, Word } from '../types'
import { getRandomWord } from '../data'

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
}

export const useRunStore = create<RunStore>((set, get) => ({
  ...initialState,

  startRun: () => {
    const word = getRandomWord()
    set({
      inRun: true,
      puzzleIndex: 0,
      coins: 0,
      hp: 1,
      currentWord: word,
    })
  },

  correctAnswer: () => {
    const state = get()
    const newPuzzleIndex = state.puzzleIndex + 1
    const newCoins = state.coins + 1
    const newWord = getRandomWord()

    set({
      coins: newCoins,
      puzzleIndex: newPuzzleIndex,
      currentWord: newWord,
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

