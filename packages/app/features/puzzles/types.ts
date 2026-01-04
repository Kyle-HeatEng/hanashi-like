export type Word = {
  id: string
  hiragana: string[]
  romaji: string
  japanese: string
  audioUri: string
  difficulty: number
}

export type RunState = {
  inRun: boolean
  puzzleIndex: number
  coins: number
  hp: number
  currentWord: Word | null
}

