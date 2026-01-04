import { ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../theme'

interface AnimatedGradientBackgroundProps {
  children: ReactNode
  style?: ViewStyle
}

export function AnimatedGradientBackground({
  children,
  style,
}: AnimatedGradientBackgroundProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Simple subtle gradient background */}
      <LinearGradient
        colors={theme.gradients.background.light}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
})

