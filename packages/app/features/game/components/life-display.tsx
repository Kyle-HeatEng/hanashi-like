import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

interface LifeDisplayProps {
  lives: number
  maxLives?: number
}

export function LifeDisplay({ lives, maxLives = 3 }: LifeDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lives</Text>
      <View style={styles.livesContainer}>
        {Array.from({ length: maxLives }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.life,
              index < lives && styles.lifeActive,
            ]}
          >
            <Text style={styles.lifeText}>❤️</Text>
          </View>
        ))}
      </View>
      <Text style={styles.count}>{lives}/{maxLives}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  livesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  life: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  },
  lifeActive: {
    backgroundColor: theme.colors.life,
    opacity: 1,
  },
  lifeText: {
    fontSize: 18,
  },
  count: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '600',
  },
})

