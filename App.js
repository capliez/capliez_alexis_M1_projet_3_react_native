import React from 'react';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import { configureStore } from './src/redux/store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './src/navigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </Provider>
  );
}
