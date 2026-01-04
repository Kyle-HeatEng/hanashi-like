import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { MotiView } from 'moti'
import { theme } from '../../theme'

interface HPDisplayProps {
  hp: number
}

export function HPDisplay({ hp }: HPDisplayProps) {
  return (
    <BlurView intensity={15} tint="light" style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.border} />
      <MotiView
        animate={{
          scale: hp > 0 ? [1, 1.1, 1] : 0.9,
        }}
        transition={{
          type: 'spring',
          duration: 300,
        }}
        style={styles.content}
      >
        <Text style={styles.icon}>❤️</Text>
        <Text style={styles.count}>{hp}</Text>
      </MotiView>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.glass.tint.lightMedium,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: theme.glass.border.light,
    borderRadius: theme.borderRadius.full,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    zIndex: 1,
  },
  icon: {
    fontSize: 20,
  },
  count: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.life,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})

