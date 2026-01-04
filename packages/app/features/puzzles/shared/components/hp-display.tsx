import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../theme'

interface HPDisplayProps {
  hp: number
}

export function HPDisplay({ hp }: HPDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❤️</Text>
      <Text style={styles.count}>{hp}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  icon: {
    fontSize: 20,
  },
  count: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.life,
  },
})

