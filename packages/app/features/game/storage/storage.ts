import { Platform } from 'react-native'

let AsyncStorage: any

if (Platform.OS === 'web') {
  // Use localStorage for web
  AsyncStorage = {
    getItem: async (key: string): Promise<string | null> => {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key)
      }
      return null
    },
    setItem: async (key: string, value: string): Promise<void> => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value)
      }
    },
    removeItem: async (key: string): Promise<void> => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    },
  }
} else {
  // Use AsyncStorage for native
  const AsyncStorageModule = require('@react-native-async-storage/async-storage')
    .default
  AsyncStorage = AsyncStorageModule
}

export const storage = AsyncStorage

const STORAGE_KEY_PREFIX = '@hanashi_game_'

export async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`)
  } catch (error) {
    console.error('Error reading from storage:', error)
    return null
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, value)
  } catch (error) {
    console.error('Error writing to storage:', error)
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`)
  } catch (error) {
    console.error('Error removing from storage:', error)
  }
}

