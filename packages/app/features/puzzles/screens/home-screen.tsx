import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { useRouter } from 'solito/router'
import { useRunStore } from '../store/use-run-store'
import { Button } from '../shared/components/ui/button'
import { AnimatedGradientBackground } from '../shared/components/animated-gradient-background'
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
    <AnimatedGradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>日本語 Audio Puzzle</Text>
          <Text style={styles.subtitle}>Learn Japanese through listening</Text>
        </View>

        <BlurView intensity={15} tint="light" style={styles.rulesCard}>
          <View style={styles.cardOverlay} />
          <View style={styles.cardBorder} />
          <View style={styles.cardContent}>
            <Text style={styles.rulesTitle}>How to Play</Text>
            <View style={styles.rulesList}>
              <Text style={styles.rule}>• Listen to the Japanese audio</Text>
              <Text style={styles.rule}>• Select the correct hiragana from 6 options</Text>
              <Text style={styles.rule}>• Earn 1 coin for each correct answer</Text>
              <Text style={styles.rule}>• You have 1 HP - wrong answer ends your run</Text>
              <Text style={styles.rule}>• Try to get as many coins as you can!</Text>
            </View>
          </View>
        </BlurView>

        <Button
          title="Start New Run"
          onPress={handleStartRun}
          variant="primary"
          fullWidth
        />
      </View>
    </AnimatedGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rulesCard: {
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
  cardContent: {
    gap: theme.spacing.md,
    zIndex: 1,
  },
  rulesTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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

