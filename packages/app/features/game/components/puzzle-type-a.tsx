import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MotiView } from 'moti'
import type { Puzzle } from '../types'
import { getWordById, getRandomWords } from '../data'
import { AudioButton } from './audio-button'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { theme } from '../theme'

interface PuzzleTypeAProps {
  puzzle: Puzzle
  onSubmit: (answer: string) => void
}

export function PuzzleTypeA({ puzzle, onSubmit }: PuzzleTypeAProps) {
  const word = getWordById(puzzle.wordId)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  if (!word) {
    return null
  }

  // Generate distractors (other words' audio)
  const distractors = getRandomWords(3, puzzle.wordId)
  const allOptions = [
    { wordId: puzzle.wordId, word },
    ...distractors.map((w) => ({ wordId: w.id, word: w })),
  ].sort(() => Math.random() - 0.5)

  const handleSelect = (wordId: string) => {
    setSelectedAnswer(wordId)
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmit(selectedAnswer)
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.wordCard}>
        <Text style={styles.instruction}>Select the correct pronunciation:</Text>
        <View style={styles.hiraganaContainer}>
          {word.hiragana.map((char, index) => (
            <Text key={index} style={styles.hiragana}>
              {char}
            </Text>
          ))}
        </View>
        <Text style={styles.romaji}>{word.romaji}</Text>
      </Card>

      <View style={styles.optionsContainer}>
        {allOptions.map((option, index) => (
          <MotiView
            key={option.wordId}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
          >
            <TouchableOpacity
              onPress={() => handleSelect(option.wordId)}
              style={[
                styles.optionButton,
                selectedAnswer === option.wordId && styles.optionButtonSelected,
              ]}
            >
              <AudioButton
                audioUri={option.word.audioUri}
                label={`Play ${option.word.romaji}`}
                disabled={false}
              />
              {selectedAnswer === option.wordId && (
                <MotiView
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <Text style={styles.selectedLabel}>Selected</Text>
                </MotiView>
              )}
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      <Button
        title="Submit Answer"
        onPress={handleSubmit}
        disabled={!selectedAnswer}
        fullWidth
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
    width: '100%',
  },
  wordCard: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  instruction: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
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
  optionsContainer: {
    gap: theme.spacing.md,
  },
  optionButton: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  optionButtonSelected: {
    borderColor: theme.colors.primary,
  },
  selectedLabel: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
})

