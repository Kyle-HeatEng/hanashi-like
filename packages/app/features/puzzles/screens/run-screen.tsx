import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'solito/router'
import { useRunStore } from '../store/use-run-store'
import { AudioPuzzle } from '../audio/audio-puzzle'
import { HPDisplay } from '../shared/components/hp-display'
import { CoinDisplay } from '../shared/components/coin-display'
import { theme } from '../theme'

export function RunScreen() {
  const router = useRouter()
  const {
    currentWord,
    coins,
    hp,
    puzzleIndex,
    inRun,
    correctAnswer,
    wrongAnswer,
  } = useRunStore()

  // Redirect to home if not in a run
  useEffect(() => {
    if (!inRun) {
      router.push('/')
    }
  }, [inRun, router])

  if (!currentWord) {
    return null
  }

  const handleCorrect = () => {
    correctAnswer()
  }

  const handleWrong = () => {
    wrongAnswer()
    // Navigate to run-end screen
    router.push('/run-end')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <HPDisplay hp={hp} />
        <CoinDisplay coins={coins} />
      </View>

      <View style={styles.puzzleInfo}>
        <Text style={styles.puzzleNumber}>Puzzle {puzzleIndex + 1}</Text>
      </View>

      <View style={styles.puzzleContainer}>
        <AudioPuzzle
          word={currentWord}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
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

