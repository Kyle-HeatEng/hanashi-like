export type PuzzleType = 'audio' | 'length-trap'

export type Word = {
  id: string
  hiragana: string[]
  romaji: string
  japanese: string
  audioUri: string
  difficulty: number
  similar?: string[]
}

export type RunState = {
  inRun: boolean
  puzzleIndex: number
  coins: number
  hp: number
  currentWord: Word | null
  puzzleSequence: PuzzleType[]
  currentPuzzleType: PuzzleType | null
}

