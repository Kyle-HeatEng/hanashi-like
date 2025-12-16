import type { MetaState } from '../types'
import { getItem, setItem } from './storage'

const META_STORAGE_KEY = 'meta'

export async function loadMetaData(): Promise<MetaState | null> {
  try {
    const data = await getItem(META_STORAGE_KEY)
    if (!data) {
      return null
    }
    return JSON.parse(data) as MetaState
  } catch (error) {
    console.error('Error loading meta data:', error)
    return null
  }
}

export async function saveMetaData(meta: MetaState): Promise<void> {
  try {
    await setItem(META_STORAGE_KEY, JSON.stringify(meta))
  } catch (error) {
    console.error('Error saving meta data:', error)
  }
}

