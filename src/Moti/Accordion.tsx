import React from 'react';
import { View, Pressable, StyleSheet, Text, SafeAreaView } from 'react-native';
import { AnimateHeight } from './AnimateHeight';
import { MotiView } from 'moti';
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function Accordion() {
  return (
    <SafeAreaView style={styles.screen}>
      {new Array(10).fill('').map((_, i) => {
        return <Item key={i} index={i} />;
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#161618'
  },
});

function Item({ index }: { index: number }) {
  const [show, toggle] = React.useReducer((open) => !open, false);

  return (
    <View style={itemStyles.container}>
      <Pressable onPress={toggle} style={itemStyles.question}>
        <Text selectable={false} style={itemStyles.questionText}>
          Question {index}
        </Text>
        <MotiView
          animate={{
            rotateZ: show ? '-90deg' : '0deg',
          }}>
          <Ionicons name="chevron-forward" color="white" size={17} />
        </MotiView>
      </Pressable>
      <AnimateHeight enterFrom="bottom" hide={!show}>
        <View style={itemStyles.answer}>
          <Text style={itemStyles.answerText}>
            Against staggering odds, two things happened: one, the universe.
            Two, you. Let’s walk at our full height, honor the forebears, have a
            smile and for god’s sake, floss.
          </Text>
        </View>
      </AnimateHeight>
    </View>
  );
}

const itemStyles = StyleSheet.create({
  question: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  answer: {
    padding: 16,
    marginTop: -16
  },
  answerText: {
    color: '#A09FA5',
    lineHeight: 20
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#232326',
  },
  questionText: {
    color: '#EDEDEE',
    fontWeight: 'bold',
  },
});
