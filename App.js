import { StatusBar } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from "./store";
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


import Sampler from "./views/Sampler";
import Samples from "./views/Samples";

const Stack = createNativeStackNavigator();

const persistor = persistStore(store);

const Sounboard = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={ persistor }>
        <StatusBar barStyle={ "dark-content" }/>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Sampler" component={ Sampler } options={{ headerShown: false }}/>
            <Stack.Screen name="Samples" component={ Samples } options={{ title: 'Change sample' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Sounboard;