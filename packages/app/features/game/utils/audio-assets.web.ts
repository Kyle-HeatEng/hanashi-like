// Web-specific audio asset mapping
// This file is only used on web platforms

export function getAudioSource(audioFilename: string): string {
  // Web: use public path
  return `/audio/${audioFilename}`
}

