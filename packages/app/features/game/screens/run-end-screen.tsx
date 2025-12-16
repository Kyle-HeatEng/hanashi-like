import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'solito/router'
import { useGameStore } from '../store/use-game-store'
import { useMetaStore } from '../store/use-meta-store'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { AudioButton } from '../components/audio-button'
import { getWordById } from '../data'
import { theme } from '../theme'

export function RunEndScreen() {
  const router = useRouter()
  const { puzzleIndex, mistakenWordId, runCoins, reset } = useGameStore()
  const { updateBestRun, addCoins } = useMetaStore()

  const mistakenWord = mistakenWordId ? getWordById(mistakenWordId) : null

  useEffect(() => {
    // Update meta data
    updateBestRun(puzzleIndex)
    addCoins(runCoins)
  }, [puzzleIndex, runCoins, updateBestRun, addCoins])

  const handleNewRun = () => {
    reset()
    router.push('/')
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Run Ended</Text>
        <Text style={styles.subtitle}>Good effort!</Text>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Puzzles Completed</Text>
          <Text style={styles.statValue}>{puzzleIndex}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Coins Earned</Text>
          <Text style={styles.statValue}>🪙 {runCoins}</Text>
        </View>
      </Card>

      {mistakenWord && (
        <Card style={styles.mistakeCard}>
          <Text style={styles.mistakeTitle}>Mistaken Word</Text>
          <View style={styles.wordDisplay}>
            <View style={styles.hiraganaContainer}>
              {mistakenWord.hiragana.map((char, index) => (
                <Text key={index} style={styles.hiragana}>
                  {char}
                </Text>
              ))}
            </View>
            <Text style={styles.romaji}>{mistakenWord.romaji}</Text>
          </View>
          <AudioButton
            audioUri={mistakenWord.audioUri}
            label="Replay Audio"
          />
        </Card>
      )}

      <Button
        title="New Run"
        onPress={handleNewRun}
        variant="primary"
        fullWidth
      />
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
    gap: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '800',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    opacity: 0.7,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.lg,
  },
  stat: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    opacity: 0.7,
  },
  statValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  mistakeCard: {
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  mistakeTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.error,
  },
  wordDisplay: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  hiraganaContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  hiragana: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  romaji: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text,
    opacity: 0.7,
  },
})

