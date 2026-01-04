import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import { MotiView } from 'moti'
import type { PuzzleType } from '../../types'
import { theme } from '../../theme'

interface PuzzleTimelineProps {
  puzzleSequence: PuzzleType[]
  currentIndex: number
}

const PUZZLE_ICONS: Record<PuzzleType, string> = {
  'audio': '🎵',
  'length-trap': '📏',
}

export function PuzzleTimeline({ puzzleSequence, currentIndex }: PuzzleTimelineProps) {
  // Show current puzzle + next 5 puzzles
  const visiblePuzzles = puzzleSequence.slice(currentIndex, currentIndex + 6)

  return (
    <BlurView intensity={15} tint="light" style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.border} />
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {visiblePuzzles.map((puzzleType, index) => {
          const globalIndex = currentIndex + index
          
          return (
            <MotiView
              key={globalIndex}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{
                type: 'timing',
                duration: 300,
                delay: index * 50,
              }}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {PUZZLE_ICONS[puzzleType]}
                </Text>
              </View>
            </MotiView>
          )
        })}
      </ScrollView>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.glass.tint.lightSubtle,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: theme.glass.border.light,
    borderRadius: theme.borderRadius.xl,
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  icon: {
    fontSize: 22,
  },
})

