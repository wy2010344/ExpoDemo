import { View, Text, ScrollView, StyleProp, ViewStyle, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView, useAnimationState, useDynamicAnimation } from 'moti'
import { useAnimatedGestureHandler } from 'react-native-reanimated'
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'

export default function Demo() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <ScrollView>
        <HoverPulse style={{
          width: 100,
          height: 100,
          backgroundColor: "red"
        }} />
        <PerformantView />
      </ScrollView>
    </SafeAreaView>
  )
}

function PerformantView() {
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    active: {
      scale: 1.1,
      opacity: 1,
    },
  })

  return <Pressable
    onPress={() => {
      // you can read in the current state like this
      if (animationState.current === 'from') {
        animationState.transitionTo('active')
      }

      // or, like this, which achieves the exact same thing
      animationState.transitionTo((currentState) => {
        if (currentState === 'from') {
          return 'active'
        }
        return currentState
      })
    }}
  >

    <MotiView style={{
      justifyContent: 'center',
      height: 250,
      width: 250,
      borderRadius: 25,
      backgroundColor: 'cyan',
    }} state={animationState} />
  </Pressable>
}
function HoverPulse({
  scaleTo = 5,
  style,
  children
}: {
  scaleTo?: number
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}) {
  const animation = useDynamicAnimation(() => ({
    // this is the initial state
    scale: 1,
  }))

  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        animation.animateTo({ scale: scaleTo })
      },
      onFinish: () => {
        animation.animateTo({ scale: 1 })
      },
    }
  )

  return (
    <TapGestureHandler onGestureEvent={onGestureEvent}>
      <MotiView style={style} state={animation}>
        {children}
      </MotiView>
    </TapGestureHandler>
  )
}