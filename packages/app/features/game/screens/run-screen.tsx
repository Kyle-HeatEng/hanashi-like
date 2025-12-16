import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'solito/router'
import { useGameStore } from '../store/use-game-store'
import { PuzzleTypeA } from '../components/puzzle-type-a'
import { PuzzleTypeB } from '../components/puzzle-type-b'
import { LifeDisplay } from '../components/life-display'
import { CoinDisplay } from '../components/coin-display'
import { Timer } from '../components/timer'
import { theme } from '../theme'

export function RunScreen() {
  const router = useRouter()
  const {
    currentPuzzle,
    player,
    puzzleIndex,
    currentPuzzleStartTime,
    submitAnswer,
    nextPuzzle,
    endRun,
  } = useGameStore()

  if (!currentPuzzle) {
    return null
  }

  const handleAnswer = (answer: string | string[]) => {
    const isCorrect = submitAnswer(answer)

    if (!isCorrect) {
      // Wrong answer - end run
      endRun()
      router.push('/run-end')
    } else {
      // Correct answer - check if we should show shop
      const nextIndex = puzzleIndex + 1
      if (nextIndex > 0 && nextIndex % 5 === 0) {
        // Show shop before next puzzle
        setTimeout(() => {
          router.push('/shop')
        }, 500)
      } else {
        // Move to next puzzle
        setTimeout(() => {
          nextPuzzle()
        }, 500) // Small delay for feedback
      }
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <LifeDisplay lives={player.lives} />
        <CoinDisplay coins={player.coins} />
      </View>

      <View style={styles.puzzleInfo}>
        <Text style={styles.puzzleNumber}>Puzzle {puzzleIndex + 1}</Text>
        {currentPuzzleStartTime && (
          <Timer startTime={currentPuzzleStartTime} />
        )}
      </View>

      <View style={styles.puzzleContainer}>
        {currentPuzzle.type === 'VISUAL_TO_AUDIO' ? (
          <PuzzleTypeA
            puzzle={currentPuzzle}
            onSubmit={(answer) => handleAnswer(answer)}
          />
        ) : (
          <PuzzleTypeB
            puzzle={currentPuzzle}
            onSubmit={(answer) => handleAnswer(answer)}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  puzzleInfo: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  puzzleNumber: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  puzzleContainer: {
    width: '100%',
  },
})

