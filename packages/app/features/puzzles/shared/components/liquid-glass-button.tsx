import { ReactNode } from 'react'
import { Pressable, StyleSheet, ViewStyle, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { theme } from '../../theme'

interface LiquidGlassButtonProps {
  children: ReactNode
  onPress: () => void
  disabled?: boolean
  variant?: 'default' | 'success' | 'error'
  style?: ViewStyle
  intensity?: 'light' | 'medium' | 'heavy'
}

export function LiquidGlassButton({
  children,
  onPress,
  disabled = false,
  variant = 'default',
  style,
  intensity = 'medium',
}: LiquidGlassButtonProps) {
  const getBlurIntensity = () => {
    switch (intensity) {
      case 'light':
        return theme.glass.blur.light
      case 'heavy':
        return theme.glass.blur.heavy
      default:
        return theme.glass.blur.medium
    }
  }

  const getOverlayColor = () => {
    switch (variant) {
      case 'success':
        return theme.glass.overlay.success
      case 'error':
        return theme.glass.overlay.error
      default:
        return theme.glass.tint.lightSubtle
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      {({ pressed }) => (
        <MotiView
          animate={{
            scale: pressed && !disabled ? 0.95 : 1,
          }}
          transition={{
            type: 'timing',
            duration: 100,
          }}
          style={styles.innerContainer}
        >
          {/* Backdrop Blur Layer */}
          <BlurView
            intensity={pressed && !disabled ? getBlurIntensity() + 5 : getBlurIntensity()}
            tint="light"
            style={styles.blurContainer}
          >
            {/* Tinted Overlay */}
            <View style={[styles.tintOverlay, { backgroundColor: getOverlayColor() }]} />
            
            {/* Border Glow */}
            <View style={[styles.border, { borderColor: theme.glass.border.light }]} />
            
            {/* Content Container */}
            <View style={styles.contentContainer}>
              {children}
            </View>
            
            {/* Specular Highlight (animated on press) */}
            {pressed && !disabled && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 100 }}
                style={styles.specularContainer}
              >
                <LinearGradient
                  colors={theme.gradients.specular}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.specularGradient}
                />
              </MotiView>
            )}
            
            {/* Idle Shimmer Effect */}
            <MotiView
              from={{ translateX: -100, opacity: 0.3 }}
              animate={{ translateX: 200, opacity: 0 }}
              transition={{
                type: 'timing',
                duration: 3000,
                loop: true,
                repeatDelay: 2000,
              }}
              style={styles.shimmerContainer}
            >
              <LinearGradient
                colors={['transparent', theme.glass.specular.subtle, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmer}
              />
            </MotiView>
          </BlurView>
        </MotiView>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
  },
  blurContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: theme.borderRadius.xxl,
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xxl,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  specularContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.borderRadius.xxl,
  },
  specularGradient: {
    flex: 1,
  },
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
  },
  shimmer: {
    flex: 1,
    width: 100,
  },
})

