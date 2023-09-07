import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { WINDOW_HEIGHT } from '../utils';

const ZingCarousel = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <Image source={musicData[0].bannerImage} style={styles.banner} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.spaceForBanner} />
        <FlatList
          style={styles.carousel}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={musicData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.carouselItem} activeOpacity={1}>
                <Image source={item.image} style={styles.carouselItemImage} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.image}
          onScroll={e => {
            animatedValue.setValue(e.nativeEvent.contentOffset.x);
          }}
        />

        <View style={styles.scrollViewContent} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: 320,
    position: 'absolute',
    resizeMode: 'cover',
  },
  spaceForBanner: {
    paddingTop: 320,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT * 2,
    backgroundColor: '#09172a',
  },
  carousel: {
    position: 'absolute',
    top: 280,
    zIndex: 100,
  },
  carouselItem: {
    width: 80,
    height: 80,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemImage: {
    borderRadius: 60,
    width: 80,
    height: 80,
  },
});
export default ZingCarousel;

export const musicData = [
  {
    id: '0',
    image: require('../zing/1.png'),
    bannerImage: require('../zing/1banner.jpeg'),
  },
  {
    id: '1',
    image: require('../zing/2.png'),
    bannerImage: require('../zing/2banner.jpeg'),
  },
  {
    id: '2',
    image: require('../zing/3.png'),
    bannerImage: require('../zing/3banner.jpeg'),
  },
  {
    id: '3',
    image: require('../zing/4.png'),
    bannerImage: require('../zing/4banner.jpeg'),
  },
  {
    id: '4',
    image: require('../zing/5.png'),
    bannerImage: require('../zing/5banner.jpeg'),
  },
  {
    id: '5',
    image: require('../zing/6.png'),
    bannerImage: require('../zing/6banner.jpeg'),
  },
];
