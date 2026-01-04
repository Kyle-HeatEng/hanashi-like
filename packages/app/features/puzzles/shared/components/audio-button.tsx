import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useAudio } from '../hooks/use-audio'

interface AudioButtonProps {
  audioUri: string
  label?: string
  onPress?: () => void
  disabled?: boolean
}

export function AudioButton({
  audioUri,
  label = 'Play',
  onPress,
  disabled = false,
}: AudioButtonProps) {
  const { play, isPlaying, isLoading, error } = useAudio(audioUri)

  const handlePress = async () => {
    if (disabled || isLoading || isPlaying) {
      return
    }

    await play()
    onPress?.()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || isLoading || isPlaying || !!error}
      style={{
        padding: 16,
        backgroundColor: '#4A90E2',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
        opacity: disabled || isLoading || isPlaying || error ? 0.6 : 1,
      }}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : error ? (
        <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Error</Text>
      ) : (
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          {isPlaying ? 'Playing...' : label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

