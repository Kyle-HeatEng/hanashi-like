import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { theme } from '../../theme'

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled || loading) {
      return theme.colors.border
    }
    switch (variant) {
      case 'primary':
        return theme.colors.primary
      case 'secondary':
        return theme.colors.secondary
      case 'outline':
        return 'transparent'
      default:
        return theme.colors.primary
    }
  }

  const getTextColor = () => {
    if (variant === 'outline') {
      return theme.colors.primary
    }
    return theme.colors.textLight
  }

  const getBorderStyle = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: theme.colors.primary,
      }
    }
    return {}
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: disabled || loading ? 0.6 : 1,
          width: fullWidth ? '100%' : 'auto',
          ...getBorderStyle(),
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    ...theme.shadows.md,
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
})

