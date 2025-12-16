import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GameHomeScreen } from 'app/features/game/screens/home-screen'
import { RunScreen } from 'app/features/game/screens/run-screen'
import { ShopScreen } from 'app/features/game/screens/shop-screen'
import { RunEndScreen } from 'app/features/game/screens/run-end-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  run: undefined
  shop: undefined
  'run-end': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={GameHomeScreen}
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
        name="shop"
        component={ShopScreen}
        options={{
          title: 'Shop',
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
