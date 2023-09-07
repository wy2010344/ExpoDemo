import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  PanResponder,
  Easing,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import { ITEM_HEIGHT, DELETE_BUTTON_WIDTH } from './styles';
interface Dummy {
  id: number;
}
const dummyData: Dummy[] = [];
for (let i = 0; i < 50; i++) {
  dummyData.push({
    id: i
  });
}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface SwipeableListProps {
  data: any[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function RenderItemView({
  index,
  activeItemIndex,
  setActiveItemIndex,
  handleDeleteItem
}: {
  index: number
  activeItemIndex: number
  setActiveItemIndex(v: number): void
  handleDeleteItem(): void
}) {

  const animatedValue = useRef(new Animated.Value(0)).current;
  const swipeOffset = useRef(0);

  const swipeAnimation = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [-DELETE_BUTTON_WIDTH, 0],
          outputRange: [-DELETE_BUTTON_WIDTH, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const deleteBtnAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [-DELETE_BUTTON_WIDTH, -DELETE_BUTTON_WIDTH / 2, 0],
      outputRange: [1, 0.2, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [-DELETE_BUTTON_WIDTH, 0],
          outputRange: [0, DELETE_BUTTON_WIDTH],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const handleGestureRelease = (dx: number) => {
    animatedValue.flattenOffset()
    Animated.timing(animatedValue, {
      toValue: dx < -DELETE_BUTTON_WIDTH / 2 ? -DELETE_BUTTON_WIDTH : 0,
      easing: Easing.bounce,
      duration: 300,
      useNativeDriver: true,
    }).start();
    swipeOffset.current =
      dx < -DELETE_BUTTON_WIDTH / 2 ? -DELETE_BUTTON_WIDTH : 0;

  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gesture) => {
        return Math.abs(gesture.dx) > Math.abs(gesture.dy);
      },
      onPanResponderGrant: (evt, gesture) => {
        /* 24 is total vertical margin
      // add scrollOffset to get index of items that need scrolling to be seen */
        //   const swipedItemIndex =
        //     Math.floor((gesture.y0 + scrollOffset.current) / (ITEM_HEIGHT + 24)) -
        //     1;
        const swipedItemIndex = index
        // if user swipes new item, animate the old item to origin position
        if (swipedItemIndex !== activeItemIndex) {
          swipeOffset.current = 0;
          Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {
            setActiveItemIndex(swipedItemIndex);
          });
        }
      },
      onPanResponderMove: (evt, gesture) => {
        animatedValue.setValue(gesture.dx + swipeOffset.current);
      },
      onPanResponderRelease: (evt, gesture) => {
        handleGestureRelease(gesture.dx);
      },
    }),
  ).current;

  return <View  {...panResponder.panHandlers} style={[styles.itemContainer]}>
    <Animated.View
      style={[
        styles.itemLeft,
        index === activeItemIndex ? swipeAnimation : {},
      ]}>
      <Text style={styles.itemText}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Text>
    </Animated.View>
    <AnimatedTouchable
      style={[
        styles.itemRight,
        index === activeItemIndex ? deleteBtnAnimation : {},
      ]}
      onPress={() => handleDeleteItem()}>
      <Text style={styles.itemText}>Delete</Text>
    </AnimatedTouchable>
  </View>
}
const SwipeableList: React.FC<SwipeableListProps> = ({ data, onDelete }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const scrollOffset = useRef(0);

  const handleScroll = (event: any) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
    //handleGestureRelease(0);
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <RenderItemView
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        index={index}
        handleDeleteItem={() => {
          if (typeof onDelete === 'function') {
            onDelete(item);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        onScroll={handleScroll}
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) =>
          item.id ? item.id.toString() : index.toString()
        }
      />
    </View>
  );
};

export default () => <SwipeableList data={dummyData} onDelete={() => { }} />;
