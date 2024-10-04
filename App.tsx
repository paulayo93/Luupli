import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';


function App(): React.JSX.Element {
  return (
      <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
          </SafeAreaProvider>
  );
}

export default App;
