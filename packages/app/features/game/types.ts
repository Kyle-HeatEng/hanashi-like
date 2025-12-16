export type Puzzle = {
  id: string
  type: 'VISUAL_TO_AUDIO' | 'AUDIO_TO_HIRAGANA'
  wordId: string
}

export type Word = {
  id: string
  hiragana: string[]
  romaji: string
  japanese: string
  audioUri: string
  difficulty: number
}

export type PlayerState = {
  lives: number
  coins: number
}

export type RunState = {
  inRun: boolean
  puzzleIndex: number
  currentPuzzle: Puzzle | null
  player: PlayerState
  startTime: number | null
}

export type MetaState = {
  bestRun: number
  totalCoins: number
  unlocks: string[]
}

export type PuzzleAnswer = {
  puzzleId: string
  answer: string | string[]
  solveTime: number
}

