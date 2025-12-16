import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

interface TimerProps {
  startTime: number | null
  onTimeUpdate?: (time: number) => void
  speedThreshold?: number
}

export function Timer({
  startTime,
  onTimeUpdate,
  speedThreshold = 5000,
}: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (!startTime) {
      setElapsedTime(0)
      return
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      setElapsedTime(elapsed)
      onTimeUpdate?.(elapsed)
    }, 100)

    return () => clearInterval(interval)
  }, [startTime, onTimeUpdate])

  const seconds = Math.floor(elapsedTime / 1000)
  const milliseconds = Math.floor((elapsedTime % 1000) / 100)
  const isSpeedBonus = elapsedTime <= speedThreshold

  const progress = Math.min(elapsedTime / speedThreshold, 1)

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.time}>
          {seconds}.{milliseconds.toString().padStart(1, '0')}s
        </Text>
        {isSpeedBonus && (
          <Text style={styles.bonus}>Speed Bonus!</Text>
        )}
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
              backgroundColor: isSpeedBonus
                ? theme.colors.success
                : theme.colors.warning,
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  time: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  bonus: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.success,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
})

