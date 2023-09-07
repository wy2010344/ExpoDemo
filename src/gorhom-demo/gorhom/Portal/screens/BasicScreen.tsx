import React, { useEffect, useState } from 'react';
import { Portal, PortalHost } from '@gorhom/portal';
import { Button, StyleSheet, Text, View } from 'react-native';

const BasicScreen = () => {
  return < App />
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          Text won't be teleported!
          <Portal hostName="custom_host_1">
            <Text style={styles.text}>
              Text to be teleported to the custom host #1
            </Text>
          </Portal>
          <Portal hostName="custom_host_2">
            <Text style={styles.text}>
              Text to be teleported to the custom host #2
            </Text>
          </Portal>
          <Portal>
            <View style={styles.customHostBox}>
              <Text style={styles.text}>
                Text to be teleported to the root host
              </Text>
            </View>
          </Portal>
        </Text>
        <PortalHost name="custom_host_1" />
      </View>
    </View>
  );
};

function App() {
  return <>
    <PortalHost name="custom_host_1" />
    <Portal name="custom_host_1">
      <TestModel />
    </Portal>
  </>
}

function TestModel() {
  const [showModal, setShowModal] = useState(false);
  return <View style={{ flex: 1, backgroundColor: "green" }}>
    <Button onPress={() => setShowModal(true)} title="showSub" />
    {showModal && (
      <Portal name="custom_host_1">
        <TestModel />
      </Portal>
    )}
  </View>
}


// function App() {
//   useEffect(()=>{
//     portalHost.push('custom_host_1', <TestModel />)
//   })
//   return <>
//     <PortalHost name="custom_host_1" />
//   </>
// }

// function TestModel() {
//   return <View style={{ flex: 1, backgroundColor: "green" }}>
//     <Button onPress={() => {
//       portalHost.push('custom_host_1', <TestModel />)
//     }} title="showSub" />
//   </View>
// }
// <PortalHost name="custom_host_2" />

const styles = StyleSheet.create({
  container: {},
  box: {
    padding: 24,
    backgroundColor: '#333',
  },
  customHostBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#333',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    margin: 24,
    backgroundColor: '#eee',
  },
});

export default BasicScreen;
