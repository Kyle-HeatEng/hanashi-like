import { create } from 'zustand'
import type { Puzzle, PlayerState, RunState, PuzzleAnswer } from '../types'
import { generatePuzzle } from '../utils/puzzle-generator'
import { validateAnswer } from '../utils/answer-validator'
import { calculateCoins } from '../utils/coin-calculator'

interface GameStore extends RunState {
  currentPuzzleStartTime: number | null
  mistakenWordId: string | null
  runCoins: number
  startRun: () => void
  submitAnswer: (answer: string | string[]) => boolean
  purchaseLife: () => boolean
  endRun: () => void
  nextPuzzle: () => void
  reset: () => void
}

const initialState: RunState = {
  inRun: false,
  puzzleIndex: 0,
  currentPuzzle: null,
  player: {
    lives: 1,
    coins: 0,
  },
  startTime: null,
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  currentPuzzleStartTime: null,
  mistakenWordId: null,
  runCoins: 0,

  startRun: () => {
    const puzzle = generatePuzzle()
    const now = Date.now()
    set({
      inRun: true,
      puzzleIndex: 0,
      currentPuzzle: puzzle,
      player: {
        lives: 1,
        coins: 0,
      },
      startTime: now,
      currentPuzzleStartTime: now,
      mistakenWordId: null,
      runCoins: 0,
    })
  },

  submitAnswer: (answer: string | string[]) => {
    const state = get()
    if (!state.currentPuzzle || !state.currentPuzzleStartTime) {
      return false
    }

    const solveTime = Date.now() - state.currentPuzzleStartTime
    const isCorrect = validateAnswer(state.currentPuzzle, answer)

    if (!isCorrect) {
      set({
        mistakenWordId: state.currentPuzzle.wordId,
      })
      return false
    }

    const coinsEarned = calculateCoins(solveTime)
    const newCoins = state.player.coins + coinsEarned
    const newRunCoins = state.runCoins + coinsEarned

    set({
      player: {
        ...state.player,
        coins: newCoins,
      },
      runCoins: newRunCoins,
    })

    return true
  },

  purchaseLife: () => {
    const state = get()
    const LIFE_COST = 50
    const MAX_LIVES = 3

    if (state.player.coins < LIFE_COST || state.player.lives >= MAX_LIVES) {
      return false
    }

    set({
      player: {
        ...state.player,
        coins: state.player.coins - LIFE_COST,
        lives: Math.min(state.player.lives + 1, MAX_LIVES),
      },
    })

    return true
  },

  endRun: () => {
    const state = get()
    set({
      inRun: false,
      currentPuzzle: null,
      currentPuzzleStartTime: null,
    })
  },

  nextPuzzle: () => {
    const state = get()
    const newPuzzle = generatePuzzle()
    const newIndex = state.puzzleIndex + 1

    set({
      puzzleIndex: newIndex,
      currentPuzzle: newPuzzle,
      currentPuzzleStartTime: Date.now(),
    })
  },

  reset: () => {
    set({
      ...initialState,
      currentPuzzleStartTime: null,
      mistakenWordId: null,
      runCoins: 0,
    })
  },
}))

