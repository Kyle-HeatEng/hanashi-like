// Native-specific audio asset mapping
// This file is only used on native platforms
// It imports the audio asset map from the Expo app

let audioAssetMap: Record<string, any> = {}

try {
  // Metro bundler resolves from the project root (apps/expo)
  // We need to use a path that Metro can resolve
  // @ts-ignore - Dynamic import path
  const expoAudioAssets = require('../../../../../../apps/expo/audio-assets')
  audioAssetMap = expoAudioAssets.audioAssetMap || {}
} catch (e) {
  console.error('Failed to load audio assets from Expo app:', e)
}

export function getAudioSource(audioFilename: string): string | number {
  const asset = audioAssetMap[audioFilename]
  if (asset) {
    return asset
  }
  console.warn(`Audio asset not found: ${audioFilename}`)
  return audioFilename
}

