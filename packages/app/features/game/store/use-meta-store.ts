import { create } from 'zustand'
import type { MetaState } from '../types'
import { loadMetaData, saveMetaData } from '../storage/meta-storage'

interface MetaStore extends MetaState {
  updateBestRun: (puzzlesCompleted: number) => void
  addCoins: (coins: number) => void
  addUnlock: (unlockId: string) => void
  load: () => Promise<void>
}

const initialState: MetaState = {
  bestRun: 0,
  totalCoins: 0,
  unlocks: [],
}

export const useMetaStore = create<MetaStore>((set, get) => ({
  ...initialState,

  updateBestRun: (puzzlesCompleted: number) => {
    const state = get()
    if (puzzlesCompleted > state.bestRun) {
      set({ bestRun: puzzlesCompleted })
      saveMetaData({ ...state, bestRun: puzzlesCompleted })
    }
  },

  addCoins: (coins: number) => {
    const state = get()
    const newTotalCoins = state.totalCoins + coins
    set({ totalCoins: newTotalCoins })
    saveMetaData({ ...state, totalCoins: newTotalCoins })
  },

  addUnlock: (unlockId: string) => {
    const state = get()
    if (!state.unlocks.includes(unlockId)) {
      const newUnlocks = [...state.unlocks, unlockId]
      set({ unlocks: newUnlocks })
      saveMetaData({ ...state, unlocks: newUnlocks })
    }
  },

  load: async () => {
    const data = await loadMetaData()
    if (data) {
      set(data)
    }
  },
}))

