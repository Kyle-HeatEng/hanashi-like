const BASE_REWARD = 10
const SPEED_BONUS = 5
const SPEED_THRESHOLD_MS = 5000

export function calculateCoins(solveTimeMs: number): number {
  let coins = BASE_REWARD

  if (solveTimeMs <= SPEED_THRESHOLD_MS) {
    coins += SPEED_BONUS
  }

  return coins
}

