import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'solito/router'
import { useRunStore } from '../store/use-run-store'
import { Button } from '../shared/components/ui/button'
import { Card } from '../shared/components/ui/card'
import { theme } from '../theme'

export function RunEndScreen() {
  const router = useRouter()
  const { puzzleIndex, coins, reset } = useRunStore()

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
          <Text style={styles.statValue}>🪙 {coins}</Text>
        </View>
      </Card>

      <Card style={styles.messageCard}>
        <Text style={styles.message}>
          Keep practicing to improve your Japanese listening skills!
        </Text>
      </Card>

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
    minHeight: '100%',
    justifyContent: 'center',
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
  messageCard: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
})

