import { View, Text } from 'react-native'
import React from 'react'
import NavigationTest from './src/navigationtest'
import ProfilesExample from './src/reanimated3/shared-element-transitions-profiles'
import BottomSheet from './src/juniorforlife/BottomSheet'
import BottomSheetPop from './src/juniorforlife/BottomSheetPop'
import Demo1 from './src/gorhom-demo/Demo1'
import Demo2 from './src/gorhom-demo/Demo2'
import AppDemo from './src/gorhom-demo/gorhom/src/App'
import { MotiPressableMenu } from './src/Moti/MotiExample'
import { MotiExitBeforeEnter } from './src/Moti/MotiExitBeforeEnter'
import { NavigationContainer } from '@react-navigation/native'
export default function App() {
  return (
    // <MotiExitBeforeEnter />
    // <MotiPressableMenu />
    // <Demo2 />
    // <AppDemo />
    // <BottomSheetPop />
    <ProfilesExample />
    // <NavigationTest />
  )
}