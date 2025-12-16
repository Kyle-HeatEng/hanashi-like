import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { Platform } from 'react-native'
import { Asset } from 'expo-asset'
import { getAudioSource } from '../utils/audio-assets'

export interface UseAudioReturn {
  play: () => Promise<void>
  isPlaying: boolean
  isLoading: boolean
  error: Error | null
}

export function useAudio(audioUri: string | null): UseAudioReturn {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!audioUri) {
      return
    }

    let isMounted = true

    const loadSound = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Get the audio source (URI for web, require() result for native)
        const source = getAudioSource(audioUri)
        let uri: string | number = source

        // If source is a number (require() result), use Asset API to get the URI
        if (Platform.OS !== 'web' && typeof source === 'number') {
          const asset = Asset.fromModule(source)
          await asset.downloadAsync()
          uri = asset.localUri || asset.uri
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        )

        if (isMounted) {
          setSound(newSound)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Audio loading error:', err, 'for file:', audioUri)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(`Failed to load audio: ${audioUri}`))
          setIsLoading(false)
        }
      }
    }

    loadSound()

    return () => {
      isMounted = false
    }
  }, [audioUri])

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {
          // Ignore unload errors
        })
      }
    }
  }, [sound])

  const play = async () => {
    if (!sound) {
      return
    }

    try {
      setIsPlaying(true)
      await sound.replayAsync()
      // Wait for playback to finish
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false)
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to play audio'))
      setIsPlaying(false)
    }
  }

  return {
    play,
    isPlaying,
    isLoading,
    error,
  }
}

