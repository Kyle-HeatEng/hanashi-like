import { StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { useAudio } from '../hooks/use-audio'
import { theme } from '../../theme'

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
    <Pressable
      onPress={handlePress}
      disabled={disabled || isLoading || isPlaying || !!error}
      style={styles.container}
    >
      {({ pressed }) => (
        <MotiView
          animate={{
            scale: pressed && !disabled && !isPlaying ? 0.95 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
          }}
          style={styles.innerContainer}
        >
          {/* Liquid Glass Background */}
          <BlurView
            intensity={pressed ? 25 : 20}
            tint="light"
            style={styles.blurContainer}
          >
            {/* Tinted Overlay */}
            <MotiView
              animate={{
                backgroundColor: isPlaying 
                  ? theme.glass.overlay.primary 
                  : theme.glass.tint.lightMedium,
              }}
              style={styles.tintOverlay}
            />
            
            {/* Glass Border */}
            <MotiView
              animate={{
                borderColor: isPlaying ? theme.colors.primary : theme.glass.border.light,
                borderWidth: isPlaying ? 2 : 1,
              }}
              style={styles.glassBorder}
            />
            
            {/* Content */}
            <MotiView
              animate={{
                scale: isPlaying ? 1.05 : 1,
              }}
              transition={{
                type: 'spring',
                damping: 12,
              }}
              style={styles.content}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.primary} size="small" />
              ) : error ? (
                <Text style={styles.errorText}>Error</Text>
              ) : (
                <Text style={[styles.label, isPlaying && styles.labelPlaying]}>
                  {label}
                </Text>
              )}
            </MotiView>
          </BlurView>
        </MotiView>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: 80,
    height: 60,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.full,
  },
  content: {
    zIndex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  label: {
    fontSize: 32,
    fontWeight: '600',
    color: theme.colors.text,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  labelPlaying: {
    color: theme.colors.primary,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.error,
  },
})

