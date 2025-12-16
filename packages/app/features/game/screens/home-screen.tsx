import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'solito/router'
import { useGameStore } from '../store/use-game-store'
import { useMetaStore } from '../store/use-meta-store'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { CoinDisplay } from '../components/coin-display'
import { theme } from '../theme'

export function GameHomeScreen() {
  const router = useRouter()
  const { startRun, reset } = useGameStore()
  const { bestRun, totalCoins, load } = useMetaStore()

  useEffect(() => {
    load()
  }, [load])

  const handleStartRun = () => {
    reset()
    startRun()
    router.push('/run')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>日本語 Roguelike</Text>
        <Text style={styles.subtitle}>Learn Japanese through puzzles</Text>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Best Run</Text>
            <Text style={styles.statValue}>{bestRun} puzzles</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Total Coins</Text>
            <CoinDisplay coins={totalCoins} />
          </View>
        </View>
      </Card>

      <Card style={styles.rulesCard}>
        <Text style={styles.rulesTitle}>How to Play</Text>
        <View style={styles.rulesList}>
          <Text style={styles.rule}>• Start with 1 life and 0 coins</Text>
          <Text style={styles.rule}>• Answer puzzles correctly to earn coins</Text>
          <Text style={styles.rule}>• Solve quickly for speed bonus!</Text>
          <Text style={styles.rule}>• Wrong answer ends your run</Text>
          <Text style={styles.rule}>• Visit shop every 5 puzzles</Text>
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
  statsCard: {
    gap: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
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

