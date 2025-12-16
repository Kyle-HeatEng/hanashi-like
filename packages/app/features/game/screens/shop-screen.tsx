import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'solito/router'
import { useGameStore } from '../store/use-game-store'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { CoinDisplay } from '../components/coin-display'
import { LifeDisplay } from '../components/life-display'
import { theme } from '../theme'

const LIFE_COST = 50
const MAX_LIVES = 3

export function ShopScreen() {
  const router = useRouter()
  const { player, purchaseLife } = useGameStore()

  const canPurchase = player.coins >= LIFE_COST && player.lives < MAX_LIVES

  const handlePurchase = () => {
    const success = purchaseLife()
    if (success) {
      // Small delay for feedback, then continue
      setTimeout(() => {
        router.push('/run')
      }, 300)
    }
  }

  const handleContinue = () => {
    router.push('/run')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>Every 5 puzzles</Text>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <LifeDisplay lives={player.lives} />
          <CoinDisplay coins={player.coins} />
        </View>
      </Card>

      <Card style={styles.itemCard}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>+1 Life</Text>
          <Text style={styles.itemCost}>🪙 {LIFE_COST}</Text>
        </View>
        <Text style={styles.itemDescription}>
          Increase your maximum lives (up to {MAX_LIVES})
        </Text>
        {player.lives >= MAX_LIVES && (
          <Text style={styles.warning}>Already at maximum lives!</Text>
        )}
        {player.coins < LIFE_COST && player.lives < MAX_LIVES && (
          <Text style={styles.warning}>
            Not enough coins! Need {LIFE_COST - player.coins} more.
          </Text>
        )}
        <Button
          title={canPurchase ? 'Purchase' : 'Cannot Purchase'}
          onPress={handlePurchase}
          disabled={!canPurchase}
          variant="primary"
          fullWidth
        />
      </Card>

      <Button
        title="Continue Run"
        onPress={handleContinue}
        variant="outline"
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
    gap: theme.spacing.xs,
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
    padding: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemCard: {
    gap: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  itemCost: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.coin,
  },
  itemDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  warning: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.error,
    fontWeight: '600',
  },
})

