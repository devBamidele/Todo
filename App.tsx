import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import BaseStack from './app/navigation/BaseStack';
import React from 'react';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { toastConfig } from './app/common/Toast/toastConfig';
import { appStore, persistor } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NetworkConnectivity from './app/common/Network/NetworkConnectivity';
import { fontConfig } from './app/utils';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(fontConfig);
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <BaseStack />
        <Toast config={toastConfig}/>
        {/* <NetworkConnectivity/> */}
      </PersistGate>
    </Provider>
  );
}
