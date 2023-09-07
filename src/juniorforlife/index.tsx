import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Animated, PanResponder, Platform, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedBannerWithSearchInput from './AnimatedBannerWithSearchInput';
import CubeCarousel from './CubeCarousel';
import DoubleTapToHeart from './DoubleToHeart';
import FacebookPostReaction from './FacebookPostReaction';
import MessagerInput from './MessagerInput';
import MomoHeaderAnimation from './MomoHeaderAnimation';
import PickPhoneColor from './PickPhoneColor';
import ReactToMessage from './ReactToMessage';
import SwipeableList from './SwipeableList';
import TikTokMusicDisc from './TikTokMusicDisc';
import Tinder from './Tinder';
import { WINDOW_HEIGHT } from './utils';
import ZingCarousel from './ZingCarousel';
import ZoomableImage from './ZoomableImage';
import DragSortAppleMusic from './drag-sort-apple-music'
export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <View style={{
        display: "flex",
        gap: 20
      }}>
        <View style={{
          backgroundColor: "red",
          width: 100,
          height: 100
        }} />
        <View style={{
          backgroundColor: "green",
          width: 100,
          height: 100
        }} />
      </View> */}
      <StatusBar style="auto" />
      {/* <MomoHeaderAnimation /> */}
      {/* <DoubleTapToHeart /> */}
      {/* <AnimatedBannerWithSearchInput /> */}
      {/* <CubeCarousel /> */}
      {/* <FacebookPostReaction /> */}
      {/* <MessagerInput /> */}
      {/* <PickPhoneColor /> */}
      {/* <ReactToMessage /> */}
      {/* <SwipeableList /> */}
      {/* <TikTokMusicDisc /> */}
      {/* <Tinder /> */}
      {/* <ZingCarousel /> */}
      {/* <ZoomableImage /> */}
      {/* <DragSortAppleMusic /> */}
      {/* <FlatListDrag /> */}
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});


/**
 * 
 * 参考  https://github.com/juniorforlife/react-native-animations
 * https://www.youtube.com/channel/UCGxA-PuYBXinpwGawUqEYpg
 * 
 */