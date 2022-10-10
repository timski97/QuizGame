// import React from 'react';
// import {SafeAreaView, StyleSheet,Text} from 'react-native';
// import { Quiz } from './src/screens/Quize';

// const App = () => {
//   return <Quiz />;
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
// });

// export default App;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Home} from './src/screens/home';
import {Quiz} from './src/screens/quize';
import store from './src/store/index';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
