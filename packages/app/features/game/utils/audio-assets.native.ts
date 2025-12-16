// Native-specific audio asset mapping
// This file is only used on native platforms
// It imports the audio asset map from the Expo app

let audioAssetMap: Record<string, any> = {}

try {
  // Try to import from Expo app - Metro resolves from apps/expo/ root
  // Path is relative to where Metro resolves from (apps/expo/)
  // @ts-ignore - Dynamic import path
  const expoAudioAssets = require('../../../../apps/expo/audio-assets')
  audioAssetMap = expoAudioAssets.audioAssetMap || {}
} catch (e) {
  console.warn('Could not load audio assets from Expo app, trying alternative path:', e)
  try {
    // Alternative: try relative path from this file
    // @ts-ignore
    const altPath = require('../../../../../apps/expo/audio-assets')
    audioAssetMap = altPath.audioAssetMap || {}
  } catch (e2) {
    console.error('Failed to load audio assets:', e2)
  }
}

export function getAudioSource(audioFilename: string): string | number {
  const asset = audioAssetMap[audioFilename]
  if (asset) {
    return asset
  }
  console.warn(`Audio asset not found: ${audioFilename}`)
  return audioFilename
}

