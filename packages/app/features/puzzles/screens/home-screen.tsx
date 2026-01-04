import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'solito/router'
import { useRunStore } from '../store/use-run-store'
import { Button } from '../shared/components/ui/button'
import { Card } from '../shared/components/ui/card'
import { theme } from '../theme'

export function HomeScreen() {
  const router = useRouter()
  const { startRun, reset } = useRunStore()

  const handleStartRun = () => {
    reset()
    startRun()
    router.push('/run')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>日本語 Audio Puzzle</Text>
        <Text style={styles.subtitle}>Learn Japanese through listening</Text>
      </View>

      <Card style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>How to Play</Text>
        <View style={styles.rulesList}>
          <Text style={styles.rule}>• Listen to the Japanese audio</Text>
          <Text style={styles.rule}>• Select the correct hiragana from 6 options</Text>
          <Text style={styles.rule}>• Earn 1 coin for each correct answer</Text>
          <Text style={styles.rule}>• You have 1 HP - wrong answer ends your run</Text>
          <Text style={styles.rule}>• Try to get as many coins as you can!</Text>
        </View>
      </Card>

      <Button
        title="Start New Run"
        onPress={handleStartRun}
        variant="primary"
        fullWidth
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
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
  rulesCard: {
    gap: theme.spacing.md,
  },
  rulesTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  rulesList: {
    gap: theme.spacing.xs,
  },
  rule: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
  },
})

