import { WINDOW_HEIGHT } from "./utils"

const BUTTON_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6
const BUTTON_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1
//负数
const MAX_UPWARD_TRANSLATE_Y = BUTTON_SHEET_MIN_HEIGHT - BUTTON_SHEET_MAX_HEIGHT
const MAX_DOWNWARD_TRANSLATE_Y = 0

const DRAG_THREAD_HOLD = 50

import React, { useRef } from 'react'
import { Animated, PanResponder, Platform, View, StyleSheet } from "react-native"

export default function BottomSheet() {
  const animatedValue = useRef(new Animated.Value(0)).current
  const latestGestureDy = useRef(0)

  function springAnimation(direction: 'up' | 'down') {
    const targetValue = direction == 'down'
      ? MAX_DOWNWARD_TRANSLATE_Y
      : MAX_UPWARD_TRANSLATE_Y
    Animated.spring(animatedValue, {
      toValue: targetValue,
      useNativeDriver: true,
    }).start()
    latestGestureDy.current = targetValue
  }
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder() {
      return true
    },
    onPanResponderGrant() {
      animatedValue.setOffset(latestGestureDy.current)
    },
    onPanResponderMove(e, gesture) {
      animatedValue.setValue(gesture.dy)
    },
    onPanResponderRelease(e, gesture) {
      animatedValue.flattenOffset()
      if (gesture.dy > 0) {
        //drag down
        if (gesture.dy <= DRAG_THREAD_HOLD) {
          springAnimation('up')
        } else {
          springAnimation('down')
        }
      } else {
        //drag up
        if (gesture.dy >= -DRAG_THREAD_HOLD) {
          springAnimation('down')
        } else {
          springAnimation('up')
        }
      }
    }
  })).current

  const buttomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: "clamp"
        })
      }
    ]
  }
  return (
    <Animated.View style={[styles.bottomSheet, buttomSheetAnimation]}>
      <View style={styles.dragableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle}></View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: BUTTON_SHEET_MAX_HEIGHT,
    bottom: BUTTON_SHEET_MIN_HEIGHT - BUTTON_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2
        }
      }
    })
  },
  dragableArea: {
    width: 100,
    height: 32,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red"
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: "#d3d3d3",
    borderRadius: 10
  }
})