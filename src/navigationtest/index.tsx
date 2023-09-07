import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation, route }: any) {

  const id = route.params?.id || 0
  const [count, setCount] = React.useState(0)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen {id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          id: id + 1
        })}
      />
      <Button
        title={`count ${count}`}
        onPress={() => {
          setCount(v => v + 1)
        }}
      />
    </View>
  );
}
function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.id || 0
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen {id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button title="Go to Main" onPress={() => navigation.navigate("Home", {
        id: id + 1
      })} />
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function index() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{

        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}