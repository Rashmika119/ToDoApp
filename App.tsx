import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Navigator/AppNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  );
}
