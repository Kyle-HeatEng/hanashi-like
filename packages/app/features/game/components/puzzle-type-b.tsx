import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MotiView } from 'moti'
import type { Puzzle } from '../types'
import { getWordById } from '../data'
import { AudioButton } from './audio-button'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { theme } from '../theme'
import { useAudio } from '../hooks/use-audio'

interface PuzzleTypeBProps {
  puzzle: Puzzle
  onSubmit: (answer: string[]) => void
}

export function PuzzleTypeB({ puzzle, onSubmit }: PuzzleTypeBProps) {
  const word = getWordById(puzzle.wordId)
  const [selectedTiles, setSelectedTiles] = useState<string[]>([])
  const [availableTiles, setAvailableTiles] = useState<string[]>([])

  const { play, isLoading } = useAudio(word?.audioUri || null)

  useEffect(() => {
    if (word) {
      // Create tiles: correct hiragana + 2-3 noise tiles
      const noiseTiles = ['か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ']
        .filter((tile) => !word.hiragana.includes(tile))
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, word.hiragana.length))

      const allTiles = [...word.hiragana, ...noiseTiles].sort(
        () => Math.random() - 0.5
      )
      setAvailableTiles(allTiles)
    }
  }, [word])

  useEffect(() => {
    // Auto-play audio on mount, after it's loaded
    if (word && !isLoading) {
      const timer = setTimeout(() => {
        play()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [word, isLoading, play])

  if (!word) {
    return null
  }

  const handleTilePress = (tile: string) => {
    setSelectedTiles([...selectedTiles, tile])
    setAvailableTiles(availableTiles.filter((t) => t !== tile))
  }

  const handleRemoveTile = (index: number) => {
    const removedTile = selectedTiles[index]
    setSelectedTiles(selectedTiles.filter((_, i) => i !== index))
    setAvailableTiles([...availableTiles, removedTile])
  }

  const handleClear = () => {
    setAvailableTiles([...availableTiles, ...selectedTiles])
    setSelectedTiles([])
  }

  const handleSubmit = () => {
    if (selectedTiles.length === word.hiragana.length) {
      onSubmit(selectedTiles)
    }
  }

  return (
    <View style={styles.container}>
      <Card style={styles.audioCard}>
        <Text style={styles.instruction}>
          Listen and construct the word with hiragana tiles:
        </Text>
        <AudioButton audioUri={word.audioUri} label="Replay Audio" />
      </Card>

      <Card style={styles.selectedCard}>
        <Text style={styles.label}>Your Answer:</Text>
        <View style={styles.selectedContainer}>
          {selectedTiles.length === 0 ? (
            <Text style={styles.placeholder}>Tap tiles below to build word</Text>
          ) : (
            <>
              {selectedTiles.map((tile, index) => (
                <MotiView
                  key={`${tile}-${index}`}
                  from={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: index * 50 }}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveTile(index)}
                    style={styles.selectedTile}
                  >
                    <Text style={styles.selectedTileText}>{tile}</Text>
                  </TouchableOpacity>
                </MotiView>
              ))}
              {selectedTiles.length > 0 && (
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </Card>

      <Card>
        <Text style={styles.label}>Available Tiles:</Text>
        <View style={styles.tilesContainer}>
          {availableTiles.map((tile, index) => (
            <MotiView
              key={`${tile}-${index}`}
              from={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 30 }}
            >
              <TouchableOpacity
                onPress={() => handleTilePress(tile)}
                style={styles.tile}
              >
                <Text style={styles.tileText}>{tile}</Text>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>
      </Card>

      <Button
        title="Submit Answer"
        onPress={handleSubmit}
        disabled={selectedTiles.length !== word.hiragana.length}
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
  audioCard: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  instruction: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    textAlign: 'center',
  },
  selectedCard: {
    minHeight: 80,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  placeholder: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    opacity: 0.5,
    fontStyle: 'italic',
  },
  selectedTile: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  selectedTileText: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.textLight,
  },
  clearButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.error,
  },
  clearButtonText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: '600',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tile: {
    backgroundColor: theme.colors.accent,
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  tileText: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
})

