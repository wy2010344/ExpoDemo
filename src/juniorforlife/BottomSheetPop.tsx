import { WINDOW_HEIGHT } from "./utils"


import React, { useEffect, useRef, useState } from 'react'
import { Animated, SafeAreaView, PanResponder, Platform, View, StyleSheet, Text, Pressable } from "react-native"
import { } from "react-native-safe-area-context"

export default function BottomSheetDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={{ position: "relative", flex: 1 }}>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "yellow",
        height: 300
      }}>
        <Pressable onPress={() => {
          setVisible(v => !v)
        }}>
          <Text>点击</Text>
        </Pressable>
      </View>
      <BottomSheet visible={visible} onClose={() => {
        setVisible(false)
      }} />
    </SafeAreaView>
  )
}


function BottomSheet({
  visible,
  onClose
}: {
  visible: boolean
  onClose(): void
}) {
  const maxY = WINDOW_HEIGHT * 0.6
  const [realVisible, setRealVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current
  const latestGestureDy = useRef(0)

  function springAnimation(direction: 'up' | 'down') {
    const targetValue = direction == 'down'
      ? maxY
      : 0
    Animated.timing(animatedValue, {
      toValue: targetValue,
      useNativeDriver: true,
    }).start(() => {
      setRealVisible(direction == "up" ? true : false)
      console.log(direction)
      if (direction == "down") {
        onClose()
      }
    })
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
        if (gesture.dy <= maxY / 2) {
          springAnimation('up')
        } else {
          springAnimation('down')
        }
      } else {
        //drag up
        if (gesture.dy >= -maxY / 2) {
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
          inputRange: [0, maxY],
          outputRange: [0, maxY],
          extrapolate: "clamp"
        })
      }
    ]
  }
  console.log("vvv", visible, realVisible)
  useEffect(() => {
    springAnimation(visible ? "up" : "down")
  }, [visible])
  return (visible || realVisible) ? <Animated.View style={[styles.bottomSheet, buttomSheetAnimation, {
    bottom: 0,
    height: maxY
  }]} {...panResponder.panHandlers}>
  </Animated.View> : <></>
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    width: "100%",
    backgroundColor: "blue",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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