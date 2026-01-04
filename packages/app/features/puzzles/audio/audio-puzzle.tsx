import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { MotiView } from 'moti'
import type { Word } from '../types'
import { getRandomWords } from '../data'
import { AudioButton } from '../shared/components/audio-button'
import { theme } from '../theme'

interface AudioPuzzleProps {
  word: Word
  onCorrect: () => void
  onWrong: () => void
}

const { width: screenWidth } = Dimensions.get('window')
const GRID_PADDING = theme.spacing.lg * 2 // Total horizontal padding
const GAP = theme.spacing.md
const BUTTON_WIDTH = (screenWidth - GRID_PADDING - GAP) / 2 // 2 columns with gap

export function AudioPuzzle({ word, onCorrect, onWrong }: AudioPuzzleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Generate 5 random distractors
  const distractors = getRandomWords(5, word.id)
  
  // Create options: correct answer + 5 distractors
  const allOptions = [
    { id: word.id, hiragana: word.hiragana },
    ...distractors.map((w) => ({ id: w.id, hiragana: w.hiragana })),
  ].sort(() => Math.random() - 0.5) // Shuffle

  const handleSelect = (optionId: string) => {
    if (hasSubmitted) return
    
    setSelectedAnswer(optionId)
    setHasSubmitted(true)

    // Check if correct
    if (optionId === word.id) {
      // Correct answer
      setTimeout(() => {
        onCorrect()
        setSelectedAnswer(null)
        setHasSubmitted(false)
      }, 800) // Short delay for feedback
    } else {
      // Wrong answer
      setTimeout(() => {
        onWrong()
      }, 800) // Short delay for feedback
    }
  }

  const isCorrect = selectedAnswer === word.id
  const isWrong = selectedAnswer !== null && !isCorrect

  return (
    <View style={styles.container}>
      <View style={styles.instructionCard}>
        <Text style={styles.instruction}>Listen to the audio and select the correct hiragana:</Text>
        <View style={styles.audioButtonContainer}>
          <AudioButton audioUri={word.audioUri} label="🔊 Play Audio" />
        </View>
      </View>

      <View style={styles.optionsGrid}>
        {allOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.id
          const showCorrect = hasSubmitted && isSelected && isCorrect
          const showWrong = hasSubmitted && isSelected && isWrong

          return (
            <MotiView
              key={option.id}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 80, type: 'spring', damping: 15 }}
              style={styles.optionWrapper}
            >
              <Pressable
                onPress={() => handleSelect(option.id)}
                disabled={hasSubmitted}
                style={({ pressed }) => [
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected,
                  showCorrect && styles.optionButtonCorrect,
                  showWrong && styles.optionButtonWrong,
                  pressed && !hasSubmitted && styles.optionButtonPressed,
                ]}
              >
                {({ pressed }) => (
                  <MotiView
                    animate={{
                      scale: pressed && !hasSubmitted ? 0.95 : 1,
                    }}
                    transition={{
                      type: 'timing',
                      duration: 100,
                    }}
                    style={styles.buttonContent}
                  >
                    <View style={styles.hiraganaContainer}>
                      {option.hiragana.map((char, charIndex) => (
                        <Text 
                          key={charIndex} 
                          style={[
                            styles.hiraganaChar,
                            (showCorrect || showWrong) && styles.hiraganaCharSelected
                          ]}
                        >
                          {char}
                        </Text>
                      ))}
                    </View>
                    {showCorrect && (
                      <MotiView
                        from={{ scale: 0, rotate: '-180deg' }}
                        animate={{ scale: 1, rotate: '0deg' }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={styles.feedbackContainer}
                      >
                        <Text style={styles.feedback}>✓</Text>
                      </MotiView>
                    )}
                    {showWrong && (
                      <MotiView
                        from={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={styles.feedbackContainer}
                      >
                        <Text style={styles.feedback}>✗</Text>
                      </MotiView>
                    )}
                  </MotiView>
                )}
              </Pressable>
            </MotiView>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xl,
    width: '100%',
  },
  instructionCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  instruction: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  audioButtonContainer: {
    marginTop: theme.spacing.sm,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    justifyContent: 'center',
  },
  optionWrapper: {
    width: BUTTON_WIDTH,
  },
  optionButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: '100%',
    aspectRatio: 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
    position: 'relative',
    overflow: 'hidden',
  },
  optionButtonPressed: {
    borderColor: theme.colors.primary,
    ...theme.shadows.lg,
  },
  optionButtonSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 4,
  },
  optionButtonCorrect: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
    borderWidth: 4,
  },
  optionButtonWrong: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
    borderWidth: 4,
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiraganaContainer: {
    flexDirection: 'row',
    gap: 2,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiraganaChar: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  hiraganaCharSelected: {
    color: theme.colors.textLight,
  },
  feedbackContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.full,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedback: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textLight,
  },
})

