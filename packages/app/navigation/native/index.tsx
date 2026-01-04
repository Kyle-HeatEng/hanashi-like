import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from 'app/features/puzzles/screens/home-screen'
import { RunScreen } from 'app/features/puzzles/screens/run-screen'
import { RunEndScreen } from 'app/features/puzzles/screens/run-end-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  run: undefined
  'run-end': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="run"
        component={RunScreen}
        options={{
          title: 'Run',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="run-end"
        component={RunEndScreen}
        options={{
          title: 'Run Ended',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
