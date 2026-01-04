import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import type { Word } from '../types'
import { getWordById } from '../data'
import { AudioButton } from '../shared/components/audio-button'
import { theme } from '../theme'

interface LengthTrapPuzzleProps {
  word: Word
  onCorrect: () => void
  onWrong: () => void
}

const { width: screenWidth } = Dimensions.get('window')
const GRID_PADDING = theme.spacing.lg * 2 // Total horizontal padding
const GAP = theme.spacing.md
const BUTTON_WIDTH = (screenWidth - GRID_PADDING - GAP) / 2 // 2 columns with gap

export function LengthTrapPuzzle({ word, onCorrect, onWrong }: LengthTrapPuzzleProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Get the similar word from the word's similar array
  const similarWordId = word.similar?.[0]
  const similarWord = similarWordId ? getWordById(similarWordId) : null

  if (!similarWord) {
    console.error('No similar word found for length-trap puzzle')
    return null
  }

  // Create options: correct answer + similar word
  const allOptions = [
    { id: word.id, hiragana: word.hiragana },
    { id: similarWord.id, hiragana: similarWord.hiragana },
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
      {/* Glass Instruction Card */}
      <BlurView intensity={15} tint="light" style={styles.instructionCard}>
        <View style={styles.instructionOverlay} />
        <View style={styles.instructionBorder} />
        <Text style={styles.instruction}>Listen carefully and choose the correct word:</Text>
        <View style={styles.audioButtonContainer}>
          <AudioButton audioUri={word.audioUri} label="🔊" />
        </View>
      </BlurView>

      <View style={styles.optionsGrid}>
        {allOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.id
          const showCorrect = hasSubmitted && isSelected && isCorrect
          const showWrong = hasSubmitted && isSelected && isWrong

          return (
            <MotiView
              key={option.id}
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ 
                delay: index * 50, 
                type: 'timing', 
                duration: 200,
              }}
              style={styles.optionWrapper}
            >
              <Pressable
                onPress={() => handleSelect(option.id)}
                disabled={hasSubmitted}
                style={styles.optionButton}
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
                    {/* Liquid Glass Blur Background */}
                    <BlurView
                      intensity={pressed && !hasSubmitted ? 25 : 20}
                      tint="light"
                      style={styles.blurContainer}
                    >
                      {/* Tinted Overlay */}
                      <View 
                        style={[
                          styles.tintOverlay,
                          showCorrect && styles.tintOverlaySuccess,
                          showWrong && styles.tintOverlayError,
                          isSelected && !hasSubmitted && styles.tintOverlaySelected,
                        ]} 
                      />
                      
                      {/* Glass Border */}
                      <View 
                        style={[
                          styles.glassBorder,
                          isSelected && styles.glassBorderSelected,
                          showCorrect && styles.glassBorderSuccess,
                          showWrong && styles.glassBorderError,
                        ]} 
                      />
                      
                      {/* Hiragana Content */}
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
                      
                      {/* Specular Highlight on Press */}
                      {pressed && !hasSubmitted && (
                        <MotiView
                          from={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={styles.specularHighlight}
                        >
                          <LinearGradient
                            colors={theme.gradients.specular}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0, 1]}
                            style={StyleSheet.absoluteFillObject}
                          />
                        </MotiView>
                      )}
                      
                      {/* Feedback Icons */}
                      {showCorrect && (
                        <MotiView
                          from={{ scale: 0, rotate: '-180deg' }}
                          animate={{ scale: 1, rotate: '0deg' }}
                          transition={{ type: 'spring', damping: 10 }}
                          style={styles.feedbackContainer}
                        >
                          <View style={styles.feedbackBadge}>
                            <Text style={styles.feedback}>✓</Text>
                          </View>
                        </MotiView>
                      )}
                      {showWrong && (
                        <MotiView
                          from={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 10 }}
                          style={styles.feedbackContainer}
                        >
                          <View style={styles.feedbackBadge}>
                            <Text style={styles.feedback}>✗</Text>
                          </View>
                        </MotiView>
                      )}
                    </BlurView>
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
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xxl,
    alignItems: 'center',
    gap: theme.spacing.md,
    overflow: 'hidden',
  },
  instructionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.glass.tint.lightMedium,
  },
  instructionBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: theme.glass.border.light,
    borderRadius: theme.borderRadius.xxl,
  },
  instruction: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
    zIndex: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  audioButtonContainer: {
    marginTop: theme.spacing.sm,
    zIndex: 1,
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
    width: '100%',
    aspectRatio: 1.3,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.xxl,
  },
  buttonContent: {
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.glass.tint.lightSubtle,
  },
  tintOverlaySelected: {
    backgroundColor: theme.glass.overlay.primary,
  },
  tintOverlaySuccess: {
    backgroundColor: theme.glass.overlay.success,
  },
  tintOverlayError: {
    backgroundColor: theme.glass.overlay.error,
  },
  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: theme.glass.border.light,
    borderRadius: theme.borderRadius.xxl,
  },
  glassBorderSelected: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  glassBorderSuccess: {
    borderWidth: 3,
    borderColor: theme.colors.success,
  },
  glassBorderError: {
    borderWidth: 3,
    borderColor: theme.colors.error,
  },
  hiraganaContainer: {
    flexDirection: 'row',
    gap: 2,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  hiraganaChar: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.text,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  hiraganaCharSelected: {
    color: theme.colors.textLight,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  specularHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xxl,
  },
  feedbackContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    zIndex: 10,
  },
  feedbackBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: theme.borderRadius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  feedback: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textLight,
  },
})

