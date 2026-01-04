import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import { useRouter } from 'solito/router'
import { useRunStore } from '../store/use-run-store'
import { Button } from '../shared/components/ui/button'
import { AnimatedGradientBackground } from '../shared/components/animated-gradient-background'
import { theme } from '../theme'

export function RunEndScreen() {
  const router = useRouter()
  const { puzzleIndex, coins, reset } = useRunStore()

  const handleNewRun = () => {
    reset()
    router.push('/')
  }

  return (
    <AnimatedGradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Run Ended</Text>
          <Text style={styles.subtitle}>Good effort!</Text>
        </View>

        <BlurView intensity={15} tint="light" style={styles.statsCard}>
          <View style={styles.cardOverlay} />
          <View style={styles.cardBorder} />
          <View style={styles.statsContent}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Puzzles Completed</Text>
              <Text style={styles.statValue}>{puzzleIndex}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Coins Earned</Text>
              <Text style={styles.statValue}>🪙 {coins}</Text>
            </View>
          </View>
        </BlurView>

        <BlurView intensity={15} tint="light" style={styles.messageCard}>
          <View style={styles.cardOverlay} />
          <View style={styles.cardBorder} />
          <View style={styles.messageContent}>
            <Text style={styles.message}>
              Keep practicing to improve your Japanese listening skills!
            </Text>
          </View>
        </BlurView>

        <Button
          title="New Run"
          onPress={handleNewRun}
          variant="primary"
          fullWidth
        />
      </ScrollView>
    </AnimatedGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    opacity: 0.8,
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsCard: {
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.glass.tint.lightMedium,
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: theme.glass.border.light,
    borderRadius: theme.borderRadius.xxl,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1,
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
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  messageCard: {
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  messageContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
})

