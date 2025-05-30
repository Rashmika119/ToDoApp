import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpeningScreen from '../Sreens/openning';
import HomeScreen from '../Sreens/Home';
import RecentScreen from '../Sreens/RecentScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Opening" component={OpeningScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Recent" component={RecentScreen} />
    </Stack.Navigator>
  );
}
